import last from 'lodash.last';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * Checks whether or not a given code path segment is reachable.
 * @param {CodePathSegment} segment - A CodePathSegment to check.
 * @returns {boolean} `true` if the segment is reachable.
 */
function isReachable(segment) {
  return segment.reachable;
}

/**
 * Checks if there is a blank line between tokens
 */
function getTokensWithNewlineBetween(sourceCode, startNode, endNode) {
  const endLine = endNode.loc.start.line;

  let next = startNode;
  let previous = startNode;
  do {
    previous = next;
    next = sourceCode.getTokenOrCommentAfter(next);

    if (next.loc.start.line > previous.loc.end.line + 1) {
      return [previous, next];
    }
  } while (next.loc.start.line < endLine);

  return null;
}

module.exports = {
  meta: {
    docs: {},

    fixable: 'whitespace',

    schema: [
      {
        enum: ['always', 'never'],
      },
      {
        type: 'object',
        properties: {
          fallthrough: {
            enum: ['always', 'never'],
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create: function newlineBetweenSwitchCase(context) {
    const optionIsNewlineBetweenSwitchCases = context.options[0] === 'always';
    const optionIsNewlineBetweenFallthrough = context.options[1] && context.options[1].fallthrough ?
      context.options[1].fallthrough === 'always' : optionIsNewlineBetweenSwitchCases;

    let currentCodePath = null;
    const sourceCode = context.getSourceCode();

    return {
      onCodePathStart(codePath) {
        currentCodePath = codePath;
      },

      onCodePathEnd() {
        currentCodePath = currentCodePath.upper;
      },

      'SwitchCase:exit': (node) => {
        // ignore the last switch case
        if (last(node.parent.cases) === node) {
          return;
        }

        let isFallthrough = false;

        /*
         * A fallthrough is either if we are empty or if the end of the case is reachable
         */
        if (node.consequent.length === 0 || currentCodePath.currentSegments.some(isReachable)) {
          isFallthrough = true;
        }

        const nextToken = sourceCode.getTokenAfter(node);

        const tokensWithBlankLinesBetween =
          getTokensWithNewlineBetween(sourceCode, node, nextToken);
        const hasBlankLinesBetween = Boolean(tokensWithBlankLinesBetween);
        const isNewlineRequired = isFallthrough ?
          optionIsNewlineBetweenFallthrough : optionIsNewlineBetweenSwitchCases;

        if (hasBlankLinesBetween && !isNewlineRequired) {
          context.report({
            node,
            fix(fixer) {
              const [previous, next] = tokensWithBlankLinesBetween;
              return fixer.replaceTextRange(
                [previous.end, next.start - next.loc.start.column], '\n');
            },
            message: 'Extraneous newlines between switch cases.',
          });
        } else if (!hasBlankLinesBetween && isNewlineRequired) {
          context.report({
            node,
            fix(fixer) {
              return fixer.insertTextAfter(node, '\n');
            },
            message: 'Newline required between switch cases.',
          });
        }
      },
    };
  },
};

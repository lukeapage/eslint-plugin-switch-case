//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "disallow default case in switch statements",
      category: "Possible Errors",
    },
    schema: [
      {
        type: "object",
        properties: {
          allowEmpty: {
            description: "Whether to allow an empty default case",
            type: "boolean",
          },
        },
        additionalProperties: false,
      },
    ],
    defaultOptions: [{ allowEmpty: false }],
    messages: {
      defaultCaseWithContent: "Default case with content is not allowed.",
      defaultCaseEmpty: "Default case is not allowed.",
    },
  },

  create: function noDefaultCase(context) {
    const options = context.options[0] || {};
    const allowEmpty = options.allowEmpty || false;

    return {
      SwitchStatement(node) {
        const defaultCase = node.cases.find(
          (switchCase) => switchCase.test === null,
        );

        if (defaultCase) {
          // If allowEmpty is true, only report if the default case has content
          if (allowEmpty) {
            if (defaultCase.consequent.length > 0) {
              context.report({
                node: defaultCase,
                messageId: "defaultCaseWithContent",
              });
            }
          } else {
            // If allowEmpty is false, report any default case
            context.report({
              node: defaultCase,
              messageId: "defaultCaseEmpty",
            });
          }
        }
      },
    };
  },
};

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "disallow default case in switch statements",
      category: "Possible Errors",
    },
    schema: [
      {
        type: "object",
        properties: {
          allowEmpty: {
            type: "boolean",
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create: function noDefaultCase(context) {
    const options = context.options[0] || {};
    const allowEmpty = options.allowEmpty || false;

    return {
      SwitchStatement(node) {
        const defaultCase = node.cases.find(
          (switchCase) => switchCase.test === null
        );

        if (defaultCase) {
          // If allowEmpty is true, only report if the default case has content
          if (allowEmpty) {
            if (defaultCase.consequent.length > 0) {
              context.report({
                node: defaultCase,
                message: "Default case with content is not allowed.",
              });
            }
          } else {
            // If allowEmpty is false, report any default case
            context.report({
              node: defaultCase,
              message: "Default case is not allowed.",
            });
          }
        }
      },
    };
  },
};
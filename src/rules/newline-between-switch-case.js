//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {},

    schema: [
      {
          enum: ["always", "never"],
      },
      {
          type: "object",
          properties: {
              fallthrough: {
                  enum: ["always", "never"],
              },
          },
          additionalProperties: false,
      }
    ],
  },

  create: function newlineBetweenSwitchCase(context) {
    return {
      SwitchCase(node) {
        if (node.consequent.length && node.consequent[0].type === 'BlockStatement') {
        }
      },
    };
  },
};

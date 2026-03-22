# no-default-case

Disallow default case in switch statements.

For certain codebases, especially when exhaustive checking is handled explicitly (e.g., with TypeScript `never` checks or pattern matching libraries), having a `default` case can hide missing branches and lead to unintended behavior.

## Rule Details

This rule disallows the use of `default` case in switch statements to encourage explicit case handling and prevent silent failures.

The following patterns are considered problems:

```js
/*eslint switch-case/no-default-case: "error"*/

switch (status) {
  case "pending":
    return "wait";
  case "active":
    return "go";
  default:
    return "unknown"; // ❌ Default case not allowed
}
```

```js
/*eslint switch-case/no-default-case: "error"*/

switch (value) {
  case 1:
    return "one";
  case 2:
    return "two";
  default: // ❌ Even empty default case not allowed
}
```

The following patterns are not considered warnings:

```js
/*eslint switch-case/no-default-case: "error"*/

switch (status) {
  case "pending":
    return "wait";
  case "active":
    return "go";
  case "inactive":
    return "stop";
  // No default case - explicit handling required
}
```

## Options

This rule has an object option:

- `"allowEmpty"`: (default: `false`) Whether to allow empty default cases

### allowEmpty

When `"allowEmpty"` is set to `true`, empty default cases are allowed, but default cases with any content are not.

Examples of **correct** code for this rule with `{ "allowEmpty": true }`:

```js
/*eslint switch-case/no-default-case: ["error", { "allowEmpty": true }]*/

switch (value) {
  case "a":
    return 1;
  case "b":
    return 2;
  default: // ✅ Empty default case is allowed
}
```

```js
/*eslint switch-case/no-default-case: ["error", { "allowEmpty": true }]*/

switch (value) {
  case "a":
    return 1;
  case "b":
    return 2;
  default:
  // ✅ Comments are allowed in empty default case
}
```

Examples of **incorrect** code for this rule with `{ "allowEmpty": true }`:

```js
/*eslint switch-case/no-default-case: ["error", { "allowEmpty": true }]*/

switch (value) {
  case "a":
    return 1;
  case "b":
    return 2;
  default:
    return "unknown"; // ❌ Content in default case not allowed
}
```

```js
/*eslint switch-case/no-default-case: ["error", { "allowEmpty": true }]*/

switch (value) {
  case "a":
    return 1;
  case "b":
    return 2;
  default:
    break; // ❌ Break statement counts as content
}
```

## When To Use It

Use this rule when:

- You want to enforce exhaustive case handling
- You're using TypeScript and want to leverage its exhaustiveness checking
- You want to prevent silent fallback behavior in switch statements
- You prefer explicit error handling over default cases

## When Not To Use It

Don't use this rule if:

- Your codebase relies on default cases for legitimate fallback behavior
- You need default cases to handle unexpected or legacy values
- You prefer the safety net that default cases provide

## Related Rules

- [`default-case`](https://eslint.org/docs/rules/default-case) - Requires default case in switch statements (opposite of this rule)
- [`no-fallthrough`](https://eslint.org/docs/rules/no-fallthrough) - Disallow fallthrough of case statements

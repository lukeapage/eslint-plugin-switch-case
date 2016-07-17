# newline-between-switch-case

Require newlines between switch cases.

## Options

The rule takes a first option of either "always" or "never" as to whether there should be a newline between cases. It also takes an object with the following options:

* fallthrough - "always" or "never" - whether or not to have newlines between cases that fallthrough to each other.

## Rule Details

The following patterns are considered problems:

```js
/*eslint switch-case/newline-between-switch-case: ["error", "always"]*/

switch (a) {
  case 0:
  case 1:
    doSomething();
    break;
  case 2:
    doSomething();
    break;
}

```

The following patterns are not considered warnings:

```js
/*eslint switch-case: "error"*/

/*eslint switch-case/newline-between-switch-case: ["error", "always"]*/

switch (a) {
  case 0:

  case 1:
    doSomething();
    break;

  case 2:
    doSomething();
    break;
}

```

## fallthrough option

The following patterns are considered problems:

```js
/*eslint switch-case/newline-between-switch-case: ["error", "always", { "fallthrough": "never"}]*/

switch (a) {
  case 0:

  case 1:
    doSomething();
    break;
}

```

The following patterns are not considered warnings:

```js
/*eslint switch-case: "error"*/

/*eslint switch-case/newline-between-switch-case: ["error", "always", { "fallthrough": "never"}]*/

switch (a) {
  case 0:
  case 1:
    doSomething();
    break;
}

```

## When Not To Use It

If you don't want to enforce newlines between switch cases.

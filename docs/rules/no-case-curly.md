# no-case-curly

Long switch statements containing unrelated code for each case can get messy. One sign that you have unrelated code is if you need curly braces because you are initialising variables. This rule prevents this and recommends pulling out the code to a seperate function.

## Rule Details

The following patterns are considered problems:

```js
/*eslint switch-case/no-case-curly: "error"*/

switch (a) {
  case 1: {
    let b = a + c;
    let d = g(b);
    return h(b, d);
    break;
  }
}

```

The following patterns are not considered warnings:

```js
/*eslint switch-case: "error"*/

switch(a) {
  case 1:
    return descriptive(a);
}

```

## When Not To Use It

If you need switch statement cases to have their own variables/scope.

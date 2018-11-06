# make-dir-range [![Build Status](https://travis-ci.com/hutsoninc/make-dir-range.svg?branch=master)](https://travis-ci.com/hutsoninc/make-dir-range)

Make directories from ranges of integers.

## Installation

`npm install --save make-dir-range`

## Usage

```js
const makeDirRange = require('make-dir-range');

makeDirRange('1-3,5,9-10');
```

```
$ tree
.
├── 1
├── 2
├── 3
├── 5
├── 9
├── 10
│ ...
```

With options:

```js
const makeDirRange = require('mkdir-int-range');

makeDirRange('11-13,15', {
    destination: 'out',
    append: 'a',
    prepend: 'p'
});
```

```
$ tree
.
├── out
│   ├── p11a
│   ├── p12a
│   ├── p13a
│   └── p15a
│ ...
```

## Related

- [make-dir-range-cli](https://github.com/hutsoninc/make-dir-range-cli) - CLI for this module

## Authors

* **Austin Gordon** - *Development* - [GitHub](https://github.com/AustinLeeGordon)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
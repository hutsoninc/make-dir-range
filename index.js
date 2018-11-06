'use strict';
const fs = require('fs');
const path = require('path');

const validationSet = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-'];

const defaults = {
    mode: 0o777 & (~process.umask()),
    fs,
    destination: '',
    append: '',
    prepend: ''
};

const isSubsetOf = (subset, set) => {
    for (let i = 0; i < subset.length; i++) {
        if (set.indexOf(subset[i]) === -1) {
            return false;
        }
    }
    return true;
}

const testInput = input => {
    if (!isSubsetOf(input.join('').split(''), validationSet)) {
        const err = new Error(`Input contains invalid characters: ${input}`);
        throw err;
    }
    for (let i = 0; i < input.length; i++) {
        let set = input[i].split('-');
        if (
            set.length === 1 &&
            !isNaN(set[0]) &&
            Number.isInteger(Number(set[0]))
        ) {
            continue;
        } else if (
            set.length === 2 &&
            !isNaN(set[0]) &&
            Number.isInteger(Number(set[0])) &&
            !isNaN(set[1]) &&
            Number.isInteger(Number(set[1])) &&
            Number(set[0]) < Number(set[1])
        ) {
            continue;
        } else {
            const err = new Error(`Invalid formatting: ${input[i]}`);
            throw err;
        }
    }
};

const testPath = str => {
    if (process.platform === 'win32') {
        const appendHasInvalidWinCharacters = /[<>:"|?*]/.test(str.replace(path.parse(str).root, ''));
        if (appendHasInvalidWinCharacters) {
            const err = new Error(`Append contains invalid characters: ${str}`);
            err.code = 'EINVAL';
            throw err;
        }
    }
};

module.exports = (input, opts) => {

    if (!Array.isArray(input)) {
        input = input.split(',');
        testInput(input);
    } else {
        testInput(input);
    }

    opts = Object.assign({}, defaults, opts);

    testPath(opts.append);
    testPath(opts.prepend);
    testPath(opts.destination);

    for (let i = 0; i < input.length; i++) {
        let set = input[i].split('-');
        if (set.length === 2) {
            for (let j = set[0]; j <= set[1]; j++) {
                try {
                    opts.fs.mkdirSync(path.resolve(opts.destination, `${opts.prepend}${j}${opts.append}`));
                } catch (err) {
                    throw err;
                }
            }
        } else {
            try {
                opts.fs.mkdirSync(path.resolve(opts.destination, `${opts.prepend}${set[0]}${opts.append}`));
            } catch (err) {
                throw err;
            }
        }
    }

};
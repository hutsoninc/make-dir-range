'use strict';
const fs = require('fs');
const path = require('path');
const validFilename = require('valid-filename');
const rangify = require('rangify-string');

const defaults = {
    mode: 0o777 & (~process.umask()),
    fs,
    destination: '',
    append: '',
    prepend: ''
};

module.exports = (input, opts) => {

    input = rangify(input);

    opts = Object.assign({}, defaults, opts);

    for (let i = 0; i < input.length; i++) {
        let filename = opts.prepend + input[i] + opts.append;

        if (validFilename(filename)) {
            try {
                opts.fs.mkdirSync(path.resolve(opts.destination, filename));
            } catch (err) {
                throw err;
            }
        } else {
            throw new Error(`Invalid file name: ${filename}`);
        }
    }

};
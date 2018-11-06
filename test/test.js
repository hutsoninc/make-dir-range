const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const m = require('../');
const isSubsetOf = require('./helpers/util').isSubsetOf;

const testDir = path.resolve(__dirname, 'temp-test');

describe('Setup test', () => {

    test('setup', () => {
        rimraf.sync(testDir);
        mkdirp.sync(testDir);
    });

});

describe('Should create dirs from single range', () => {

    const pth = path.resolve(testDir, 'test1');

    const input = '1000-1005';

    const validationSet = [
        '1000',
        '1001',
        '1002',
        '1003',
        '1004',
        '1005'
    ];

    test('setup', () => {
        mkdirp.sync(pth);
    });

    test('create dirs', () => {
        m(input, { destination: pth });
    });

    test('check dirs', () => {
        let dirs = [];
        let files = fs.readdirSync(pth);
        for (let i = 0; i < files.length; i++) {
            dirs.push(files[i]);
        }
        let result = isSubsetOf(validationSet, dirs);
        expect(result).toBe(true);
        expect(dirs.length === validationSet.length).toBe(true);
    });

});

describe('Should create dirs from multiple ranges', () => {

    const pth = path.resolve(testDir, 'test2');

    const input = '2011-2015,2160-2162';

    const validationSet = [
        '2011',
        '2012',
        '2013',
        '2014',
        '2015',
        '2160',
        '2161',
        '2162'
    ];

    test('setup', () => {
        mkdirp.sync(pth);
    });

    test('create dirs', () => {
        m(input, { destination: pth });
    });

    test('check dirs', () => {
        let dirs = [];
        let files = fs.readdirSync(pth);
        for (let i = 0; i < files.length; i++) {
            dirs.push(files[i]);
        }
        let result = isSubsetOf(validationSet, dirs);
        expect(result).toBe(true);
        expect(dirs.length === validationSet.length).toBe(true);
    });

});

describe('Should create dirs from multiple ranges and integers', () => {

    const pth = path.resolve(testDir, 'test3');

    const input = '3532,3538-3542,3624-3629,3999';

    const validationSet = [
        '3532',
        '3538',
        '3539',
        '3540',
        '3541',
        '3542',
        '3624',
        '3625',
        '3626',
        '3627',
        '3628',
        '3629',
        '3999'
    ];

    test('setup', () => {
        mkdirp.sync(pth);
    });

    test('create dirs', () => {
        m(input, { destination: pth });
    });

    test('check dirs', () => {
        let dirs = [];
        let files = fs.readdirSync(pth);
        for (let i = 0; i < files.length; i++) {
            dirs.push(files[i]);
        }
        let result = isSubsetOf(validationSet, dirs);
        expect(result).toBe(true);
        expect(dirs.length === validationSet.length).toBe(true);
    });

});

describe('Should create dirs with prepend and append', () => {

    const pth = path.resolve(testDir, 'test4');

    const input = '4100,4201-4205,4300';

    const options = {
        prepend: 'pre-',
        append: '-app'
    };

    const validationSet = [
        'pre-4100-app',
        'pre-4201-app',
        'pre-4202-app',
        'pre-4203-app',
        'pre-4204-app',
        'pre-4205-app',
        'pre-4300-app'
    ];

    test('setup', () => {
        mkdirp.sync(pth);
    });

    test('create dirs', () => {
        m(input, { destination: pth, ...options });
    });

    test('check dirs', () => {
        let dirs = [];
        let files = fs.readdirSync(pth);
        for (let i = 0; i < files.length; i++) {
            dirs.push(files[i]);
        }
        let result = isSubsetOf(validationSet, dirs);
        expect(result).toBe(true);
        expect(dirs.length === validationSet.length).toBe(true);
    });

});

describe('Should throw error for invalid character - letter', () => {

    const input = '5100a-5102';

    test('create dirs', () => {
        expect(() => {
            m(input, { destination: testDir });
        }).toThrowError();
    });

});

describe('Should throw error for invalid range', () => {

    const input = '6100-6099';

    test('create dirs', () => {
        expect(() => {
            m(input, { destination: testDir });
        }).toThrowError();
    });

});

describe('Should throw error for invalid character - decimal', () => {

    const input = '1.1-1.5';

    test('create dirs', () => {
        expect(() => {
            m(input, { destination: testDir });
        }).toThrowError();
    });

});

describe('Should throw error for invalid format', () => {

    const input = '-1-11';

    test('create dirs', () => {
        expect(() => {
            m(input, { destination: testDir });
        }).toThrowError();
    });

});

describe('Cleanup test', () => {

    test('cleanup', () => {
        rimraf.sync(testDir);
    });

});
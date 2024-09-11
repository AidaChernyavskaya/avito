const transferDateFormat = require('../utils/dateFunctions')

describe('Test Date Format', () => {
    test('Correct value', () => {
        const date = new Date("2020-05-12T09:00:00.817Z");
        expect(transferDateFormat(date)).toEqual("12.05.2020");
    })

    test('Incorrect value', () => {
        expect(transferDateFormat('aaa')).toEqual('');
    })
})

export {}
import countItemsInOrder from '../utils/helpFunctions';

describe('Test Help Functions', () => {
    test('Correct value', () => {
        const orderItems = [
            {
                "id": "8",
                "name": "Новый айфон",
                "price": 100000,
                "createdAt": "2024-08-12T12:16:55.351Z",
                "views": 200000,
                "likes": 302,
                "imageUrl": "",
                "count": 3
            },
            {
                "id": "6",
                "name": "Картонная коробка",
                "description": "Прочная.",
                "price": 7000,
                "createdAt": "2024-04-12T20:16:55.351Z",
                "views": 1,
                "likes": 0,
                "imageUrl": "",
                "count": 2
            }]
        expect(countItemsInOrder(orderItems)).toEqual(5);
    })
})


import Draw from '../lib/draw';

const dummyCompetitors = [
    {
        "id": "2200727a-d3bc-418d-bcd8-19834b9a16fa",
        "name": "Ajax"
    },
    {
        "id": "f4876e75-0073-4f11-8aac-759c738ae22f",
        "name": "Feyenoord"
    },
    {
        "id": "aacd2d6f-ed63-46f8-9d2c-6e9985fc5f69",
        "name": "PSV"
    },
    {
        "id": "52e62ab4-6b8c-4d99-ae45-f6f1548d9d99",
        "name": "Barcelona"
    },
    {
        "id": "747027ca-0ab1-44e0-a0b4-66ca919460f0",
        "name": "Real Madrid"
    },
    {
        "id": "bb24f871-4aec-4427-bebf-d5a047984ee2",
        "name": "Man City"
    },
    {
        "id": "bb88467f-d05c-4140-8de4-c536b45a325e",
        "name": "Liverpool"
    },
    {
        "id": "642916a7-50c0-47cb-8b9c-76b182ffda02",
        "name": "Arsenal"
    }
]

describe('draw input', () => {
    it('handles input of an array with odd length', () => {
        expect(() => new Draw([...dummyCompetitors.slice(-3)])).toThrow('Amount of competitors and amount of matches has to be even')
    })
})
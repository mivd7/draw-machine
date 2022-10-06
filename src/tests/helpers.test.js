import Draw from '../lib/draw';
import { divideMatchboard, getTournamentGridColumns, hasDuplicates } from '../lib/helpers';

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

const draw = new Draw(dummyCompetitors);
const dummyTournament = draw.generateTournament();
const tournamentKeys = Object.keys(dummyTournament);

describe('hasDuplicates', () => {
    const arrWithDuplicates = ['a', 'b', 'c', 'c', 'd', 'e'];
    const arrWODuplicates = ['a','b','c','d','e','f','g'];
    it('returns true when supplied an array with duplicates', () => {
        expect(hasDuplicates(arrWithDuplicates)).toBe(true)
    })

    it('returns false when supplied an array without duplicates', () => {
        expect(hasDuplicates(arrWODuplicates)).toBe(false)
    })

    it('returns false when supplied an array with length 1', () => {
        expect(hasDuplicates(['a'])).toBe(false)
    })
    it('returns undefined for any input that is not an array', () => {
        expect(hasDuplicates(1)).toBeUndefined()
        expect(hasDuplicates(undefined)).toBeUndefined()
        expect(hasDuplicates('a')).toBeUndefined()
        expect(hasDuplicates(false)).toBeUndefined()
    })
})

describe('divideMatchboard', () => {
    it('divides a given matchboard array into two equal parts', () => {
        const tournamentKey = tournamentKeys[0];
        const result = divideMatchboard(dummyTournament[tournamentKey].matchboard, tournamentKey);
        expect(result.rightSide.length).toEqual(result.leftSide.length);
    })

    it('handles array with length 1', () => {
        const finalTournamentKey = tournamentKeys[tournamentKeys.length - 1];
        const result = divideMatchboard(dummyTournament[finalTournamentKey].matchboard, finalTournamentKey);
        expect(result).toBeUndefined()
    })
})

describe('getTournamentGridColumns', () => {
    let result = getTournamentGridColumns([...tournamentKeys], dummyTournament)
    const { leftCols, rightCols, middleCol } = result;
    it('returns an array of match arrays for leftCols', () => {
        leftCols.forEach(col => expect(col).toBeInstanceOf(Array))
    });

    it('returns an array of match arrays for rightCols', () => {
        rightCols.forEach(col => expect(col).toBeInstanceOf(Array))
    })

    it('returns an array of 1 match for the middle (final) col', () => {
        expect(middleCol.length).toBe(1);
        expect(middleCol[0]).toBeInstanceOf(Object)
    })
})
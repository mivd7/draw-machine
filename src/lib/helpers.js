export function hasDuplicates(array) {
    if(array && Array.isArray(array)) {
        return (new Set(array)).size !== array.length;
    }
    return undefined;
}

export function divideMatchboard (arr, roundKey) {
    if(arr.length > 1) {
        const middleIndex = Math.ceil(arr.length / 2)
        const leftSide = [...arr].splice(0, middleIndex).map(match => {
            return {
                ...match,
                gridSide: 'left',
                round: roundKey
            }
        });

        const rightSide = [...arr].splice(-middleIndex).map(match => {
            return {
                ...match,
                gridSide: 'right',
                round: roundKey
            }
        });

        return {
            leftSide,
            rightSide
        }
    } 
    return undefined;
}

export function getTournamentGridColumns(tournamentKeys, tournament) {
    if(tournament) {
        const lastRoundKey = tournamentKeys.pop();
        const result = {
            leftCols: [],
            rightCols: [],
            // middle column represents final round of tournament
            middleCol: tournament[lastRoundKey].matchboard
        };
        tournamentKeys.forEach(key => {
            const divided = divideMatchboard(tournament[key].matchboard, key)
            if(divided) {
                result.leftCols.push(divided.leftSide)
                result.rightCols.push(divided.rightSide)
            }
        })

        return result;
    }
    return undefined
}
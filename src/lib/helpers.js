export function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}

export function divideMatchboard (arr) {
    console.log('divde arg', arr)
    if(arr.length > 1) {
        const middleIndex = Math.ceil(arr.length / 2)
        const leftSide = [...arr].splice(0, middleIndex);   
        const rightSide = [...arr].splice(-middleIndex);
        return {
            leftSide,
            rightSide
        }
    } 
}

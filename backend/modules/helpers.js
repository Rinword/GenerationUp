const randomInteger = (min, max) => {
    let rand = min + Math.random() * (max - min);
    rand = Math.round(rand);

    return rand;
}

const stringReverse = str => {
    return str.split("").reverse().join("");
}

const getRandomColor = () => "#" + ((1 << 24) * Math.random() | 0).toString(16);

module.exports = {
    randomInteger: randomInteger,
    stringReverse: stringReverse,
    getRandomColor: getRandomColor,
}
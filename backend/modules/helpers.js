const randomInteger = (min, max) => {
    let rand = min + Math.random() * (max - min);
    rand = Math.round(rand);

    return rand;
}

const stringReverse = str => {
    return str.split("").reverse().join("");
}

const getRandomColor = () => "#" + ((1 << 24) * Math.random() | 0).toString(16);

const hiperbalNormalizer = (value, freeCf) => {
    let fc = freeCf || 5;

    return (value / (fc + value));
};

const linealInterpolation = (x1, y1, x2, y2, value) => {
    return y1 + ( (value - x1) / (x2 - x1) * (y2 - y1) );
}

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = {
    randomInteger: randomInteger,
    stringReverse: stringReverse,
    getRandomColor: getRandomColor,
    hiperbalNormalizer: hiperbalNormalizer,
    linealInterpolation: linealInterpolation,
    capitalizeFirstLetter: capitalizeFirstLetter,
}

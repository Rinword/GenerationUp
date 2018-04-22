export const randomInteger = (min, max) => {
    let rand = min + Math.random() * (max - min);
    rand = Math.round(rand);

    return rand;
}

export const getRandomColor = () => "#" + ((1 << 24) * Math.random() | 0).toString(16);

export const doToFixed = (obj, fixedValue) => {
    if(!obj) return;
    for(let key in obj) {
        if(typeof obj[key] === 'number') {
            obj[key] = +(obj[key].toFixed(fixedValue));
        }
        else if(typeof obj[key] === 'object') {
            this.doToFixed(obj[key], fixedValue)
        }
    }
    return obj;
}

export const stringReverse = str => {
    return str.split("").reverse().join("");
}

export const capitalize1Letter = str => {
    if(typeof str !== 'string' || !str.length) return str;
    return str.charAt(0).toUpperCase() + str.slice(1)
}

export const hiperbalNormalizer = (value, freeCf) => {
    let fc = freeCf || 5;
    return (value / (fc + value));
}

export const linealInterpolation = (x1, y1, x2, y2, value) => {
    return y1 + ( (value - x1) / (x2 - x1) * (y2 - y1) );
}

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

const defaultOptions = {
    replace: true,
    exceptionPaths: [],
};

export const deepExtend = (destination, source, options) => {
    // Create a copy of our destination so as not to make modifications to the original
    destination = destination instanceof Array ? destination.slice() : { ...destination };

    //init props
    if (options instanceof Object) {
        options = { ...defaultOptions, ...options };
    } else {
        options = defaultOptions;
    }

    for (let property in source) {
        // Exception property
        if (~options.exceptionPaths.indexOf(property)) {
            continue;
        }

        // Simple value, save to destination
        if (destination[property] instanceof Object === false) {
            destination[property] = source[property];

            // Fail fast
            continue;
        }

        // We're dealing with a real object, merge it recursively
        if (destination[property] instanceof Array === false) {
            destination[property] = destination[property] || {};
            destination[property] = deepExtend(destination[property], source[property], options);
            continue;
        }

        // We're dealing with an array,
        // We'll either replace or merge, based on options.replace
        const isEmptyArray = !(destination[property] && destination[property].length > 0);

        // Replace the array with the new one
        if (options.replace || isEmptyArray) {
            destination[property] = source[property].slice();
            continue;
        }

        // Merge the two arrays
        destination[property] = destination[property].slice().concat(source[property]);
    }

    return destination;
};
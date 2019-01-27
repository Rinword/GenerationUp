
const defaultConfig = {
    usual: [1, 10, 20, 30],
    // unusual: [1, 10, 20, 30],
    // rare: [1, 10, 20, 30],
    // epic: [1, 10, 20, 30],
}

function generateItem (options, quality, lvl) {
    return {
        quality,
        lvl,
        options,
    }
}

export function generateItems(itemOptions, config = defaultConfig) {
    const data = [];

    Object.keys(config).map(quality => {
        config[quality].forEach(lvl => data.push(generateItem(itemOptions, quality, lvl)))
    })

    return data;
}


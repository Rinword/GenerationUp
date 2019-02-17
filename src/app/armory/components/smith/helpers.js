const defaultConfig = [1, 10, 20, 30];

function generateItem (options, lvl) {
    return {
        lvl,
        options,
    }
}

export function generateItems(itemOptions, config = defaultConfig) {
    return config.map(lvl => generateItem(itemOptions, lvl));
}


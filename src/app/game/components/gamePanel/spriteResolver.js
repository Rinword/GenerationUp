import terrainTiles from 'static/img/game/mapObjects/terrainTilesX32.png';

export default {
    colors: {
        grass1: '#479156',
        wall1: '#4c4c4c',
    },

    sources: ['static/img/game/mapObjects/terrainTilesX32.png'],

    bitmaps: {
        grass1: {source: 'static/img/game/mapObjects/terrainTilesX32.png', size: 32, x: 0, y: 0.5 * 32 },
        wall1: {source: 'static/img/game/mapObjects/terrainTilesX32.png', size: 32, x: 3 * 32, y: 2 * 32 },
    },

    getSources() {
        return this.sources;
    },

    getBgColor(icon) {
        return this.colors[icon] || '#dedede';
    },

    getBitMap(icon) {
        return this.bitmaps[icon] || null;
    },
}

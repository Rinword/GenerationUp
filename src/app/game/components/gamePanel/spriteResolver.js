export default {
    data: {
        grass1: '#479156',
        wall: '#4c4c4c',
    },

    getSprite(icon) {
        return this.data[icon] || '#dedede';
    }
}
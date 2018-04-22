const helpers =  require('../helpers');

module.exports = {
    data: {
        '01': 'Воин',
        '02': 'Паладин',
        '03': 'Темный страж',
        '04': 'Хранитель магии',
        '05': 'Хранитель чащи',
        '06': 'Охотник',

        '12': 'Храмовник',
        '13': 'Рыцарь смерти',
        '14': 'Боевой маг',
        '15': 'Энт',
        '16': 'Рейнджер',

        '23': 'Жрец',
        '24': 'Чародей',
        '25': 'Друид',
        '26': 'Охотник на демонов',

        '34': 'Чернокнижник',
        '35': 'Колдун',
        '36': 'Гончий хаоса',

        '45': 'Шаман',
        '46': 'Застрельщик',

        '56': 'Егерь',
    },

    getClassNameById(id) {
        return (this.data[id] || this.data[helpers.stringReverse(id)]) || null;
    },

    getIdByClassName(className) {
        for(let key in this.data) {
            if(this.data[key] === className) return key;
        }

        return null;
    }
}
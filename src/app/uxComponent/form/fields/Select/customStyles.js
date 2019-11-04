import _ from 'lodash';

const colors = {
    usual: 'white',
    unusual: '#1cbb53',
    rare: '#07428b',
    epic: '#6d1695',
    legendary: '#e28a1e',
}

function getRareColor (color) {
    return colors[color];
}

export default {
    option: (provided, state) => {
        return {
            ...provided,
            color: getRareColor(_.get(state, 'data.rare', 'white')),
            fontWeight: '600',
            '&:hover': {
                backgroundColor: '#424242'
            }
        }
    },
    menu: provided => ({
        ...provided,
        backgroundColor: 'black',
    }),
    container: provided => ({
        ...provided,
        border: 'none',
        borderBottom: '1px solid white',
    }),
    control: provided => ({
        ...provided,
        backgroundColor: 'transparent',
        border: 'none',
        boxShadow: 'none',
    }),
    indicatorSeparator: provided => ({
        ...provided,
        display: 'none',
    }),
    valueContainer: provided => ({
        ...provided,
        paddingLeft: '0',
    }),
    singleValue: provided => ({
        ...provided,
        color: 'white',
    }),
    placeholder: provided => ({
        ...provided,
        color: 'white',
    }),
}
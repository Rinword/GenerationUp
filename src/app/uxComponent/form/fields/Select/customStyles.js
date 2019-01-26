export default {
    option: (provided, selected) => ({
        ...provided,
        color: 'white',
        fontWeight: '600',
        '&:hover': {
            backgroundColor: '#424242'
        }
    }),
    menu: provided => ({
        ...provided,
        backgroundColor: 'black',
    }),
    container: provided => ({
        ...provided,
        border: 'none',
        borderBottom: '1px solid white',
    }),
    control: (provided, focused) => ({
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
}
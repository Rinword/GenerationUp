import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// import './styles.scss';

class GearItem extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { name, level, rare } = this.props;

        return (
            <div className={cx('gear-item', this.props.className)}>
                <div className='gear-item__content'>
                    {name}
                    {level}
                    {rare}
                </div>
            </div>
        );
    }
}

GearItem.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    level: PropTypes.number,
    rare: PropTypes.number,
};

GearItem.defaultProps = {
    className: '',
};

export default GearItem;

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// import './styles.scss';

class WowTooltip extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { data } = this.props;

        return (
            <div className={cx('wow-tooltip', this.props.className)}>
                {JSON.stringify(data)}
            </div>
        );
    }
}

WowTooltip.propTypes = {
    className: PropTypes.string,
    data: PropTypes.object,
};

WowTooltip.defaultProps = {
    className: '',
    data: {},
};

export default WowTooltip;

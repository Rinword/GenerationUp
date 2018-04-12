import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './styles.scss';

class RightPanel extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className={cx('right-panel', this.props.className)}>
                <div>rightPanel</div>
            </div>
        );
    }
}

RightPanel.propTypes = {
    className: PropTypes.string,
};

RightPanel.defaultProps = {
    className: '',
};

export default RightPanel;

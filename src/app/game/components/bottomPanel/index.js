import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './styles.scss';

class BottomPanel extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className={cx('bottom-panel', this.props.className)}>
                <div>BottomPanel</div>
            </div>
        );
    }
}

BottomPanel.propTypes = {
    className: PropTypes.string,
};

BottomPanel.defaultProps = {
    className: '',
};

export default BottomPanel;

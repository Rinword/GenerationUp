import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import RTooltip from 'rc-tooltip';

import './uxStyles/tooltip.scss';

class Tooltip extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { children, Overlay, data } = this.props;
        return (
            <RTooltip
                overlayClassName={cx('ux-tooltip', this.props.className)}
                overlay={Overlay && <Overlay data={data} /> }
                defaultVisible={false}
                trigger={['click']}
            >
                {children}
            </RTooltip>
        );
    }
}

Tooltip.propTypes = {
    className: PropTypes.string,
    Overlay: PropTypes.func,
    data: PropTypes.object
};

Tooltip.defaultProps = {
    className: '',
    Overlay: () => <div>tooltip</div>,
    data: {}
};

export default Tooltip;

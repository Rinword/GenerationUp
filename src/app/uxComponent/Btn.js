import React from 'react';
import PropTypes from 'prop-types';

import './uxStyles/Btn.scss';

class Btn extends React.Component {

    constructor(props){
        super(props);

        this.onClick = () => {
            this.props.onClick && this.props.onClick();
        }
    }

    renderInnerIcon() {
        return(
            <div className={'ux-btn__inner-icon icon icon_'+ this.props.innerIconName} />
        )
    }

    render(){
        return (
            <button className={"ux-btn " + (this.props.className? this.props.className : '')} onClick={this.onClick}>
                {this.props.children}
                {this.props.innerIconName && this.renderInnerIcon()}
            </button>
        )
    }
}

Btn.propTypes = {
    className: PropTypes.string,
};

Btn.defaultProps = {
    className: '',
};

export default Btn;
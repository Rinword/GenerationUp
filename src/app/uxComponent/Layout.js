import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import './uxStyles/Layout.scss';

class Layout extends React.PureComponent {
    render() {
        const { direction, jc, ai, noFlex, multiStr, hidden, disabled, className, margin, padding, tagName, flexGrow,
            minHeight, ...params } = this.props;

        const classNames = cx(
            'ux-layout',
            { ['ux-l_no_flex']: noFlex },
            { ['ux-layout_column']: direction === 'column' },
            { ['ux-l_wrap']: multiStr },
            { ['ux-l_hidden']: hidden },
            { ['ux-l_disabled']: disabled },
            [`ux-l_jc_${jc ? jc : 'flex-start'}`],
            [`ux-l_ai_${ai ? ai : 'center'}`],
            [className]
        );

        return (
            <div className={classNames} style={{margin: margin, padding: padding}} {...params}>
                {this.props.children}
            </div>
        );
    }
}

Layout.displayName = 'Layout';
Layout.propTypes = {
    noFlex: PropTypes.bool,
    hidden: PropTypes.bool,
    multiStr: PropTypes.bool,
    disabled: PropTypes.bool,
    onScroll: PropTypes.func,
    tagName: PropTypes.string,
    className: PropTypes.string,
    direction: PropTypes.oneOf(['row', 'column']),
    ai: PropTypes.oneOf(['flex-start', 'center', 'stretch', 'flex-end']),
    jc: PropTypes.oneOf(['flex-start', 'center', 'stretch', 'flex-end', 'space-around', 'space-between']),
};

Layout.defaultProps = {};

class Row extends React.PureComponent {
    render() {
        return (
            <Layout {...this.props} direction="row">
                {this.props.children}
            </Layout>
        );
    }
}

class Column extends React.PureComponent {
    render() {
        return (
            <Layout {...this.props} direction="column">
                {this.props.children}
            </Layout>
        );
    }
}

export default { Layout, Row, Column };
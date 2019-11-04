import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import axios from 'axios';

import { Row, Column, Btn } from 'ui/UxBox';

import Anvil from './Anvil';
import { LoadPrintPanel } from './LoadPrintPanel';
import { CreateItemPanel } from './CreateItemPanel';
import ShowRoom from './ShowRoom';

import './styles.scss';

class Smith extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {data: []};
    }

    onChange = blueprint => {
        if(blueprint) {
            this.setState({ blueprint });

        }
    }

    onChangeBlueprint = (blueprint, id) => {
        if(blueprint && id) {
            this.setState({ blueprint: {...blueprint, id} });
        }
    }

    render() {
        const { blueprint } = this.state;

        return (
            <Row ai="flex-start" className={cx('smith', this.props.className)}>
                <Anvil className="smith__anvil" blueprint={blueprint} onChange={this.onChange} />
                <Column className="smith__item-props">
                    <LoadPrintPanel className="smith__blueprint-panel" itemOptions={blueprint} onChange={this.onChangeBlueprint}/>
                    <CreateItemPanel className="smith__create-item-panel" blueprint={blueprint} />
                    <ShowRoom className="smith__show-room" itemOptions={blueprint}/>
                </Column>
            </Row>
        );
    }
}

Smith.propTypes = {
    className: PropTypes.string,
};

Smith.defaultProps = {
    className: '',
};

export default Smith;

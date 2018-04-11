import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { push } from 'react-router-redux';
import { NavLink } from 'react-router-dom';
import { Row, Column, Btn } from 'ui/UxBox';
import { Route, Switch } from 'react-router';
import moment from 'moment';
import Game from './game';
import About from './about';
import NoPage from './noPage';

import './uxComponent/uxStyles/index.scss';
import './styles.scss';

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        moment.locale('ru');

    }

    render() {
        return(
            <Column className="main">
                <Row tagName="header" className={cx("main__header", '')} height="40px" ai="center" flexGrow="0">
                    <Row width="auto" className="main__logo" height="auto" margin="0 10px">
                        <NavLink to='/'>Generation Up</NavLink>
                    </Row>
                    <NavLink className="main__link" activeClassName='main__link_active' to='/game'>GAME</NavLink>
                    <NavLink className="main__link" activeClassName='main__link_active' to='/about'>о проекте</NavLink>
                </Row>
                <Row className="main__body" overflow="auto" minHeight="calc(100vh - 120px)">
                    <Switch>
                        <Route exact path='/' component={Game} />
                        <Route path='/about' component={About} />
                        <Route component={NoPage} />
                    </Switch>
                </Row>
                {/*<Row className="main__footer" jc="center" ai="center" height="40px">*/}
                    {/*<p>TVOROZHOCK 2018. Все права защищены (но это не точно)</p>*/}
                {/*</Row>*/}
            </Column>
        )
    }
}

export default App;

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { NavLink } from 'react-router-dom';
// import { Row, Column, Btn } from 'ui/UxBox';
import { Route, Switch } from 'react-router';
import moment from 'moment';

// import './style.scss';

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        moment.locale('ru');

    }

    render() {
        return(
            <div>TEST</div>
        )
    }
}

export default App;

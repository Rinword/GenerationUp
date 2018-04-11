import React from 'react';
import { Link } from 'react-router-dom'

export default class NoPage extends React.Component {

    render() {
        return(
            <div>
                <h1>Этот раздел еще в разработке, вернитесь позже</h1>
                <Link to='/'>Домой</Link>
            </div>

        )
    }
}
import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Home from './Home'
import Contacts from './Contacts'


export default class extends Component {
    render() {
        return (
            <div>
                <Route exact path='/' component={Home} />
                <Route exact path='/Contacts' component={Contacts} />
            </div>
        )
    }
}

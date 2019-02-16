//import React from 'react';
import React, { Component } from 'react'
//import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

//////////

//state




////////////

// npm install apollo-boost react-apollo graphql-tag graphql --save
// npm install react-router-dom
// npm install material-ui

import Routes from './Routs'

export default class extends Component {


    componentDidMount() {
        fetch(`http://localhost:9000/jobs`,
        {
            method: "GET"
        })
        .then(res => res.json())
        .catch(err => {
            this.setState({errormessage: err.message})
        })
        .then(response => { 
            this.setState({})
        })
    }
    
    render() {
        return (
    <Router>
        <MuiThemeProvider>
        <Routes/>
        </MuiThemeProvider>
    </Router>
        )
    }
}

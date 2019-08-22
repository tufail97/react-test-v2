import React from "react";
import ReactDOM from "react-dom";
import AdminPanel from "./admin-panel/AdminPanel.js";
import FrontPage from "./front-page/FrontPage.js";
import LoginPage from "./login-page/LoginPage.js";
import GlobalHeader from "./global-elements/GlobalHeader.js";
import {Route, BrowserRouter, Router} from 'react-router-dom';
import "./styles.css";

import { history } from './_helpers/history.js';
import { authenticationService } from './_services/authentication.service.js';
import { PrivateRoute } from './_components/index.js';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            storage: 0
        }
        this.pass = this.pass.bind(this);
    }

    pass(value) {
        this.setState({
            storage: value
        })
    }

    render() {
        return (
            <Router history={ history }>
            <div>
                <GlobalHeader storage={this.state.storage}/>
                <Route exact path="/" component={FrontPage}/>
                <Route exact path="/login" render={(props) => <LoginPage {...props} pass={this.pass} />} />
                <PrivateRoute exact path="/admin"component={AdminPanel}/>
            </div>
            </Router>
        )
    }
}

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root')); 
import React from "react";
import ReactDOM from "react-dom";
import AdminPage from "./admin-page/AdminPage.js";
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
            loggingIn: null
        }
        this.pass = this.pass.bind(this);
    }

    pass() {
        this.setState({
            loggingIn: true
        })
    }

    render() {
        return (
            <Router history={ history }>
            <div>
                <GlobalHeader />
                <Route exact path="/" component={FrontPage}/>
                <Route exact path="/login" render={(props) => <LoginPage {...props} pass={this.pass} />} />
                <PrivateRoute exact path="/admin"component={AdminPage}/>
            </div>
            </Router>
        )
    }
}

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root')); 
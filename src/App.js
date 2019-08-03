import React from "react";
import ReactDOM from "react-dom";
import AdminPanel from "./admin-panel/AdminPanel.js";
import FrontPage from "./front-page/FrontPage.js";
import LoginPage from "./login-page/LoginPage.js";
import {Route, BrowserRouter, Router} from 'react-router-dom';

import { history } from './_helpers/history.js';
import { authenticationService } from './_services/authentication.service.js';
import { PrivateRoute } from './_components/index.js';

class App extends React.Component {


    render() {
        return (

            <Router history={ history }>
            <div>
                <Route exact path="/" component={FrontPage}/>
                <Route exact path="/login" component={LoginPage}/>
                <PrivateRoute exact path="/admin"component={AdminPanel}/>
            </div>
            </Router>
        )
    }
}

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root')); 
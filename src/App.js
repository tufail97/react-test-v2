import React from "react";
import ReactDOM from "react-dom";
import AdminPanel from "./admin-panel/AdminPanel.js";
import FrontPage from "./front-page/FrontPage.js";
import { Router } from "@reach/router";

class App extends React.Component {


    render() {
        return (
            <Router id="main-container">
                <FrontPage path="/" />
                <AdminPanel path="/admin"/>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root')); 
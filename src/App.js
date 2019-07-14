import React from "react";
import ReactDOM from "react-dom";
import AdminPanel from "./admin-panel/AdminPanel.js";
import FrontPage from "./front-page/FrontPage.js";
import {Route, BrowserRouter} from 'react-router-dom';
class App extends React.Component {


    render() {
        return (
            <div>
                <Route exact path="/" component={FrontPage}/>
                <Route exact path="/admin"component={AdminPanel}/>
            </div>
        )
    }
}

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root')); 
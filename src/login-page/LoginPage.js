import React from "react";
import { authenticationService } from '../_services/authentication.service.js';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            success: '',
            isSubmitting: ''
        }

        this.handleUser = this.handleUser.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        //redirect to home if already logged in
        if (authenticationService.currentUserValue) { 
            this.props.history.push('/admin');
        }
    }

    handleUser(event) {
        this.setState({
            username: event.target.value,
            success: ''
        })
    }

    handlePassword(event) {
        this.setState({
            password: event.target.value,
            success: ''
        })
        console.log(this.state);
    }

    handleSubmit(event) {
        event.preventDefault();
        const {username, password} = this.state;
        this.auth(username,password);
        this.setState({
            isSubmitting: true
        })
    }

    auth(user,pass) {
        authenticationService.login(user,pass)
        .then(
            user => {
                const { from } = this.props.location.state || { from: { pathname: "/admin" } };
                this.props.history.push(from);
                this.props.pass();
            },
            error => {
                console.log(this.state);
                this.setState({
                    success: false,
                    isSubmitting: false
                })
                console.log(this.state);
            }
        )
    }

    render () {
        return (
           <div className="login-outer">
               <form onSubmit={this.handleSubmit}>
                   <div className="login-container">
                       <label className="login-label" htmlFor="username">Username:</label>
                       <input value={this.state.username} onChange={this.handleUser} className="login-input" name="username" type="text" />
                   </div>
                   <div className="login-container">
                       <label className="login-label" htmlFor="password">Password:</label>
                        <input value={this.state.password} onChange={this.handlePassword} className="login-input" name="password" type="password" />
                   </div>
                   <div className="login-container">
                       <button className="login-button" type="submit">Login</button>
                   </div>
                   <div className="login-container">
                       <div className="login-status">
                        {
                            this.state.success === false ? <div>Please try again</div> : ""
                        }
                            {
                                this.state.isSubmitting ? <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" /> : ""
                            }
                        </div>
                   </div>
               </form>
           </div>
        )
    }
}
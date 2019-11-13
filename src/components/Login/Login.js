import React from 'react';
import './style.css'

class Login extends React.Component
{

    render(){
        return(
            <div className="container">
                <div className="col align-self-center login_page_heading">
                    <h2>Booking Zone</h2>
                    <h4>All your facility booking now a click away!</h4>
                </div>

                <div className="login_form_wrapper">
                    <form>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input id="username" type="text" className="form-control" placeholder="Enter username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" className="form-control" placeholder="Enter password"/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
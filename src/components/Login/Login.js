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
                        <h4 className='form_heading'>Login</h4>
                        <div className="form-group">
                            <input id="username" type="text" className="form-control" placeholder="Enter username" required/>
                        </div>
                        <div className="form-group">
                            <input id="password" type="password" className="form-control" placeholder="Enter password" required/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
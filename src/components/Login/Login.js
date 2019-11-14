import React from 'react';
import './style.css'

class Login extends React.Component
{
    constructor(props){
        super(props);

        this.state = {
            username: "",
            password: ""
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(e){
        this.setState({username : e.target.value});
    }

    handlePasswordChange(e){
        this.setState({password: e.target.value});
    }

    handleSubmit(event) {

    }



    render(){
        return(
            <div className="container">
                <div className="col align-self-center login_page_heading">
                    <h2>Booking Zone</h2>
                    <h4>All your facility booking now a click away!</h4>
                </div>

                <div className="login_form_wrapper">
                    <form onSubmit={this.handleSubmit}>
                        <h4 className='form_heading'>Login</h4>
                        <div className="form-group">
                            <input id="username" type="text" className="form-control" placeholder="Enter username" required onChange={this.handleUsernameChange}/>
                        </div>
                        <div className="form-group">
                            <input id="password" type="password" className="form-control" placeholder="Enter password" required onChange={this.handlePasswordChange}/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
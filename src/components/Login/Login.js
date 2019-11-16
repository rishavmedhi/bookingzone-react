import React from 'react';
import { Redirect } from 'react-router-dom'
import './style.css'
import axios from 'axios';
import Cookies from 'universal-cookie';
import {base_url, show_toast} from "../../utilities/utilities";


class Login extends React.Component
{
    constructor(props){
        super(props);

        this.state = {
            username: "",
            password: "",
            redirect: false
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
        event.preventDefault();
        let username = this.state.username;
        let password = this.state.password;

        axios.post(base_url+'login/',{
            username : username,
            password: password
        }).then((response) => {
           let data = response.data;

           if(data.status===1)
           {
               // saving the uid to the cookie
               const cookies = new Cookies();
               cookies.set("uid",data.user._id,{ path: '/' });

               this.setState({
                   redirect : true
               });
           }
           else
                show_toast(data.msg,"","fail");
        }).catch(function(e){
            console.log(e);
        });
    }



    render(){
        if(this.state.redirect === true)
        {
            return <Redirect to='/dashboard' />
        }
        /* checking cookie setting redirect to dashboard if cookie is set */
        let cookie = new Cookies();
        if(typeof cookie.get("uid")!=="undefined" && cookie.get("uid")!=="")
        {
            return <Redirect to='/dashboard' />
        }

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
                            <input id="username" type="text" className="form-control" placeholder="Enter username" required autoComplete="off" onChange={this.handleUsernameChange}/>
                        </div>
                        <div className="form-group">
                            <input id="password" type="password" className="form-control" placeholder="Enter password" required autoComplete="off" onChange={this.handlePasswordChange}/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
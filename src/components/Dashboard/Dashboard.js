import React from 'react';
import { Redirect } from 'react-router-dom'
// import './style.css'
import axios from 'axios';
import Login from "../Login/Login";

class Dashboard extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render() {
        return(
            <nav className="navbar navbar-light bg-light">
                <span className="navbar-brand mb-0 h1">BookingZone</span>
                
            </nav>


        );
    }
}

export default Dashboard;
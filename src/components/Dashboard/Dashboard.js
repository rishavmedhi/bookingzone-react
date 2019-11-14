import React from 'react';
import { Redirect } from 'react-router-dom'
import './style.css'
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
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <span className="navbar-brand mb-0 h1">BookingZone</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end">
                    <div className="navbar-nav">
                        <div className="nav-item nav-link">My Bookings</div>
                        <div className="nav-item nav-link">Logout</div>
                    </div>
                </div>

            </nav>


        );
    }
}

export default Dashboard;
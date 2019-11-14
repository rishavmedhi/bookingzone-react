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
            <div>
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
                <div className="dashboard_container container">
                    <div className="col align-self-center justify-content-center">
                        <h3>What would you like to book today?</h3>
                    </div>

                    <div className="booking_wrapper">
                        <form>
                            <div className="activity_wrapper">
                                <h4>Activities </h4>
                                <div className="activity_select_wrapper">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="activity" value="TENNIS" checked />
                                        <label className="form-check-label">Tennis Court</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="activity" value="SWIMMING" />
                                        <label className="form-check-label">Swimming Pool</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="activity" value="BADMINTON" />
                                        <label className="form-check-label">Badminton</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="activity" value="GYM" />
                                        <label className="form-check-label">Gym</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="activity" value="CLUBHOUSE" />
                                        <label className="form-check-label">Club House</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="activity" value="CYCLE" />
                                        <label className="form-check-label">Cycle Track</label>
                                    </div>
                                </div>
                            </div>

                            <div className="time_selector_wrapper">
                                <h4>Day and Time</h4>
                                <div className="time_selector">
                                    <div className="form-group">
                                        <label htmlFor="booking_day">Booking Day</label>
                                        <input className="form-control" type="date" id="booking_day" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="starttime">Start Time</label>
                                        <select className="form-control" id="starttime">
                                            <option>9:00 A.M.</option>
                                            <option>10:00 A.M.</option>
                                            <option>10:00 A.M.</option>
                                            <option>12:00 P.M.</option>
                                            <option>1:00 P.M.</option>
                                            <option>2:00 P.M.</option>
                                            <option>3:00 P.M.</option>
                                            <option>4:00 P.M.</option>
                                            <option>5:00 P.M.</option>
                                            <option>6:00 P.M.</option>
                                            <option>7:00 P.M.</option>
                                            <option>8:00 P.M.</option>
                                            <option>9:00 P.M.</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="endtime">End Time</label>
                                        <select className="form-control" id="endtime">
                                            <option>9:00 A.M.</option>
                                            <option>10:00 A.M.</option>
                                            <option>10:00 A.M.</option>
                                            <option>12:00 P.M.</option>
                                            <option>1:00 P.M.</option>
                                            <option>2:00 P.M.</option>
                                            <option>3:00 P.M.</option>
                                            <option>4:00 P.M.</option>
                                            <option>5:00 P.M.</option>
                                            <option>6:00 P.M.</option>
                                            <option>7:00 P.M.</option>
                                            <option>8:00 P.M.</option>
                                            <option>9:00 P.M.</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="confirm_booking_wrapper">
                                <button type="submit" className="btn btn-primary booking_submit">Confirm Booking</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>



        );
    }
}

export default Dashboard;
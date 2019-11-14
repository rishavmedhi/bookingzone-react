import React from 'react';
import { Redirect } from 'react-router-dom'
import './style.css'
import axios from 'axios';

class Dashboard extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            uid: "5dcae6e97871aaec87c56911",
            booking_date: getFormattedDate(),
            event: 'TENNIS',
            starttime: 9,
            endtime : 10
        };

        this.HandleCheckChange = this.HandleCheckChange.bind(this);
        this.HandleDateChange = this.HandleDateChange.bind(this);
        this.HandleStartTimeChange = this.HandleStartTimeChange.bind(this);
        this.HandleEndTimeChange = this.HandleEndTimeChange.bind(this);
        this.HandleSubmit = this.HandleSubmit.bind(this);
    }

    /* for detecting change in activity selection */
    HandleCheckChange(e)
    {
        this.setState({event : e.target.value});
    }
    /* for detecting change of the date picker */
    HandleDateChange(booking_date){
        this.setState({booking_date : booking_date});
    }
    /* for detecting change of the startime selector */
    HandleStartTimeChange(starttime){
        this.setState({starttime : starttime});
    }
    /* for detecting change of the startime selector */
    HandleEndTimeChange(endtime){
        this.setState({endtime : endtime});
    }
    /* Handling on submit action of the form */
    HandleSubmit(e){
        e.preventDefault();

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
                                        <input className="form-check-input" type="radio" name="activity" value="TENNIS" checked={this.state.event==="TENNIS"} onChange={this.HandleCheckChange}/>
                                        <label className="form-check-label">Tennis Court</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="activity" value="SWIMMING" checked={this.state.event==="SWIMMING"} onChange={this.HandleCheckChange} />
                                        <label className="form-check-label">Swimming Pool</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="activity" value="BADMINTON" checked={this.state.event==="BADMINTON"} onChange={this.HandleCheckChange} />
                                        <label className="form-check-label">Badminton</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="activity" value="GYM" checked={this.state.event==="GYM"} onChange={this.HandleCheckChange} />
                                        <label className="form-check-label">Gym</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="activity" value="CLUBHOUSE" checked={this.state.event==="CLUBHOUSE"} onChange={this.HandleCheckChange} />
                                        <label className="form-check-label">Club House</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="activity" value="CYCLE" checked={this.state.event==="CYCLE"} onChange={this.HandleCheckChange}/>
                                        <label className="form-check-label">Cycle Track</label>
                                    </div>
                                </div>
                            </div>

                            <div className="time_selector_wrapper">
                                <h4>Day and Time</h4>
                                <div className="time_selector">

                                    <BookingDay bookingDate={this.state.booking_date} onDateChange={this.HandleDateChange}/>

                                    <StartTime startTime = {this.state.starttime} onStartTimeChange={this.HandleStartTimeChange}/>

                                    <EndTime endTime = {this.state.endtime} onEndTimeChange={this.HandleEndTimeChange}/>
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

class BookingDay extends React.Component
{
    constructor(props)
    {
        super(props);
        this.HandleBookingDateChange = this.HandleBookingDateChange.bind(this);
    }

    HandleBookingDateChange(e)
    {
        this.props.onDateChange(e.target.value);
    }

    render()
    {
        return (
            <div className="form-group">
                <label htmlFor="booking_day">Booking Day</label>
                <input className="form-control" type="date" id="booking_day" value={this.props.bookingDate} onChange={this.HandleBookingDateChange}/>
            </div>
        );
    }
}

/* creates the start time selector */
class StartTime extends React.Component
{
    constructor(props)
    {
        super(props);
        this.HandleStartTimeChange = this.HandleStartTimeChange.bind(this);
    }

    HandleStartTimeChange(e){
        this.props.onStartTimeChange(e.target.value);
    }

    render() {
        // let time = new Date();
        let rows = [];

        for(let i=9;i<=21;i++) {
            // let timevalue= (time.setHours(i, 0, 0, 0)/1000);
            rows.push(
                <TimeRow counter={i} />
            );
        }

        return(
            <div className="form-group">
                <label htmlFor="starttime">Start Time</label>
                <select className="form-control" id="starttime" value={this.props.startTime} onChange={this.HandleStartTimeChange}>
                    {rows}
                </select>
            </div>
        )
    }
}

/* creates the end time selector */
class EndTime extends React.Component
{
    constructor(props)
    {
        super(props);
        this.HandleEndTimeChange = this.HandleEndTimeChange.bind(this);
    }

    HandleEndTimeChange(e)
    {
        this.props.onEndTimeChange(e.target.value);
    }


    render(){

        let rows = [];

        for(let i=9;i<=21;i++) {
            rows.push(
                <TimeRow counter={i} />
            );
        }

        return(
            <div className="form-group">
                <label htmlFor="endtime">End Time</label>
                <select className="form-control" id="endtime" value={this.props.endTime} onChange={this.HandleEndTimeChange}>
                    {rows}
                </select>
            </div>
        );
    }
}

function TimeRow(props)
{
    return(
        <option value={props.counter}>{props.counter}:00 A.M.</option>
    )
}

/* utility function for converting date to required format */
function getFormattedDate()
{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;
   return today;
}

export default Dashboard;
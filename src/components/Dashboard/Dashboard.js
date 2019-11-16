import React from 'react';
import { Redirect } from 'react-router-dom'
import './style.css'
import axios from 'axios';
import Cookies from "universal-cookie";
import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css';

class Dashboard extends React.Component
{
    constructor(props)
    {
        super(props);
        const cookie = new Cookies();
        this.state = {
            uid: cookie.get('uid'),
            booking_date: getFormattedDate(),
            event: 'TENNIS',
            starttime: 9,
            endtime : 10,
            redirectToMyBooking : false
        };

        this.HandleCheckChange = this.HandleCheckChange.bind(this);
        this.HandleDateChange = this.HandleDateChange.bind(this);
        this.HandleStartTimeChange = this.HandleStartTimeChange.bind(this);
        this.HandleEndTimeChange = this.HandleEndTimeChange.bind(this);
        this.HandleSubmit = this.HandleSubmit.bind(this);
        this.HandleMyBookingClick = this.HandleMyBookingClick.bind(this);
        this.HandleLogoutClick = this.HandleLogoutClick.bind(this);
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
    /* handling click of My Booking button */
    HandleMyBookingClick(e){
        this.setState({
            redirectToMyBooking : true
        });
    }
    /* Handling on submit action of the form */
    HandleSubmit(e){
        e.preventDefault();
        /* preparing the data for ajax call */
        /* validation if all is correct */
        let starttime = this.state.starttime;
        let endtime = this.state.endtime;
        let currenttime = Math.floor((new Date().getTime())/1000);
        if(starttime>endtime)
        {
            // alert('The start time is after end time. Please select a proper start time');
            show_toast('The start time is after end time. Please select a proper start time','','fail');
            return;
        }
        if(starttime === endtime)
        {
            // alert('Start time cannot be same with end time. Please select a proper start and end time');
            show_toast('Start time cannot be same with end time. Please select a proper start and end time','','fail');
        }
        let period = (endtime - starttime)+" hrs";

        let booking_date = new Date(this.state.booking_date);
        let starttime_ts = (booking_date.setHours(starttime,0,0,0))/1000;
        let endtime_ts = (booking_date.setHours(endtime,0,0,0))/1000;

        /* checking if booking is not for a old day */
        if(currenttime>starttime_ts || currenttime>endtime_ts)
        {
            // alert('Please select day as today or some upcoming day');

            // iziToast.show({
            //     message: 'Please select day as today or some upcoming day'
            // });
            show_toast('Please select day as today or some upcoming day','','fail');
            return;
        }
        let uid = this.state.uid;
        let event = this.state.event;

        /* Making API call for creating new booking */
        axios.post('http://localhost:3000/bookings/new/',{
            uid : uid,
            starttime: starttime_ts,
            endtime: endtime_ts,
            event: event,
            period: period
        }).then((response) => {
            let data = response.data;
            if(data.status===1)
            {
                // alert(data.msg);
                // iziToast.show({
                //     message: data.msg
                // });
                show_toast(data.msg,'','success');
            }
            if (data.status===0)
            {
                // alert(data.msg);
                // iziToast.show({
                //     message: data.msg
                // });
                show_toast(data.msg,'','fail');
            }
        }).catch(function(e){
            console.log(e);
        });

    }

    /* handling logput change */
    HandleLogoutClick(e)
    {
        const cookie = new Cookies();
        cookie.remove('uid');

        this.setState({
            uid: ""
        })
    }

    render() {
        /* rediecting to my booking page */
        if(this.state.redirectToMyBooking === true)
        {
            return <Redirect to='/dashboard/my-booking' />
        }
        /* redirecting to login if uid is not present */
        if(typeof this.state.uid=== "undefined" || this.state.uid=== "")
        {
            return(
                <Redirect to='/login' />
            );
        }
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <span className="navbar-brand mb-0 h1">BookingZone</span>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <div className="navbar-nav">
                            <div className="nav-item nav-link" onClick={this.HandleMyBookingClick}>My Bookings</div>
                            <div className="nav-item nav-link" onClick={this.HandleLogoutClick}>Logout</div>
                        </div>
                    </div>
                </nav>
                <div className="dashboard_container container">

                    <h3 className="intro_msg">What would you like to book today?</h3>

                    <div className="booking_wrapper">
                        <form onSubmit={this.HandleSubmit}>
                            <div className="activity_wrapper">
                                <h4>Activities </h4>
                                <div className="activity_select_wrapper">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="activity" value="TENNIS" checked={this.state.event==="TENNIS"} onChange={this.HandleCheckChange} id="activity1"/>
                                        <label className="form-check-label" htmlFor="activity1">Tennis Court</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="activity" value="SWIMMING" checked={this.state.event==="SWIMMING"} onChange={this.HandleCheckChange} id="activity2"/>
                                        <label className="form-check-label" htmlFor="activity2">Swimming Pool</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="activity" value="BADMINTON" checked={this.state.event==="BADMINTON"} onChange={this.HandleCheckChange} id="activity3"/>
                                        <label className="form-check-label" htmlFor="activity3">Badminton</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="activity" value="GYM" checked={this.state.event==="GYM"} onChange={this.HandleCheckChange} id="activity4"/>
                                        <label className="form-check-label" htmlFor="activity4">Gym</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="activity" value="CLUBHOUSE" checked={this.state.event==="CLUBHOUSE"} onChange={this.HandleCheckChange} id="activity5"/>
                                        <label className="form-check-label" htmlFor="activity5">Club House</label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="activity" value="CYCLE" checked={this.state.event==="CYCLE"} onChange={this.HandleCheckChange} id="activity6"/>
                                        <label className="form-check-label" htmlFor="activity6">Cycle Track</label>
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
        let rows = [];
        let time = new Date().getHours();


        for(let i=9;i<=21;i++) {
            // let timevalue= (time.setHours(i, 0, 0, 0)/1000);
            rows.push(
                <TimeRow counter={i} am_pm={i>=12?'P.M.':'A.M.'}/>
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

        for(let i=10;i<=22;i++) {
            rows.push(
                <TimeRow counter={i} am_pm={i>=12?'P.M.':'A.M.'}/>
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
        <option value={props.counter} key={props.counter}>{props.counter}:00 {props.am_pm}</option>
    )
}

/* utility function for converting date to required format */
function getFormattedDate()
{
    var today = new Date();
    if(today.getHours()>22)
    {
        today.setDate(today.getDate()+1);
    }
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

/* showing easy toast function */
function show_toast(msg,title,type)
{
    let backgroundColor,color;
    if(type==="fail")
    {
        backgroundColor= 'red';
        color= 'white';
    }
    if(type==="success")
    {
        backgroundColor= 'green';
    }
    iziToast.show({
       title: title,
        message: msg,
        backgroundColor: backgroundColor,
        position: "topCenter",
        color: color
    });
}

export default Dashboard;
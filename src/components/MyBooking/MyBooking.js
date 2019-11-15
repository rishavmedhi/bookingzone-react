import React from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './style.css';

var moment = require('moment');


class MyBooking extends React.Component{
    constructor(props)
    {
        super(props);
        this.state ={
            uid : '5dcae6e97871aaec87c56911',
            redirectToDashboard : false,
            bookings: []
        }
    }

    componentDidMount() {
        axios.post('http://localhost:3000/bookings/user/',{
            uid: this.state.uid
        })
            .then((response) => {
                // handle success
                this.setState({bookings: response.data.bookings});
                console.log(response);
            })
            .catch(function (error) {
                alert('Cannot connect to server');
                console.log(error);
            });
    }

    render(){
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
                           <div className="nav-item nav-link">New Booking</div>
                           <div className="nav-item nav-link">Logout</div>
                       </div>
                   </div>
               </nav>

               <div className="mybooking_container container">

                    <UpcomingBooking bookings={this.state.bookings}/>

                   <PastBookings bookings={this.state.bookings}/>
               </div>
           </div>
        )
    }
}

/* rendering the upcoming bookings section */
function UpcomingBooking(props)
{
    let currenttime = Math.floor((new Date().getTime())/1000);
    let rows=[];
    for(let i=0;i<props.bookings.length;i++)
    {
        let booking = props.bookings[i];
        if(booking.starttime>currenttime || (booking.starttime<=currenttime && booking.endtime>currenttime))
        {
            rows.push(<Booking past="" booking_id={booking._id} event={booking.event} day={moment.unix(parseInt(booking.starttime)).format('Do MMM YYYY')} starttime={moment.unix(parseInt(booking.starttime)).format('hh:mm A')} endtime={moment.unix(parseInt(booking.endtime)).format('hh:mm A')}/>)
        }
    }
    if(rows.length>0)
        return(
            <div className="upcoming_bookings_wrapper">
                <h3>Upcoming Bookings</h3>
                {rows}
            </div>
        );
    else
        return(
            <div className="empty_bookings">
                No Bookings Found!<br />
                Go to New Bookings and make your first Booking!
            </div>
        );
}

/* rendering the past bookings section */
/**
 * @return {null}
 */
function PastBookings(props)
{
    let currenttime = Math.floor((new Date().getTime())/1000);
    let rows=[];
    for(let i=0;i<props.bookings.length;i++)
    {
        let booking = props.bookings[i];
        if(booking.starttime<currenttime)
        {
            rows.push(<Booking past="past" booking_id={booking._id} event={booking.event} day={moment.unix(parseInt(booking.starttime)).format('Do MMM YYYY')} starttime={moment.unix(parseInt(booking.starttime)).format('hh:mm A')} endtime={moment.unix(parseInt(booking.endtime)).format('hh:mm A')}/>)
        }
    }

    if(rows.length>0)
        return(
            <div className="past_bookings">
                <h3>Past Bookings</h3>
                {rows}
            </div>
        );
    else
        return null;
}

function Booking(props)
{
    return(
        <div className={'booking_wrapper '+props.past} data-booking-id={props.booking_id}>
            <div className="event">Event : <span className="event_name">{props.event}</span></div>
            <div className="day_wrapper">Day : <span className="day">{props.day} </span></div>
            <div className="time_wrapper">Time : <span className="time"><span className="starttime">{props.starttime}</span> To <span
                className="endtime">{props.endtime}</span></span>
            </div>
            {CancelRequired(props.past,props.booking_id)}
        </div>
    );
}

class CancelBooking extends React.Component
{
    constructor(props)
    {
        super(props);
        this.HandleCancelClick = this.HandleCancelClick.bind(this);
    }

    HandleCancelClick(e)
    {
        confirmAlert({
            title: 'Confirm to cancel booking',
            message: 'Are you sure to do this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        console.log(this.props.booking_id);
                        axios.post('http://localhost:3000/bookings/cancel/',{
                            'booking_id':this.props.booking_id
                        }).then((response) => {
                            let data = response.data;
                            if(data.status===1)
                            {
                                alert(data.msg);
                                //todo : find a more effeient way to refresh page
                                window.location.reload();
                            }
                            if (data.status===0)
                            {
                                alert(data.msg);
                            }
                        }).catch(function(e){
                            console.log(e);
                        });
                    }
                },
                {
                    label: 'No',
                }
            ]
        });
    }


    render()
    {
        return(
        <div className="cancel_booking float-right" onClick={this.HandleCancelClick}>
            x Cancel Booking
        </div>
    )}
}

function CancelRequired(isPast,booking_id)
{
    if(!isPast) {
        return (
            <CancelBooking booking_id={booking_id}/>
        )
    }
}


export default MyBooking;
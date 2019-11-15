import React from 'react';
import axios from 'axios';

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

               </div>
           </div>


        )
    }
}

export default MyBooking;
import React from 'react';

class MyBooking extends React.Component{
    constructor(props)
    {
        super(props);
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
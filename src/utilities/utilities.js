/* showing easy toast function */
import iziToast from "izitoast";

export const base_url = "https://bookingzone.herokuapp.com/api/";
// export const base_url = "http://localhost:3000/api/";

export const base_web_url = "https://bookingzone.herokuapp.com/";
// export const base_web_url = "http://localhost:3000/"
// export const base_web_url = "http://localhost:3001/";


export function show_toast(msg, title, type)
{
    let backgroundColor,color;
    if(type==="fail")
    {
        backgroundColor= '#f5571d';
        color= 'white';
    }
    if(type==="success")
    {
        backgroundColor= '#25b864';
    }
    iziToast.show({
        title: title,
        message: msg,
        backgroundColor: backgroundColor,
        position: "topCenter",
        progressBar: false
    });
}

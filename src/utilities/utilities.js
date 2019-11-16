/* showing easy toast function */
import iziToast from "izitoast";

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
        position: "topCenter"
    });
}

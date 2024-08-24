// Import React
// import React from 'react';
// Import the stylesheet
import { useAppSelector } from "@src/store/hook";
import style from "./style.module.css";
import { RootState } from "@src/store/store";

const ContactInfo = () => {
    const status = useAppSelector((state:RootState)=> state.auth.response.status)
    return (
        <div className={`container text-center ${style.contactInfoContainer}`}>
            <h3 className={`mb-4 bg-light text-dark border rounded ${style.title}`}>Contact</h3>
            <div className={`d-flex my-2 justify-content-center ${style.infoRow}`}>
                <h5 className={style.label}>Mail</h5>
                {status === true ? <input type="text" className={`mx-5  ${style.input}`} aria-label="Large" defaultValue='fatihe307@gmail.com'/> : <h5 className={`mx-5 ${style.value}`}>fatihe307@gmail.com</h5>}
            </div>
            <div className={`d-flex my-2 justify-content-center ${style.infoRow}`}>
                <h5 className={`${style.label}`}>Phone</h5>
                {status === true ? <input type="text" className={`mx-5 ${style.input}`} defaultValue='+90 541 583 40 11'/> : <h5 className={`mx-5 ${style.value}`}>+90 541 583 40 11</h5>}
    
            </div>
            <div className={`d-flex my-2 justify-content-center ${style.infoRow}`}>
                <h5 className={style.label}>Location</h5>
                {status === true ? <input type="text" className={`mx-5 ${style.input}`} defaultValue='Turkey/Istanbul'/> : <h5 className={`mx-5 ${style.value}`}>Turkey/Istanbul</h5>}
                
            </div>
        </div>
    )
}

export default ContactInfo;
// Import React
// import React from 'react';
// Import the stylesheet
import { useAppSelector } from "@src/store/hook";
import style from "./style.module.css";
import { RootState } from "@src/store/store";

const ContactInfo = () => {
    const status = useAppSelector((state:RootState)=> state.auth.response.status)
    const adminInfo = useAppSelector((state:RootState)=> state.info.infos.adminInfo)
    return (
        <div className={`container text-center ${style.contactInfoContainer}`}>
            <h3 className={`mb-4 bg-light text-dark border rounded ${style.title}`}>Contact</h3>
            <div className={`my-2 justify-content-center ${style.infoRow}`}>
                <h5 className={style.label}>Mail</h5>
                {status === true ? <input type="text" className={`mx-5  ${style.input}`} aria-label="Large" defaultValue={adminInfo.info.mail}/> : <h5 className={`mx-5 ${style.value}`}>{adminInfo.info.mail}</h5>}
            </div>
            <div className={`my-2 justify-content-center ${style.infoRow}`}>
                <h5 className={`${style.label}`}>Phone</h5>
                {status === true ? <input type="text" className={`mx-5 ${style.input}`} defaultValue={adminInfo.info.phone}/> : <h5 className={`mx-5 ${style.value}`}>{adminInfo.info.phone}</h5>}
    
            </div>
            <div className={`my-2 justify-content-center ${style.infoRow}`}>
                <h5 className={style.label}>Location</h5>
                {status === true ? <input type="text" className={`mx-5 ${style.input}`} defaultValue={adminInfo.info.location}/> : <h5 className={`mx-5 ${style.value}`}>{adminInfo.info.location}</h5>}
                
            </div>
        </div>
    )
}

export default ContactInfo;
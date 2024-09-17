// Import React
// import React from 'react';
// Import the stylesheet
import { useAppSelector } from "@src/store/hook";
import style from "./style.module.css";
import { RootState } from "@src/store/store";
import { dateParser } from "@src/shared";

const PersonalInfo = () => {
    const status = useAppSelector((state:RootState)=> state.auth.response.status)
    const adminInfo = useAppSelector((state:RootState)=> state.info.infos.adminInfo)

    return (
        <div className={`container text-center ${style.personalInfoContainer}`}>
            <h3 className={`mb-4 bg-light text-dark border rounded ${style.title}`}>Me</h3>
            <div className={`d-flex my-2 justify-content-center ${style.infoRow}`}>
                <h5 className={style.label}>Name</h5>
                {status === true ?
                <input type="text" className={`mx-5 ${style.input}`} defaultValue={adminInfo.info.name}/>
                   : 
                <h5 className={`mx-5 ${style.value}`}>{adminInfo.info.name}</h5>
            }

            </div>
            <div className={`d-flex my-2 justify-content-center ${style.infoRow}`}>
                <h5 className={style.label}>Surname</h5>
                
                {status === true ?
                <input type="text" className={`mx-5 ${style.input}`} defaultValue={adminInfo.info.surname}/>
                   : 
                <h5 className={`mx-5 ${style.value}`}>{adminInfo.info.surname}</h5>
            }                
                
            </div>
            <div className={`d-flex my-2 justify-content-center ${style.infoRow}`}>
                <h5 className={style.label}>Age</h5>

                {status === true ?
                <input type="text" className={`mx-5 ${style.input}`} defaultValue={dateParser(adminInfo.info.bornDate)}/>
                   : 
                <h5 className={`mx-5 ${style.value}`}>{dateParser(adminInfo.info.bornDate)}</h5>
            }                
            </div>
        </div>
    )
}

export default PersonalInfo;
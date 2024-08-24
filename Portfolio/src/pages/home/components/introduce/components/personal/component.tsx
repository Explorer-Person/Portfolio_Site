// Import React
// import React from 'react';
// Import the stylesheet
import { useAppSelector } from "@src/store/hook";
import style from "./style.module.css";
import { RootState } from "@src/store/store";

const PersonalInfo = () => {
    const status = useAppSelector((state:RootState)=> state.auth.response.status)

    return (
        <div className={`container text-center ${style.personalInfoContainer}`}>
            <h3 className={`mb-4 bg-light text-dark border rounded ${style.title}`}>Me</h3>
            <div className={`d-flex my-2 justify-content-center ${style.infoRow}`}>
                <h5 className={style.label}>Name</h5>
                {status === true ?
                <input type="text" className={`mx-5 ${style.input}`} defaultValue='Fatih'/>
                   : 
                <h5 className={`mx-5 ${style.value}`}>Fatih</h5>
            }

            </div>
            <div className={`d-flex my-2 justify-content-center ${style.infoRow}`}>
                <h5 className={style.label}>Surname</h5>
                
                {status === true ?
                <input type="text" className={`mx-5 ${style.input}`} defaultValue='Etlik'/>
                   : 
                <h5 className={`mx-5 ${style.value}`}>Etlik</h5>
            }                
                
            </div>
            <div className={`d-flex my-2 justify-content-center ${style.infoRow}`}>
                <h5 className={style.label}>Age</h5>

                {status === true ?
                <input type="text" className={`mx-5 ${style.input}`} defaultValue='24'/>
                   : 
                <h5 className={`mx-5 ${style.value}`}>24</h5>
            }                
            </div>
        </div>
    )
}

export default PersonalInfo;
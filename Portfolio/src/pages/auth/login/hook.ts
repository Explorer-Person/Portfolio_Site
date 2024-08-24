


import { StyleProps } from "@src/shared";
import { storeLoginData } from "@src/store";
import { useAppDispatch, useAppSelector } from "@src/store/hook";
import { RootState } from "@src/store/store";
import React from "react";

const useLoginHook = () =>
    {
        const loginData = useAppSelector((state:RootState)=> state.auth.infos.loginData); 
        const loading = useAppSelector((state:RootState)=> state.auth.response.loading); 
        const dispatch = useAppDispatch();

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
           const {name, value} = event.target
           dispatch(storeLoginData({...loginData, [name]: value}))
        } 

        const styleButton:StyleProps = {
         width: `75%`,
         height: `100%`,
         backgroundColor: `#3546B7`,
         padding: `5px`,
         fontSize: `150%`,
         color: `white`
      }
         return{
            data:{
               styleButton,
               loading
            },
            functions:{
                handleChange,
            }
         }
    }

    export default useLoginHook;
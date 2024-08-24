import { useNavigate } from "react-router-dom"



export const RouterHook = () =>{
    const navigate = useNavigate();
    const linkTo = (endpoint:string)=>{
         navigate(endpoint)
    }
    return linkTo
}
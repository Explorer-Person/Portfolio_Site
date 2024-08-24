


import { ButtonInfo } from "@src/shared/interfaces";
import { abilityApi, adminApi, loginApi, projectApi, projectImageApi, setAdminInfo, setConfStatus, setProjectBoxInfo, setSkillBoxInfo, signupApi, skillApi } from "@src/store";
import { useAppDispatch, useAppSelector } from "@src/store/hook";
import { setAbilityBoxInfo, setProjectImageInfo } from "@src/store/slices/info/slice";
import { RootState } from "@src/store/store";
import React from "react";


const useFormBoxHook = () => {
    const { adminInfo, abilityBoxInfo, skillBoxInfo, projectBoxInfo, projectImageInfo, fileInfo } = useAppSelector((state: RootState) => state.info.infos);
    const { loginData, signupData } = useAppSelector((state: RootState) => state.auth.infos);
    const { inheritor } = useAppSelector((state: RootState) => state.pageActions.buttonInfo);
    const dispatch = useAppDispatch();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        if (inheritor === 'projects') {
            dispatch(setProjectBoxInfo({
                ...projectBoxInfo,
                info: {
                    ...projectBoxInfo.info,
                    [name]: value,

                }
            }))
        }
        if (inheritor === 'projectImages') {
            dispatch(setProjectImageInfo({
                ...projectImageInfo,
                info: {
                    ...projectImageInfo.info,
                    [name]: value,
                }
            }))
        }
        if (inheritor === 'skills') {
            dispatch(setSkillBoxInfo({
                ...skillBoxInfo,
                info: {
                    ...skillBoxInfo.info,
                    [name]: value,
                }
            }))
        }
        if (inheritor === 'admin') {
            dispatch(setAdminInfo({
                ...adminInfo,
                info: {
                    ...adminInfo.info,
                    [name]: value,
                }
            }))
        }
        if (inheritor === 'abilities') {
            dispatch(setAbilityBoxInfo({
                ...abilityBoxInfo,
                info: {
                    ...abilityBoxInfo.info,
                    [name]: value,
                }
            }))
        }
    }
    const closeButton = () => {
        dispatch(setConfStatus('inactive'));
    }
    const dataSelector = (editedProcess: string, inheritor: string, id: string | null) => {
        const data = inheritor === 'projects' ? projectBoxInfo : inheritor === 'skills' ? skillBoxInfo : inheritor === 'admin' ? adminInfo : inheritor === 'projectImages' ? projectImageInfo : abilityBoxInfo;
        
        const editedData = editedProcess === 'deleteOne' || editedProcess === 'getOne' ? {info: id, file: fileInfo} : {info: data, file: fileInfo};
        return editedData
    }
    const handleSubmit = (commonData: ButtonInfo) => {
        const { buttonType, inheritor, process, id } = commonData;
        const editedProcess = process === '+' && buttonType === 'request' ? 'addOne' : (process === 'updateOne' && buttonType === 'action') ? 'getOne' : process;
        const editedMethod = process === '+' ? 'POST' : process === 'updateOne' && buttonType === 'request' ? 'PUT' : process === 'deleteOne' ? 'DELETE' : 'GET';
         const data = dataSelector(editedProcess, inheritor, id);
        if (inheritor === 'projects') {
            dispatch(projectApi({
                endpoint: `/api/authorized/projects/${editedProcess}${editedProcess === 'getOne' ? `/${id}` : ''}`,
                method: editedMethod,
                data: data
            }));
        }
        if (inheritor === 'projectImages') {
            dispatch(projectImageApi({
                endpoint: `/api/authorized/projectImages/${editedProcess}${editedProcess === 'getOne' ? `/${id}` : ''}`,
                method: editedMethod,
                data: data
            }));

            //dispatch(uploadFileApi({ endpoint: '/api/authorized/file/upload', method: 'POST', data: fileInfo }))

        }
        if (inheritor === 'skills') {
            dispatch(skillApi({
                endpoint: `/api/authorized/skills/${editedProcess}${editedProcess === 'getOne' ? `/${id}` : ''}`,
                method: editedMethod,
                data: data
            }));
        }


        if (inheritor === 'admin') {
            dispatch(adminApi({ 
            endpoint: `/api/authorized/admin/${editedProcess}`, 
            method: editedMethod,
            data: data 
        }));
        }
        if (inheritor === 'abilities') {
            dispatch(abilityApi({
                endpoint: `/api/authorized/abilities/${editedProcess}${editedProcess === 'getOne' ? `/${id}` : ''}`,
                method: editedMethod,
                data: data
            }));
        }
        if (inheritor === 'auth') {
            if (process === 'signup') {
                dispatch(signupApi({ endpoint: `/api/auth/signup`, method: 'POST', data: signupData }))
            }
            if (process === 'login') {
                dispatch(loginApi({ endpoint: '/api/auth/login', method: 'POST', data: loginData }))
            }

        }


    }


    return {
        functions: {
            handleChange,
            handleSubmit,
            closeButton,
        }
    }
}

export default useFormBoxHook;
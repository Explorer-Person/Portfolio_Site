import { Route, Routes } from 'react-router-dom';
import { Footer, NavbarLayout } from '@src/layouts';
import { HomePage, LoginPage, ProjectPage, SignupPage } from '@src/pages';
import { ConfBox, GiveAlert } from '@src/components';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorPage } from '@src/pages/error';
import { useAppDispatch, useAppSelector } from '@src/store/hook';
import { RootState } from '@src/store/store';
import { useEffect } from 'react';
import { adminApi, projectApi, setPageUrl, skillApi } from '@src/store';


const AppRoutes = () => {
    const skillBoxArray = useAppSelector((state:RootState)=>state.info.infos.skillBoxArray);
    const dispatch = useAppDispatch()
    const pageUrl = window.location.pathname;
    useEffect(()=>{
        dispatch(setPageUrl(pageUrl));
        dispatch(skillApi({endpoint: '/api/skills/getAll', method: 'GET', data: {info: null, file: null}}));           
        dispatch(projectApi({endpoint: '/api/projects/getAll', method: 'GET', data: {info: null, file: null}}));           
        dispatch(adminApi({endpoint: '/api/admin/getOne', method: 'GET', data: {info: null, file: null}}));           
         
    },[dispatch, pageUrl])
    const logError = (error: Error) => {
      console.log(error);  
    }

    return (
        <div>
            <ErrorBoundary
                fallback={<ErrorPage />}
                onReset={(details) => {
                    console.log(details);
                    window.location.reload()
                }}
                onError={logError}
            >
                <NavbarLayout />
                <ConfBox />
                <GiveAlert/>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path='/projects'>
                    {skillBoxArray.map((skillBox)=>(
                      <Route key={skillBox.id} path={skillBox.info.url} element={<ProjectPage />} />                        
                    ))}
                    </Route>
                    <Route path='/admin'>
                      <Route path="login" element={<LoginPage />} />
                      <Route path="signup" element={<SignupPage />} />
                    </Route>
                    
                </Routes>
                <Footer />
            </ErrorBoundary>

        </div>
    )
}

export default AppRoutes;
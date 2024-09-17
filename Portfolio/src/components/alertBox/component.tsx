import { useAppDispatch, useAppSelector } from '@src/store/hook';
import './style.css'
import { RootState } from '@src/store/store';
import { setAlertBox } from '@src/store/slices/page/slice';
import { useEffect } from 'react';
import { ValidationError } from '@src/shared';
import { AlertInfo } from '@src/shared/interfaces';


interface BoxShapeProps {
    color: string;
    symbol: string;
    content: string;
}

const BoxShape = ({ color, symbol, content }: BoxShapeProps) => {
    return (
        <div className='alertBox' style={{ borderColor: color }}>
            <span className='symbol' style={{ color: color }}>{symbol}</span>
            <span className='content'>{content}</span>
        </div>
    );
};

const GiveAlert = () => {
    const alertInfo = useAppSelector((state: RootState) => state.pageActions.alertInfo);
    const dispatch = useAppDispatch();
    const authResponse = useAppSelector((state: RootState) => state.auth.response);
    const infoResponse = useAppSelector((state: RootState) => state.info.response);
    const alertBoxArray = alertInfo as AlertInfo[];

    const customError = authResponse.error.length > 0 ? authResponse.error : infoResponse.error;
    const customLoading= authResponse.loading || infoResponse.loading;

    useEffect(() => {
        if (Array.isArray(customError)) {
            
            const validationErrors = customError as ValidationError[]
            const alertArray = validationErrors.map((err) => {
                return {
                    status: false,
                    message: err.msg
                }
            });
            dispatch(setAlertBox([...alertArray]));
        } else if (typeof customError === 'string') {
            const array = [];
            const alertError = {
                status: false,
                message: customError
            }
            array.push(alertError);
            dispatch(setAlertBox(array));
        }
    }, [dispatch, customError, customLoading]);

    useEffect(() => {
        if (alertBoxArray.length > 0) {
    
            const timer = setTimeout(() => {
                dispatch(setAlertBox([]));
            }, 2000);
            return () => clearTimeout(timer); // Cleanup on unmount or when alerts change
        }
    }, [alertBoxArray, dispatch]);

    const shouldRenderAlerts = alertBoxArray.length > 0;

    return shouldRenderAlerts ? (
        <div className='alerts'>
            {alertBoxArray.map((content, index) => (
                <div key={index} className='m-3'>
                    <AlertBox content={content} />
                </div>
            ))}
        </div>
    ) : null;
};

interface AlertBoxProps {
    content: AlertInfo
}

const AlertBox = ({ content }: AlertBoxProps) => {
    

    return content ? (
        content.status ?
            <BoxShape color='green' symbol='✅' content={content.message} />
            :
            <BoxShape color='red' symbol='❌' content={content.message} />

    ) : null;
};

export default GiveAlert;

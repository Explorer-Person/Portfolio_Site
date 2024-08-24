import { useAppDispatch, useAppSelector } from '@src/store/hook';
import './style.css'
import { RootState } from '@src/store/store';
import { setAlertBox } from '@src/store/slices/page/slice';
import { useEffect } from 'react';
import { AlertInfo } from '@src/shared';

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
    const alertBoxArray = useAppSelector((state: RootState) => state.pageActions.alertInfo);
    const dispatch = useAppDispatch();
    const { error, process, status } = useAppSelector((state: RootState) => state.auth.response);

    useEffect(() => {
        if (error) {
            const alertArray: AlertInfo[] = error.map((err) => ({
                process: status,
                status: true,
                content: err.msg
            }));
            console.log('start alert....', alertArray)
            console.log('start error....', error)
            dispatch(setAlertBox([...alertArray]));
        }
    }, [dispatch, error]);

    useEffect(() => {
        if (alertBoxArray.length > 0) {
            console.log(alertBoxArray)
            const timer = setTimeout(() => {
                console.log('start effect')
                dispatch(setAlertBox([]));
            }, 2000);
            return () => clearTimeout(timer); // Cleanup on unmount or when alerts change
        }
    }, [alertBoxArray, dispatch]);

    const shouldRenderAlerts = process === 'validation' && alertBoxArray.length > 0;

    return shouldRenderAlerts ? (
        <div className='d-block'>
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
    return content.status ? (
        content.process ? 
            <BoxShape color='green' symbol='✅' content={content.content}/> : 
            <BoxShape color='red' symbol='❌' content={content.content}/>
    ) : null;
};

export default GiveAlert;

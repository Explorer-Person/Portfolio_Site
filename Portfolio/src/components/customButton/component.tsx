import './style.css'
import { StyleProps, useFormBoxHook } from '@src/shared';
import { useAppDispatch, useAppSelector } from '@src/store/hook';
import { LoadingEffect } from '../loadingEffect';
import { setButtonInfo, setConfStatus } from '@src/store/slices/page/slice';
import { RootState } from '@src/store/store';

interface CustomButtonProps {
  style: StyleProps;
  process: string;
  inheritor: string;
  type: string;
  id: string | null;
}

const CustomButton: React.FC<CustomButtonProps> = ({ id, style, process, inheritor, type }) => {
const dispatch = useAppDispatch();
  const { functions: { handleSubmit } } = useFormBoxHook();
  const responseAuth = useAppSelector((state: RootState) => state.auth.response);
  const responseInfo = useAppSelector((state: RootState) => state.info.response);

  const isLoading = responseInfo.loading;
  const isError = responseInfo.error
  // useEffect(() => {
  //   if (isError) {
  //     dispatch(setAlertBox([{
  //       process: false,
  //       content: 'Error !!!',
  //       status: true,
  //     }]));
  //   }    
  //   else if (!isLoading) {
  //     dispatch(setAlertBox([{
  //       process: true,
  //       content: 'Task Completed...',
  //       status: true,
  //     }]));

  //   }
  // }, [isError, isLoading, dispatch]);

  const handleClick = async() => {
    const commonData = { process: process, inheritor: inheritor, id: id, buttonType: type, };
    dispatch(setButtonInfo(commonData));
    if(type === 'action'){
      dispatch(setConfStatus('active'))
    }
    else if(type === 'request'){
      dispatch(setConfStatus('inactive'))
      
    }
    handleSubmit(commonData);
  };


  if(!responseAuth.status && inheritor !== 'auth'){
    return null
  }
  if (isLoading) {
    return (
      <div className='text-center'>
        <button style={style} type="submit" className="custom-button" disabled>
          <LoadingEffect size='25px' />
        </button>
      </div>
    );
  }

  return (
    <div className='text-center'>
      <button style={style} onClick={handleClick} type="submit" className="custom-button">
        {inheritor === 'admin' ? 'Configure Admin' : process === 'updateOne' ? 'update' : process === 'deleteOne' ? 'delete' : process}
      </button>
    </div>
  );
};

export default CustomButton;

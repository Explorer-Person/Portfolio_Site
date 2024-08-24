import style from './style.module.css';
import { CustomButton } from '../customButton';
import { StyleProps } from '@src/shared';
import { useAppSelector } from '@src/store/hook';
import { RootState } from '@src/store/store';
interface ConfButtonsProps{
  id: string;
  inheritor: string;
}
const ConfButtons = ({id, inheritor}:ConfButtonsProps) => {
  const status = useAppSelector((state: RootState) => state.auth.response.status);

  const styleDeleteButton:StyleProps = {
    width: `100%`,
    height: `100%`,
    backgroundColor: `#ff4d4d`,
    padding: `1px 20px`,
    fontSize: `100%`,
    color: `white`
 }
 const styleUpdateButton:StyleProps = {
  width: `100%`,
  height: `100%`,
  backgroundColor: `#4d94ff`,
  padding: `1px 20px`,
  fontSize: `100%`,
  color: `white`
}
  if(!status){
    return null;
  }
  return (
    <div className={style.buttonContainer}>
      <CustomButton style={styleDeleteButton} id={id}  process='deleteOne' type='request' inheritor={inheritor}/>
      <CustomButton  style={styleUpdateButton} id={id} process='updateOne' type='action' inheritor={inheritor}/>
    </div>
  );
};

export default ConfButtons;

import './style.css';
import { useAppSelector } from '@src/store/hook';
import { RootState } from '@src/store/store';
import { StyleProps, useFormBoxHook } from '@src/shared';
import { InputGenerator } from '@src/shared';
import {CustomButton} from '@src/components'; // Ensure correct import

const ConfBox: React.FC = () => {
    const {functions: { handleChange, closeButton } } = useFormBoxHook();
    const status = useAppSelector((state: RootState) => state.auth.response.status);
    const {inheritor} = useAppSelector((state: RootState) => state.pageActions.buttonInfo);
    const confStatus = useAppSelector((state: RootState) => state.pageActions.confStatus);
    const { process } = useAppSelector((state: RootState) => state.pageActions.buttonInfo);
    const { skillBoxInfo, projectBoxInfo, projectImageInfo, abilityBoxInfo, adminInfo } = useAppSelector((state: RootState) => state.info.infos);
     
    const styleButton: StyleProps = {
        width: '75%',
        height: '100%',
        backgroundColor: '#3546B7',
        padding: '5px',
        fontSize: '100%',
        color: 'white'
    };

    const renderInputs = () => {
        let inputs = null;
        if (inheritor === 'skills') {
            inputs = InputGenerator(skillBoxInfo, handleChange);
        } else if (inheritor === 'projects') {
            inputs = InputGenerator(projectBoxInfo, handleChange);
        } else if (inheritor === 'projectImages') {
            inputs = InputGenerator(projectImageInfo, handleChange);
        } else if (inheritor === 'abilities') {
            inputs = InputGenerator(abilityBoxInfo, handleChange);
        } else if (inheritor === 'admin') {
            console.log(adminInfo);
            inputs = InputGenerator(adminInfo, handleChange);
        }

        return inputs;
    };
    

    if (status && confStatus !== 'inactive') {
        return (
            <div className={inheritor === 'admin' ? 'input-container' : 'input-container w-50'}>
                <div className='d-flex'>
                    <h2 className='mx-5'>Submit Your Info</h2>
                    <button className='closeBtn' onClick={closeButton}>x</button>
                </div>
                <div className={'d-flex flex-wrap input-box my-5'}>
                    {renderInputs()}
                </div>
                <div className='cusButton'>
                <CustomButton id={null} type='request' inheritor={inheritor} process={process} style={styleButton} />                    
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export default ConfBox;

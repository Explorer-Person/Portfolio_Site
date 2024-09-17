import { AdminInfo, AbilityBoxInfo, SkillBoxInfo, ProjectBoxInfo, ProjectImageInfo } from '@src/shared/interfaces';
import { setFileInfo } from '@src/store';
import { useAppDispatch } from '@src/store/hook';
import React from 'react';

interface InputGeneratorPrompts {
    infoKey: string;
    infoValue: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputGenerator = (
    info: AdminInfo | AbilityBoxInfo | SkillBoxInfo | ProjectBoxInfo | ProjectImageInfo,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  ) => {
    return Object.keys(info.info).map((key) => {
      if (info !== null) {
        // Assert key as keyof typeof info.info
        const typedKey = key as keyof typeof info.info;
        return (
          <Inputs key={key} infoKey={key} infoValue={info.info[typedKey] || ''} handleChange={handleChange} />
        );
      }
    });
  };
  


export const Inputs = ({infoKey, infoValue, handleChange}: InputGeneratorPrompts) =>{
    const dispatch = useAppDispatch();
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const {files} = event.target as HTMLInputElement 
        if(files){
            dispatch(setFileInfo(files[0]))
        }
     }  
    if (infoKey === 'file') {
        return (
            <div style={{width:'85%', margin:'2% 2%', height:'10%'}} key={infoKey}>
                <input
                className='mx-1 my-1 h-100'
                    type="file"
                    id={infoKey}
                    name={infoKey}
                    placeholder={infoKey}
                    onChange={handleFileChange}
                />
            </div>
        );
    }

    return (
        <div style={{width:'40%', margin:'2% 2%'}} className='my-1' key={infoKey}>
            <input
                style={{height:'70%'}}
                placeholder={infoKey}
                type={infoKey === 'password' ? 'password' : infoKey === 'mail' ? 'email' : infoKey === 'bornDate' ? 'date' : 'text'}
                id={infoKey}
                name={infoKey}
                defaultValue={infoValue}
                onChange={handleChange}
                className='h-100'
                required={infoKey === 'url' || infoKey === 'title'}
            />
        </div>
    );
} 

export default InputGenerator;
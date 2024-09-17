import { ProjectImageInfo, AbilityBoxInfo, LoginInfo, ProjectBoxInfo, SignupInfo, SkillBoxInfo } from "../request";
import { AdminInfo, FileInfo } from "../request/interface";

export interface RegularResponse {
    statusCode: number;
    process: string;
    status: boolean;
    data: ResponseDataProps;
}

export type ResponseDataProps = MediaSource | File | Blob | null | string | FileInfo | SkillBoxInfo | SkillBoxInfo[] | ProjectImageInfo[] | ProjectBoxInfo[] | AbilityBoxInfo[] | AdminInfo | AdminInfo[] | LoginInfo | SignupInfo;

export interface StateResponse {
   data: ResponseDataProps;
   process: string;
   status: boolean;
   loading: boolean | null;
   error: ValidationError[] | string[] | string;
   statusCode: number | null;
}



export interface ErrorResponseDev {
   statusCode: number;
   process: string;
   status: boolean;
   error: ValidationError[] | string[];
}


export interface AlertInfo {
   status: boolean,
   message: string
} 
export interface ValidationError {
   type: string;
   value: string;
   msg: string;
   path: string;
   location: string;
}

export interface ErrorResponseProd {
   status: boolean,
   message: string,
}
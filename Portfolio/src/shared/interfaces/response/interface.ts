import { ProjectImageInfo, AbilityBoxInfo, LoginInfo, ProjectBoxInfo, SignupInfo, SkillBoxInfo } from "../request";
import { FileInfo } from "../request/interface";

export interface RegularResponse {
    statusCode: number;
    process: string;
    status: boolean;
    data: ResponseDataProps;
}

export interface StateResponse {
   data: ResponseDataProps;
   process: string;
   status: boolean;
   loading: boolean | null;
   error: ValidationError[] | string[];
   statusCode: number | null;
}
export type ResponseDataProps = MediaSource | Blob | null | string | FileInfo | SkillBoxInfo | SkillBoxInfo[] | ProjectImageInfo[] | ProjectBoxInfo[] | AbilityBoxInfo[] | LoginInfo | SignupInfo;



export interface ErrorResponseDev {
   statusCode: number;
   process: string;
   status: boolean;
   error: ValidationError[] | string[];
}

export interface ValidationError {
   type: string;
   value: string;
   msg: string;
   path: string;
   location: string;
}

export interface ErrorResponseProd {
   status: string,
   message: string,
}
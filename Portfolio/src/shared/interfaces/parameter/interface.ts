import { AbilityBoxInfo, AdminInfo, LoginInfo, ProjectBoxInfo, ProjectImageInfo, SignupInfo, SkillBoxInfo } from "../request";
import { FileInfo } from "../request/interface";

export interface StyleProps {
    backgroundColor: string;
    fontSize: string;
    color: string;
    width: string;
    height: string;
    padding: string;
}

export interface AbilityStyleProps {
    backgroundColor: string,
    color: string,
    borderRadius: string,
    padding: string,
    margin: string,
    textAlign: string,
    boxShadow: string,
    flex: string,
    position: string,
}

export type InfoProp = ProjectBoxInfo | ProjectImageInfo | SkillBoxInfo | AbilityBoxInfo | AdminInfo | LoginInfo | SignupInfo | string | null;

export type DataProp = {
    info: InfoProp;
    file: Blob | File | FileInfo | null;
}
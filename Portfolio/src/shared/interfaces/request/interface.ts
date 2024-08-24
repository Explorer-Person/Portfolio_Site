import { DataProp } from "../parameter";

export interface AdminInfo {
   id: string; 
   fk: string; // If fk is relevant for AdminInfo
   info: {
      name: string;
      surname: string;
      username: string,
      password: string;
      mail: string;
      phone: string;
      bornDate: Date | null; // Assuming the date is in 'dd.mm.yyyy' format
      location: string;
      major: string;
      speciality: string;
      praise: string;
      socials: string;
      file:  FileInfo | Blob | File | string | null,
   }
}

export interface LoginInfo {
   password: string;
   email: string;
}

export  interface SignupInfo {
   username: string;
   password: string;
   email: string;
}

export interface SkillBoxInfo {
   id: string;
   fk: string;
   info: {
      url: string;
      title: string;
      level: string;
      imgUrl: string;
      file:  FileInfo | Blob | File | string | null;
   }
}

 export interface ProjectBoxInfo {
   id: string;
   fk: string;
   info: {
      title: string;
      kinds: string;
      detail: string;
      url: string;
      imgUrl: string;
      videoUrl: string;
      file: FileInfo | Blob | File | string | null;
   }
}
 
export interface ProjectDetailInfo {
   status: boolean;
   projectBoxInfo: ProjectBoxInfo | null;
}

export interface ProjectImageInfo {
   id: string;
   fk: string;
   info: {
      url: string,
      file:  FileInfo | Blob | File | string | null;
   }
 }
export interface FileInfo {
      fileName: string;
      filePath: string;
      fileData: Blob | MediaSource | File | null | string;
 }
export interface AbilityBoxInfo {
   id: string;
   fk: string;
   info: {
      title: string;
      level: string;
   }
}

export interface AlertInfo {
   process: boolean;
   status: boolean;
   content: string;
}

export interface ButtonInfo {
   inheritor: string;
   process: string;
   buttonType: string;
   id: string | null;
}
export interface MainMediaInfo { 
   mediaUrl: string;
   mediaType: string;
}

export interface RequestApiProps {
   endpoint: string, 
   method: string, 
   data: DataProp,  
   headers?: Record<string, string>
}
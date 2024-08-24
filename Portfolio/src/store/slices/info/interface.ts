import {
  AbilityBoxInfo,
  AdminInfo,
  ProjectBoxInfo,
  SkillBoxInfo,
  StateResponse,
  ProjectImageInfo
} from "@src/shared";
import { FileInfo } from "@src/shared/interfaces/request/interface";

export interface InitialStateIF {
  infos: {
    adminInfo: AdminInfo;
    skillBoxInfo: SkillBoxInfo;
    projectBoxInfo: ProjectBoxInfo;
    projectImageInfo: ProjectImageInfo;
    abilityBoxInfo: AbilityBoxInfo;
    skillBoxArray: SkillBoxInfo[];
    projectBoxArray: ProjectBoxInfo[];
    abilityBoxArray: AbilityBoxInfo[];
    projectImageArray: ProjectImageInfo[];
    fileInfo: FileInfo | Blob | File | null;
  };
  response: StateResponse
}

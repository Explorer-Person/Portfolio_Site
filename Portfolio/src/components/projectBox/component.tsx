import { useAppDispatch, useAppSelector } from "@src/store/hook";
import "./style.css";

import { setProjectDetail } from "@src/store";
import { HandleMediaHook, ProjectBoxInfo } from "@src/shared";
import { FileDisplay } from "../fileDisplay";
import { ConfButtons } from "../confButtons";
import { RootState } from "@src/store/store";

interface ProjectBoxProps {
  projectBoxInfo: ProjectBoxInfo;
}

const ProjectBox = ({ projectBoxInfo }: ProjectBoxProps) => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setProjectDetail({
      projectBoxInfo: projectBoxInfo,
      status: true
    }));
  };
  const status = useAppSelector((state: RootState) => state.auth.response.status)

  const handleMediaChange = HandleMediaHook();

  return (
    <div className="main" onClick={handleClick}>
      <div className="img">
        <FileDisplay key={projectBoxInfo.id} handleMediaChange={handleMediaChange} mediaInfo={projectBoxInfo} />

        {/* <img className="project-image" src={projectBoxInfo.info.imgUrl} alt={projectBoxInfo.info.title} /> */}
      </div>
      <div className="content">
        <h2 className="project-title">{projectBoxInfo.info.title}</h2>
        <p className="project-hash">Kind: {projectBoxInfo.info.kinds}</p>
        <div className="custom-underline" />
      </div>
      <div style={{ position: 'relative' }}>
        {status === true ? <ConfButtons id={projectBoxInfo.id} inheritor='skills' /> : null}
      </div>
    </div>
  );
};

export default ProjectBox;
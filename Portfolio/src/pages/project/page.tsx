import { CustomButton, DetailBox, ProjectBox } from "@src/components";
import { StyleProps } from "@src/shared";
import { projectApi, setPageUrl, setProjectBoxArray, setProjectBoxInfo, setProjectDetail, setProjectImageArray } from "@src/store";
import { useAppDispatch, useAppSelector } from "@src/store/hook";
import { RootState } from "@src/store/store";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import './style.css'

const ProjectPage = () => {
    const status = useAppSelector((state: RootState) => state.auth.response.status)
    const { projectDetail, pageUrl } = useAppSelector((state: RootState) => state.pageActions);
    const { projectBoxArray, skillBoxArray, projectBoxInfo } = useAppSelector((state: RootState) => state.info.infos);
    const dispatch = useAppDispatch();
    const location = useLocation();

    const handleCloseModal = () => {
        dispatch(setProjectDetail({
            status: false,
            projectBoxInfo: null,
        }));
        dispatch(setProjectImageArray([]));
    };
    useEffect(() => {
        dispatch(projectApi({ endpoint: '/api/projects/getAll', method: 'GET', data: {file: null, info: null} }))
        dispatch(setPageUrl(location.pathname));
    }, [])

    useEffect(() => {
        const url = pageUrl.split('/')[2];
        if (skillBoxArray.length > 0 && url) {
            const interestedSkill = skillBoxArray.filter(skillBox => skillBox.info.url.toString() === url.toString());
            const projects = interestedSkill ? projectBoxArray.filter(projectBox => projectBox.fk === interestedSkill[0].id) : [];
            // Update the state only if the projects are different
            if (JSON.stringify(projectBoxArray) !== JSON.stringify(projects)) {
                dispatch(setProjectBoxArray(projects));
            }
            dispatch(setProjectBoxInfo({
                ...projectBoxInfo,
                fk: interestedSkill[0].id
            }));
        }
    }, [pageUrl, skillBoxArray, dispatch])


    const styleButton: StyleProps = {
        width: `100%`,
        height: `90%`,
        backgroundColor: `gray`,
        padding: `5% 120px`,
        fontSize: `1000%`,
        color: `black`
    }


    return (
        <div>
            <h2 className="text-center my-5">Projects</h2>

            <div className="projects">
                {projectBoxArray.map((projectBoxInfo, index) => (
                    <div key={index} className="projectBox">
                        {projectDetail.status && (
                            <DetailBox
                            onClose={handleCloseModal}
                            />

                        )}
                            <ProjectBox key={projectBoxInfo.id} projectBoxInfo={projectBoxInfo} />
                    </div>

                ))}
                <div className="addButton">
                {status === true ? <CustomButton type="action" inheritor='projects' style={styleButton} process="+" id={null} /> : null}
                </div>
            </div>
        </div>
    )
}
export default ProjectPage;
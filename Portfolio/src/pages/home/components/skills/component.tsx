import { ConfButtons, CustomButton, SkillBox } from "@src/components";

import style from "./style.module.css";
import { useAppSelector } from "@src/store/hook";
import { RootState } from "@src/store/store";
import { StyleProps } from "@src/shared";


const Skills = () => {
    const status = useAppSelector((state: RootState) => state.auth.response.status)
    const skillBoxArray = useAppSelector((state: RootState) => state.info.infos.skillBoxArray)
    const styleButton: StyleProps = {
        width: `100%`,
        height: `100%`,
        backgroundColor: `gray`,
        padding: `1px 100px`,
        fontSize: `1200%`,
        color: `black`
    }


    return (
        <div>
            <div className={`${style.title}`}>
                <h2 className="text-center my-5">Skills</h2>
            </div>
            <div className={`${style.boxes}`}>
                {
                    skillBoxArray.map(skillBoxInfo => (
                        <div key={skillBoxInfo.id} style={{ position:'relative',width:'45%', margin:'1rem'}}>
                            <div>
                            <SkillBox key={skillBoxInfo.id} skillBoxInfo={skillBoxInfo} />
                            </div>
                        </div>
                    ))
                }
                {status === true ? <CustomButton id={null} type='action' inheritor='skills' process="+" style={styleButton} /> : null}


            </div>
        </div>
    )
}
export default Skills
import { RouterHook } from "@src/shared/hooks/routerHook/routerHook";
import style from "./style.module.css";
import { HandleMediaHook, SkillBoxInfo } from "@src/shared";
import { FileDisplay } from "../fileDisplay";
import { ConfButtons } from "../confButtons";
import { useAppSelector } from "@src/store/hook";
import { RootState } from "@src/store/store";

// public\img\how-to-translate-a-website.jpg
// public/img/360_F_348397404_wXuf22GUPNAh67htBZZnaDSx3Bj92yep.jpg

interface SkillBoxProps {
    skillBoxInfo: SkillBoxInfo;
}

const SkillBox = ({ skillBoxInfo }: SkillBoxProps) => {
    const handleMediaChange = HandleMediaHook();
    const status = useAppSelector((state: RootState) => state.auth.response.status)

    const linkTo = RouterHook();
    return (
        <div className={`${style.imgContainer}`}>
            <button onClick={() => linkTo(`projects/${skillBoxInfo.info.url}`)} className={`${style.imgBox}`}>

                <FileDisplay key={skillBoxInfo.id} handleMediaChange={handleMediaChange} mediaInfo={skillBoxInfo} />


                {/* <img className={`${style.img}`} src={`${skillBoxInfo.info.imgUrl}`} alt="" /> */}
                <div className={`${style.textBox}`}>
                    <h3 className={`${style.text}`}>{skillBoxInfo.info.title}</h3>
                    <div className={`${style.customUnderline}`} />
                </div>
            </button>
            <div>
                <div style={{ marginLeft: '12%', position: 'relative' }}>
                    {status === true ? <ConfButtons id={skillBoxInfo.id} inheritor='skills' /> : null}
                </div>
            </div>
        </div>
    )
}
export default SkillBox;
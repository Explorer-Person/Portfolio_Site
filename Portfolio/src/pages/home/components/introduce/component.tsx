import style from "./style.module.css";
import { Abilities, PersonalInfo } from "./components";
import ContactInfo from "./components/contact/component";
import mainImg from "@src/assets/images/ecbeb56d-5983-413f-847a-052087971b29.jpeg";

const ShortIntroduce = () => {
    return (
        <div className={`${style.main}`}>
            <div className={`${style.imgBox}`}>
                <img className={`${style.img}`} src={mainImg} alt="" />
            </div>
            <div className={`w-100 ${style.aboutMe}`}>
                <div className={`d-flex w-100 p-3`}>
                    <div className={`w-100 mx-2 ${style.wightBorder}`}>
                        <PersonalInfo />
                    </div>
                    <div className={`w-100 mx-2 ${style.wightBorder}`}>
                        <Abilities />
                    </div>
                    <div className={`w-100 mx-2 ${style.wightBorder}`}>
                        <ContactInfo />
                    </div>
                </div>
            </div>

        </div>
    )
}
export default ShortIntroduce;  
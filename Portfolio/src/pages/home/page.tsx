import { ShortIntroduce } from "./components/introduce";
import { Skills } from "./components/skills";
import style from "./style.module.css";
 

const HomePage = () =>{
    return(
        <div>
                <div id="info" className={`${style.introducePart}`}>
                      <ShortIntroduce/>
                </div>
                <div id="skills" className={`${style.skillsPart}`}>
                       <Skills/>
                </div>
        </div>
    )
}
export default HomePage
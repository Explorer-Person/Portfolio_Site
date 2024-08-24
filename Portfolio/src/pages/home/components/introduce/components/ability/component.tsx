import style from "./style.module.css";
import { AbilityBox } from "./components";
import { useState } from "react";

type OverflowOptions = 'auto' | 'hidden' | 'scroll' | 'visible';

export interface ShowStatusIF {
    maxHeight: string,
    overflow: OverflowOptions
}
const Abilities = () => {
    const [showStatus, setShowStatus] = useState<ShowStatusIF>({
        maxHeight: '200px',
        overflow: 'hidden'
    });
    const [buttonText, setButtonText] = useState('Show More...')
    const handleClick = () => {
        if (showStatus.maxHeight == '100%') {
            setShowStatus({
                maxHeight: '200px',
                overflow: 'hidden'
            });
            setButtonText('Show More...');
        }
        if (showStatus.maxHeight == '200px') {
            setShowStatus({
                maxHeight: '100%',
                overflow: 'hidden'
            });
            setButtonText('Hide All...');

        }


    }
    return (
        <div className="d-block">
            <h3 className="mb-4 bg-light text-dark mx-5 border rounded text-center">Abilities</h3>
            <div className={`m-2 ${style.abilities}`}>
                <AbilityBox showStatus={showStatus} />
            </div>
            <button onClick={handleClick} className={`${style.moreButton}`}>{buttonText}</button>
        </div>
    )
}
export default Abilities;
import { useEffect, useState } from "react";
import style from "./style.module.css";
import { useAppDispatch, useAppSelector } from "@src/store/hook";
import { RootState } from "@src/store/store";
import { abilityApi } from "@src/store";
import { ConfButtons, CustomButton } from "@src/components";
import { StyleProps } from "@src/shared";
import { ShowStatusIF } from "../../component";

interface AbilityBoxProps{
    showStatus: ShowStatusIF;
}
const AbilityBox = ({showStatus}:AbilityBoxProps) => {
    const dispatch = useAppDispatch();
    const { abilityBoxArray } = useAppSelector((state: RootState) => state.info.infos);
    const [colors] = useState(["#343a40", "#ffc107", "#007bff", "#dc3545"]);
    const [abilityStyles, setAbilityStyles] = useState<any[]>([]);

    useEffect(() => {
        dispatch(abilityApi({ endpoint: '/api/abilities/getAll', method: 'GET', data: {file: null, info: null} }));
    }, [dispatch]);

    useEffect(() => {
        const newAbilityStyles = abilityBoxArray.map(() => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            return {
                backgroundColor: randomColor,
                color: 'white',
                borderRadius: '8px',
                padding: '10px',
                margin: '10px',
                textAlign: 'center',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                flex: '1 1 calc(50% - 20px)',
                position: 'relative',
            };
        });
        setAbilityStyles(newAbilityStyles);
    }, [abilityBoxArray, colors]);
    const styleButton: StyleProps = {
        width: `100%`,
        height: `50px`,
        backgroundColor: `gray`,
        padding: `0px 25px`,
        fontSize: `200%`,
        color: `black`
    }

    return (
        <div className={style.abilityContainer}>
            <div style={{maxHeight: showStatus.maxHeight, overflow: showStatus.overflow}} className={style.abilityList}>
                {abilityBoxArray.map((ability, index) => (
                    <div key={ability.id} style={abilityStyles[index]} className={style.abilityBox}>
                        <div style={{ fontWeight: 'bold', fontSize: '1.2em' }}>{ability.info.title}</div>
                        <div style={{ fontSize: '0.9em' }}>({ability.info.level})</div>

                            <div className={style.confButtons}>
                                <ConfButtons id={ability.id} inheritor="abilities" />
                            </div>

                    </div>
                ))}
                
                    <div className={style.actionButtonContainer}>
                        <CustomButton process="+" type="action" id={null} style={styleButton} inheritor="abilities" />
                    </div>
                
            </div>

        </div>
    );
};

export default AbilityBox;

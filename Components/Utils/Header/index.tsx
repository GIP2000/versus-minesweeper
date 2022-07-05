import {Children} from "react"; 
import DefaultChildren from "./DefaultChildren";
import UserBubble from "../UserBubble"; 
import style from "./header.module.css"

type Props = {
    children?: React.ReactNode; 
}; 


const Header: React.FunctionComponent<Props> = ({children})=>(
    <div className={style.container}>
        <div className={style.left}>
            {Children.toArray(children).length > 0 ? Children.map(children,child=>
                <div className={style.leftElement}>{child}</div>
            ) : <DefaultChildren />}
        </div>
        <div className={style.right}>
            <UserBubble /> 
        </div>
    </div>
)


export default Header; 
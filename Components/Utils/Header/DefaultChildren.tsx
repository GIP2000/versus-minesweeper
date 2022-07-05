import headerStyle from "./header.module.css"; 
const DefaultChildren = ()=>(
    <>
        <div className={headerStyle.leftElement}>
            <div>Home</div>
        </div>
        <div className={headerStyle.leftElement}>
            <div>My Records</div>
        </div>
    </>
)

export default DefaultChildren; 
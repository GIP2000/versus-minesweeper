import Header from "../Components/Utils/Header"; 
import style from "../styles/Home.module.css"; 
import Router from "next/router"; 

export default ()=>(
  <div>
    <Header />
    <h1 className={style.title}>Welcome to Versus Minesweeper</h1>
    <div className={style.center} >
      <div className={style.buttons}>
        <button className={style.button}>Start a new Game</button>
        <button className={style.button}>Search for friends</button>
      </div>
    </div>
  </div>
)
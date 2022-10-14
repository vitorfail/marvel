import React,{useEffect, useState} from "react";
import './index.css'
import Logo from '../../icon/marvel.png'

export default function Cabecalho(){
    const [exibir, setexibir] = useState(false)
    useEffect(()=>{
        const scrollevent = () =>{
          if(window.scrollY> 10){
            setexibir(true)
          }
          else{
            setexibir(false)
          }
        }
        window.addEventListener("scroll", scrollevent)
        return () => {
          window.removeEventListener("scroll", scrollevent)
        }
      })
    return(
        <header className={exibir? 'exibir': ''}>
            <img alt="logo" src={Logo}></img>
        </header>
    )
}
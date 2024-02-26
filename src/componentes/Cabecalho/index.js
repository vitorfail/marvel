import React,{useEffect, useState} from "react";
import './index.css'
import Logo from '../../icon/marvel.png'
import Escudo from '../../icon/escudo.png'
import { useHistory } from "react-router-dom";
import descer from "../../MoverScroll"

export default function Cabecalho(){
    const history = useHistory()
    const [ rotation, setrotation] = useState(0)
    const [exibir, setexibir] = useState(false)
    useEffect(()=>{
        //checa a rolagem do usuário e modifica a posição do escudo
        const checarScroll = () =>{
          setrotation(rotation+6)

        }
        //checa se o usuário desceu para mudar a cor do header
        const scrollevent = () =>{
          checarScroll()
          if(window.scrollY> 10){
            setexibir(true)
          }
          else{
            setexibir(false)
          }
        }
        window.addEventListener("scroll", scrollevent,)
        return () => {
          window.removeEventListener("scroll", scrollevent)
        }
      })
    return(
        <header className={exibir? 'exibir': ''}>
            <img onClick={() => history.push('/')} className="logo" alt="logo" src={Logo}></img>
            <div className="titulos">
              <p onClick={() => descer(".conteudo--titulo")}>Histórias</p>
              <p onClick={() => descer(".conteudo--curiosidade")}>Você Sabia?</p>
              <p onClick={() => descer(".filmes")}>Linha Cronológica</p>
            </div>
        </header>
    )
}
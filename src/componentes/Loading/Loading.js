import React from "react";
import './Loading.css'
import Logo from '../../icon/logo-a.png'

export default function Loading(){
    return(
        <div className="loading">
            <img alt='logo' src={Logo}></img>
            <div className="circulo">
            </div>
            <div className="circulo2">
            </div>
            <div className="circulo-fixo">
            </div>
            <div className="circulo-fixo2">
            </div>
        </div>
    )
}
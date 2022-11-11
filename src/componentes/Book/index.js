import './index.css'
import React from 'react'

export default function Book(props){
    return(
        <div className='book'>
            <p className='titulo'>{props.titulo}</p>
            <div className='book--thumb'>
                <img alt='thumb' src={props.link}></img>
            </div>
            <div className='book--descri'>
                <p>{props.descricao}</p>
            </div>
        </div>

    )
}
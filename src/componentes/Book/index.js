import './index.css'
import React from 'react'

export default function Book(props){
    return(
        <div className='book'>
            <p className='book--titulo'>{props.dados.title}</p>
            <div className='book--thumb'>
                <img alt='thumb' src={props.dados.thumbnail.path+'/portrait_incredible.jpg'}></img>
            </div>
            <div className='book--descri'>
                <p>{props.dados.description}</p>
            </div>
        </div>

    )
}
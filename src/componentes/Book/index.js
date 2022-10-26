import './index.css'
import React from 'react'

export default function Book(props){
    return(
        <div className='book'>
            <p className='titulo'>{props.title}</p>
            <div className='book--capa'>
                <img alt='thumb' src={props.thumbnail.path+'/portrait_incredible.jpg'}></img>
            </div>
            <div className='book--descri'>
                <p>{item.description}</p>
                <div className='book--price'>
                <h2>R$ {item.prices[0].price}</h2>
                <img alt='sacola' className={item.id} onClick={(event) => pesquisar_comic(event.target.className)} src={Sacola}></img>
                </div>                    
            </div>
        </div>
    )
}
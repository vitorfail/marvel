import './PopupMap.css'
import React from 'react'
import { StoreContext } from '../../Context'

export default function PopupMap(){
    const {popup, setpopup} = React.useContext(StoreContext)
    return(
        <div className={popup?'popup show':'popup'}>
            <div className='display'>
                <h2>Não foi possível achar o seu CEP. Por favor cheque e tente novamente</h2>
                <button onClick={() => setpopup(false)}>Fechar</button>
            </div>
        </div>
    )
}

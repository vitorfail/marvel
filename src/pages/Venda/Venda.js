import './Venda.css'
import Cabecalho from '../../componentes/Cabecalho';
import React, { useState } from 'react';
import ListaHq from '../../ListaHq';
import Rodape from '../../componentes/Rodape/Rodape';
import { StoreContext } from '../../Context';
import axios from 'axios'
import Mapa from '../../componentes/Mapa/Mapa';
import { useHistory } from 'react-router-dom';
import QRcode from '../../icon/qrcode.png'

function Venda() {
    const [tipo_pag, settipo_pag] = useState(true)
    const history = useHistory()
    const [localizacao, setlocalizacao] = useState({
        lat: -3.745,
        lng: -38.523
    })
    const [CEP, setCEP] = useState('')
  const {price,  imagemBanner,  
    tituloBanner, descricaoBanner , idBanner ,  setpopup} = React.useContext(StoreContext)
  useState(() =>  {

  })

  function localiza(){
        if(CEP !== ''){
            axios.get("https://maps.googleapis.com/maps/api/geocode/json?address="+CEP+"&key="+process.env.REACT_APP_Mapkey)
            .then(res => {
                if(res.data.results.length !== 0){
                    var latitude = res.data.results[0].geometry.location.lat
                    var longitude = res.data.results[0].geometry.location.lng
                    setlocalizacao({
                        lat: latitude,
                        lng: longitude        
                    })
                }
                else{
                    setpopup(true)
                }
            })
        }
    }
  return idBanner? (
    <div className="venda">
        <Cabecalho></Cabecalho>
            <div className='venda--banner'>
                <div className='venda--banner--esquerda'>
                    <img src={imagemBanner}></img>
                    <div className='venda--descri'>
                        <h2>{tituloBanner}</h2>
                        <h3>{descricaoBanner}</h3>
                        <h2>R$ {price}</h2>
                    </div>
                </div>
                <div className='venda--banner--direita'>
                    <h2>Método de pagamento:</h2>
                    <div className='venda--banner--botoes'>
                        <button onClick={() => settipo_pag(true)} className='venda--botao'>Cartão</button>
                        <button onClick={() => settipo_pag(false)} className='venda--botao'>Pix</button>
                    </div>
                    <div className={tipo_pag? 'venda--pix': 'venda--pix show'}>
                        <img alt='pix' src={QRcode}></img>
                    </div>
                    <div className={tipo_pag? 'venda--cartao show': 'venda--cartao'}>
                        <input placeholder='Nome'></input>
                        <input placeholder='Número do cartão'></input>
                        <input placeholder='Nome'></input>
                        <div className='venda--banner--cvv'>
                            <input placeholder='Mês/Ano'></input>
                            <input placeholder='CVV'></input>
                        </div>
                        <div className='venda--cep'>
                            <input value={CEP} onChange={(event) => setCEP(event.target.value)} placeholder='CEP'></input>
                            <button onClick={() => localiza(localizacao)}>Pesquisar</button>
                        </div>
                        <button className='button--comprar'>COMPRAR</button>
                    </div>
                </div>
            </div>
            <div className='venda--mapa'>
                <Mapa cep={localizacao}></Mapa>
            </div>
        <Rodape></Rodape>
    </div>
  ): history.push('/')
}

export default Venda;

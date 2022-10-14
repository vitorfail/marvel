import './App.css';
import Cabecalho from './componentes/Cabecalho';
import React, { useState } from 'react';
import ListaHq from './ListaHq';
import Rodape from './Rodape/Rodape';
import Sacola from './icon/sacola.png'
import { StoreContext } from './Context';
import ApiKey from './Axios'
import axios from 'axios'

function App() {
  const {price, setprice, listahq, setlistahq, imagemBanner, setimagemBanner, 
    tituloBanner, settituloBanner, descricaoBanner, 
    setdescricaoBanner, criadoresBanner, setcriadoresBanner} = React.useContext(StoreContext)
  useState(() =>  {
    const load = async () =>{
      var lista = await ListaHq.homelist()
      setlistahq(lista[0].items)

      var random = Math.floor(Math.random() * (lista[0].items.length - 1 + 1) + 1)
      setimagemBanner(lista[0].items[random].thumbnail.path+'/portrait_incredible.jpg')
      settituloBanner(lista[0].items[random].title)
      setdescricaoBanner(lista[0].items[random].description)
      if(lista[0].items[random].creators !== undefined){
        setcriadoresBanner(lista[0].items[random].creators.items)
      }
      if(lista[0].items[random].prices.price !== undefined){
        setprice(lista[0].items[random].prices.price)  
      }
    }
    load()
  })
  function pesquisar_comic(id_hq){
    var dados = []
    axios.get('http://gateway.marvel.com/v1/public/comics/'+id_hq+'?'+ApiKey)
    .then(res => {
        dados = res.data.data.results[0]
        setimagemBanner(dados.thumbnail.path+'/portrait_incredible.jpg')
        settituloBanner(dados.title)
        setdescricaoBanner(dados.description)
        if(dados.creators.items !== undefined){
          setcriadoresBanner(dados.creators.items)
        }
        if(dados.prices.price !== undefined){
          setprice(dados.prices.price)  
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
  
    })
    .catch( eror => {
      console.log(eror)
    })
  }
  return (
    <div className="App">
        <Cabecalho></Cabecalho>
        <div className='conteudo'>
            <div className='conteudo--banner'>
              <img alt='banner' src={imagemBanner}></img>
              <div className='conteudo--descri'>
                <h1>{tituloBanner}</h1>
                <h3>{descricaoBanner}</h3>
                <div className='conteudo--criadores'>
                  <h2>Criadores:</h2>
                  {criadoresBanner.map((item, index) => 
                  (<h3 key={index}>
                    {item.name},
                  </h3>))}
                </div>
                <div className='conteudo--price'>
                  <h1>R$ {price.toFixed(2)}</h1>
                </div>
              </div>
            </div>
            <div className='conteudo--titulo'>
              <h1>Quadrinhos em destaque:</h1>
            </div>
            <div className='conteudo--lista'>
              {listahq.map((item, index) => (
                 <div key={index} className='conteudo--lista--item'>
                    <p>{item.title}</p>
                    <img alt='thumb' src={item.thumbnail.path+'/portrait_incredible.jpg'}></img>
                    <div className='conteudo--item--price'>
                        <h2>R$ {item.prices[0].price}</h2>
                        <img alt='sacola' className={item.id} onClick={(event) => pesquisar_comic(event.target.className)} src={Sacola}></img>
                    </div>                    
                </div>
              ))}
            </div>
        </div>
        <Rodape></Rodape>
    </div>
  );
}

export default App;

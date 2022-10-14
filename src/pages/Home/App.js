import './App.css';
import Cabecalho from '../../componentes/Cabecalho';
import React, { useState } from 'react';
import ListaHq from '../../ListaHq';
import Rodape from '../../componentes/Rodape/Rodape';
import Sacola from '../../icon/sacola.png'
import { StoreContext } from '../../Context';
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import Loading from '../../componentes/Loading/Loading';

function App() {
  const [caregando ,setcaregando] = useState(false)
  const history = useHistory()
  const {price, setprice, listahq, setlistahq, imagemBanner, setimagemBanner, 
    tituloBanner, settituloBanner, descricaoBanner, 
    setdescricaoBanner, criadoresBanner, setcriadoresBanner, idBanner, setidBanner} = React.useContext(StoreContext)
  useState(() =>  {
    // o load serve para definir a hq que vai ficar no banner principal, escolhendo uma aleatoriamente
    const load = async () =>{
      var lista = await ListaHq.homelist()
      setlistahq(lista[0].items)

      var random = Math.floor(Math.random() * (lista[0].items.length - 1 + 1) + 1)
      if( lista[0].items[random].thumbnail !== undefined){
        setimagemBanner(lista[0].items[random].thumbnail.path+'/portrait_incredible.jpg')

      }
      settituloBanner(lista[0].items[random].title)
      if(lista[0].items[random].description === null || lista[0].items[random].description === "#N/A"){
        setdescricaoBanner("Por questões técinicas a sinopse desta hq ainda não ficou pront, mas não se preocupae, logo resolveremos isso")
      }
      else{
        setdescricaoBanner(lista[0].items[random].description)
      }
      if(lista[0].items[random].creators !== undefined){
        setcriadoresBanner(lista[0].items[random].creators.items)
      }
      if(lista[0].items[random].prices.price !== undefined){
        setprice(lista[0].items[random].prices.price)  
      }
      setidBanner(lista[0].items[random].id)
      setcaregando(true)
    }
    load()
  })
  function pesquisar_comic(id_hq){
    var dados = []
    axios.get('https://gateway.marvel.com/v1/public/comics/'+id_hq+'?limit=23&ts=1&apikey'+process.env.REACT_APP_ApiKey+'&hash='+process.env.REACT_APP_hash)
    .then(res => {
        dados = res.data.data.results[0]
        setimagemBanner(dados.thumbnail.path+'/portrait_incredible.jpg')
        settituloBanner(dados.title)
        if(dados.description === null || dados.description === "#N/A"){
          setdescricaoBanner("Por questões técinicas a sinopse desta hq ainda não ficou pront, mas não se preocupae, logo resolveremos isso")
        }
        else{
          setdescricaoBanner(dados.description)
        }

          if(dados.creators.items !== undefined){
          setcriadoresBanner(dados.creators.items)
        }
        if(dados.prices[0].price !== undefined){
          setprice(dados.prices[0].price)  
        }
        else{
          setprice(0)  
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
  
    })
    .catch( eror => {
      console.log(eror)
    })
  }
  return caregando? (
      <div className="App">
        <Cabecalho></Cabecalho>
        <div className='conteudo'>
            <div className='conteudo--banner'>
              <img alt='banner' src={imagemBanner}></img>
              <div className='conteudo--descri'>
                <h1>{tituloBanner}</h1>
                <h3 className='descri'><strong>Sinopse:</strong> {descricaoBanner}</h3>
                <div className='conteudo--criadores'>
                  <h2>Criadores:</h2>
                  {criadoresBanner.map((item, index) => 
                  (<h3 key={index}>
                    {item.name},
                  </h3>))}
                </div>
                <div className='conteudo--price'>
                  <h1>R$ {price.toFixed(2)}</h1>
                  <img onClick={() => history.push('/venda')} alt='sacola' src={Sacola}></img>
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
  ): <Loading></Loading>
}

export default App;

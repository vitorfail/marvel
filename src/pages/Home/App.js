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
import FotoAmassada from '../../componentes/FotoAmassada';
import Foto1 from '../../icon/foto1.jpg'
import Foto2 from '../../icon/foto2.jpg'
import Foto3 from '../../icon/ghost2.jpg'
import Foto4 from '../../icon/ghost.jpg'
import Foto5 from '../../icon/matt2.jpg'
import Foto6 from '../../icon/matt.jpg'
import Foto7 from '../../icon/dr2.jpg'
import Foto8 from '../../icon/dr.jpeg'


function App() {
  const slides = document.getElementsByClassName("slide"); // this selection is a live collection; any changes in DOM is updated in the variable unlike querySelectors

  let currentSlideIndex = 0;
  let lastSlideIndex = slides.length - 1;

  // go to a slide;
  function goToSlide(slideIndex) {
      [...slides].forEach((s, i) => {
          s.style.transform = `translateX(${100 * (i - slideIndex)}%)`
      })
      currentSlideIndex = slideIndex;
  }
  goToSlide(currentSlideIndex);

  // make ready the next slide if current slide is the first or the last slide
  function readyNextSlide() {
      // if currentSlide is the last slide, shift the first slide to the end
      if (currentSlideIndex === lastSlideIndex) {
          slides[lastSlideIndex].insertAdjacentElement("afterend", slides[0]);
          slides[lastSlideIndex].style.transform = `translateX(${100}%)`;
          currentSlideIndex--; //this is because current slide is now the second last slide
      }
      // if currentSlide is the first slide, shift the last slide to the beginning
      if (currentSlideIndex === 0) {
          slides[0].insertAdjacentElement("beforebegin", slides[lastSlideIndex]);
          slides[0].style.transform = `translateX(-${100}%)`;
          currentSlideIndex++; //this is because current slide is now the second slide
      }
  }

  // put the last slide in the beginning; ('if' condition is not necessary but providing if condition is future proof if user sets the initial slide to be shown as the last slide )
  if (currentSlideIndex === lastSlideIndex || currentSlideIndex === 0) readyNextSlide();

  // shift all slides left or right based on direction provided
  function shiftSlides(direction) {
      direction ? currentSlideIndex++ : currentSlideIndex--
      if (currentSlideIndex === lastSlideIndex || currentSlideIndex === 0) readyNextSlide();
      goToSlide(currentSlideIndex);
  }
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
    axios.get('https://gateway.marvel.com/v1/public/comics/'+id_hq+'?ts=1&apikey='+process.env.REACT_APP_ApiKey+'&hash='+process.env.REACT_APP_hash)
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
                    <p className='titulo'>{item.title}</p>
                    <div className='conteudo--lista--thumb'>
                      <img alt='thumb' src={item.thumbnail.path+'/portrait_incredible.jpg'}></img>
                    </div>
                    <div className='conteudo--lista--descri'>
                      <p>{item.description}</p>
                      <div className='conteudo--item--price'>
                        <h2>R$ {item.prices[0].price}</h2>
                        <img alt='sacola' className={item.id} onClick={(event) => pesquisar_comic(event.target.className)} src={Sacola}></img>
                      </div>                    
                    </div>
                </div>
              ))}
            </div>
            <div className='conteudo--curiosidade'>
              <h2 className='voce-sabia'>Você sabia?</h2>
              <h3 className='descri'>No inicio do "jeito marvel de ser" muitos do heróis costumavam apresentar um desejo eminente por ciência, e vindo nesta onda
                surgiram Hulk, homem aranha e homem de ferro. Mas nas palavras do Jin Morrison dalí em diante "ter superpoderes corresponderia, 
                na melhor das hipóteses, a ter grandes responsabilidades, ou na pior, ter uma horranda maldição"
              </h3>
              <div className='conteudo--curiosidade--fotos'>
                <div className='container'>
                  <FotoAmassada fundo={Foto2} capa={Foto1}></FotoAmassada>
                  <h2 style={{color:"#23c323" , width:"80%"}}>O Gigante esmeralda</h2>
                  <p>Seguindo a moda da época sobrou para o pobre e franzino Dr Bruce Benner se tornar o monstro Hulk. 
                    O médico ou monstro, sem interrogação, assim com apresentado em sua estreia frase sem interrogação nós faz enteder a mistura de sua identidade</p>
                </div>
                <div className='container'>
                  <FotoAmassada fundo={Foto3} capa={Foto4}></FotoAmassada>
                  <h2 style={{color:"#ff0000", width:"80%"}}>Serviçal do inferno</h2>
                  <p>Já para o dublê jonny Blaze sobrou se tornar capacho do próprio diabo. Mas depois de certo 
                    tempo por questões religiosas mudaram o nome do seu algoz que passou a ser Mephisto, um dos donos de algumas
                    repartições do inferno
                  </p>
                </div>
                <div className='container'>
                  	<FotoAmassada fundo={Foto5} capa={Foto6}></FotoAmassada>
                  	<h2 style={{color:"#f1f120", width:"80%"}}>Homem sem medo</h2>
                  	<p>Já o pobre Matt Murdock além de nascer em origem pobre e perder os pais, em troca de seus super sentidos 
					o mesmo ainda teve que perder sua visão. 
                  	</p>
                </div>
			 <div className='container'>
                  	<FotoAmassada fundo={Foto7} capa={Foto8}></FotoAmassada>
                  	<h2 style={{color:"#2f2fed", width:"80%"}}>Mestre das artes místicas</h2>
                  	<p>Para o arrogante Dr. Estranho sobrou perder o movimento cirúrgico de suas mãos para que na ruida
					de sua vida profissional ele pudesse dispertar o talento inato das artes místicas  
                  	</p>
                </div>
              </div>
            </div>
        </div>
        <Rodape></Rodape>
    </div>
  ): <Loading></Loading>
}

export default App;

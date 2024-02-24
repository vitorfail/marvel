import './App.css';
import Cabecalho from '../../componentes/Cabecalho';
import React, { useEffect, useState } from 'react';
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

import lampada from "./lampada.png"
import corda from "./chain.png"

import Book from '../../componentes/Book';
import { CuboGiratorio } from '../../componentes/CuboGiratorio';
import BannerCompra from '../../componentes/BannerCompra';
import tony from "./tony.jpg"
import Logos from '../../componentes/Logos';
import marvel from "./marvel.png"
import avenger from "./avenger.png"
import selo from "./selo.png"
import disney from "./disney.png"
import hydra from "./hydra.png"
import anel from "./anel.png"
import thor from "./thor.jpg"
import cap from "./cap.jpg"

function App() {
	const [caregando ,setcaregando] = useState(false)
	const [ativo, setativo] = useState(false)
	const [ rotation, setrotation] = useState(0)
	const [ margin, setmargin] =useState(0)
	const importAll = (r) => r.keys().map(r);

	const filmes = importAll(require.context('./linha', false, /\.(png|jpe?g|svg)$/));
	function prevSlide(){
		if(margin<100){
			setmargin(margin+100)
		}
	}
	  const nextSlide = () => {
		if(margin== -100){
		}
		else{
			setmargin(margin-100)
		}
	  }
	  function gerarNumeroAleatorio(minimo, maximo) {
		return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
	}
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
    useEffect(() => {
        window.addEventListener('scroll', function() {
            var d = document.getElementsByClassName("conteudo--curiosidade")
            if(d[0] !== null){
                for(let i =0; i< d.length; i++){
                    var position = d[i].getBoundingClientRect();
                    if(position.top+55 < window.innerHeight && position.bottom >= 0){
                        if(ativo !==true){
                            setativo(true)
						}    
                    }
                }
            }
        });
		const checarScroll = () =>{
			setrotation(rotation+2)
		  }
		  //checa se o usuário desceu para mudar a cor do header
		  const scrollevent = () =>{
			if (ativo && rotation< 45){
				checarScroll()
			}

		  }
		window.addEventListener("scroll", scrollevent,)
        return () => {
          window.removeEventListener("scroll", scrollevent)
        }
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
	// go to a slide;

	return caregando? (
			<div className="App">
				<Cabecalho></Cabecalho>
				<div className='conteudo'>
						<div className='conteudo--carrosel'>
							<i onClick={() =>prevSlide()} >&lt;</i>
							<i onClick={() =>nextSlide()} >&gt;</i>
							<div className='carrosel' style={{left:margin+"%"}}>
								<div className='conteudo--banner'>
									<img alt='banner' src={cap} ></img>
									<p className='titulo'>Uma luz na excuridão</p>
									<p className='descri'>Em 1941 a Criação de Jack Kirby fazia sua
									estreia extravagante. O infame personagem aparecia ,na capa da sua 
									primeira revista, socando o próprio Hitler. Naquele contexto o super soldado não representava apenas 
									o desejo dos aliados de vencer a guerra, mas também os pais maridos e filhos que saim de casa 
									para preencher as trincheiras na guerra contra o os alemães</p>
								</div>					
								<div className='conteudo--banner'>
									<img alt='banner' src={tony} ></img>
									<p className='titulo'>Heróis entre nós</p>
									<p className='descri'>Uma das curiosidade mais interessantes sobre as criação da Marvel é o fato
									que a maioria dos heróis não tem identidade secreta. O homem de ferro por exemplo não fez questão de esconder do mundo que ele ela o homem de ferro
									</p>
								</div>
								<div className='conteudo--banner'>
									<img alt='banner' src={thor} ></img>
									<p className='titulo'>Deuses e suas versões</p>
									<p className='descri'>É comum a Marvel usar Deuses e mitologias em suas histórias. O Motoqueiro Fantasma por exemplo 
									teve uma mudança em sua história por contas religiosas. A principio ele feito um pacto com o demônio da mitologia cristã, mas com o passar dos anos 
									seu algoz se torno Mephisto </p>
								</div>

							</div>
						</div>
						<Logos logos={[marvel, avenger, selo, disney, anel, hydra]} ></Logos>
						<div className='conteudo--titulo'>
							<h1>Quadrinhos em destaque:</h1>
						</div>
						<div className='conteudo--lista'>
							{listahq.map((item, index) => (
								<div key={index} className='conteudo--book'>
									<Book 
										key={index} 
										descricao={item.description} 
										titulo={item.title} 
										link={item.thumbnail.path+'/portrait_incredible.jpg'}>	
									</Book>
									<p>{item.title}</p>
									<div className='conteudo--item--price'>
										<h2>R$ {item.prices[0].price}</h2>
										<img alt='sacola' className={item.id} onClick={(event) => pesquisar_comic(event.target.className)} src={Sacola}></img>
									</div>                    
								</div>							
							))}
						</div>
						<div className='conteudo--curiosidade'>
							<div className='lampada'>
								<img alt='lampada' src={lampada}></img>
								<img style={{transform:"translateY("+rotation+"px) rotateZ(90deg)"}} alt='corda' src={corda}></img>
								<div style={{boxShadow:"0px 0px "+(rotation*2)+"px "+(rotation*2.1)+"px rgb(255, 255, 255)"}} className='luz'></div>
							</div>
							<h2 className='voce-sabia'>Você sabia?</h2>
							<h3>A casa das idéias e seus vício criativos</h3>
							<p className='descri'>No inicio do "jeito marvel de ser" muitos do heróis costumavam apresentar um desejo eminente por ciência, e vindo nesta onda
								surgiram Hulk, homem aranha e homem de ferro. Mas nas palavras do Jin Morrison dalí em diante "ter superpoderes corresponderia, 
								na melhor das hipóteses, a ter grandes responsabilidades, ou na pior, ter uma horranda maldição"
							</p>
							<div className='conteudo--curiosidade--fotos'>
								<div className='container'>
									<FotoAmassada fundo={Foto2} capa={Foto1}></FotoAmassada>
									<h2 >O Gigante esmeralda</h2>
									<p>Seguindo a moda da época sobrou para o pobre e franzino Dr Bruce Benner se tornar o monstro Hulk. 
										O médico ou monstro, sem interrogação, assim com apresentado em sua estreia frase sem interrogação nós faz enteder a mistura de sua identidade</p>
								</div>
								<div className='container'>
									<FotoAmassada fundo={Foto3} capa={Foto4}></FotoAmassada>
									<h2 >Serviçal do inferno</h2>
									<p>Já para o dublê jonny Blaze sobrou se tornar capacho do próprio diabo. Mas depois de certo 
										tempo por questões religiosas mudaram o nome do seu algoz que passou a ser Mephisto, um dos donos de algumas
										repartições do inferno
									</p>
								</div>
								<div className='container'>
										<FotoAmassada fundo={Foto5} capa={Foto6}></FotoAmassada>
										<h2 >Homem sem medo</h2>
										<p>Já o pobre Matt Murdock além de nascer em origem pobre e perder os pais, em troca de seus super sentidos 
					o mesmo ainda teve que perder sua visão. 
										</p>
								</div>
			 <div className='container'>
										<FotoAmassada fundo={Foto7} capa={Foto8}></FotoAmassada>
										<h2 >Mestre das artes místicas</h2>
										<p>Para o arrogante Dr. Estranho sobrou perder o movimento cirúrgico de suas mãos para que na ruida
					de sua vida profissional ele pudesse dispertar o talento inato das artes místicas  
										</p>
								</div>
							</div>
						</div>
				</div>
				<div className='filmes'>
					<h2>Linha Cronológica</h2>
					<p>Os filmes de super-herois levam multidões para as salas fazendo com que se mantenha viva a 
						cultura do cinema, mesmo em meio aos gigantes serviços de streaming. E esses filmes por sua vez são baseado em obras e quadrinhos dos mais variados tipos. 
						E só aqui você encontra diversos deles. No fim o que você vê na tela teve início em uma folha de papelem branco</p>
					<div className='cronologia'>
						<div className='filme'>
							{filmes.map((item, index) =>(
								index%2===0?
								(<div style={{"--i":gerarNumeroAleatorio(25, 45)+"px", background:"url("+item+")", backgroundSize:"contain", backgroundRepeat:"no-repeat"}} key={index} className='cima'  ></div>):null
							))}
						</div>
						<div className='linha'></div>
						<div className='filme'>
							{filmes.map((item, index) =>(
								index%2 !==0?
								(<div style={{"--i":gerarNumeroAleatorio(5, 25)+"px", background:"url("+item+")", backgroundSize:"contain", backgroundRepeat:"no-repeat"}} key={index} className='baixo'  ></div>):null
							))}
						</div>

					</div>
				</div>
				<Rodape></Rodape>
		</div>
	): <Loading></Loading>
}

export default App;

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
import iron from '../../icon/iron-man.jpeg'
import Doctor from '../../icon/doctor.jpg'
import Cap from '../../icon/cap.jpg'

import Banner from '../../componentes/Banner';
import Book from '../../componentes/Book';
import { CuboGiratorio } from '../../componentes/CuboGiratorio';
import BannerCompra from '../../componentes/BannerCompra';


function App() {
	const links = ["https://s2.glbimg.com/n3WM9f6PAk5vmhgKXD9R9lI0nsg=/0x0:1400x1016/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_b0f0e84207c948ab8b8777be5a6a4395/internal_photos/bs/2022/V/V/1Av89fSlK7pp1P9IDuqw/pantera-negra-wakanda-forever.png",
	 "https://osrabiscosdageadas.com/wp-content/uploads/2022/09/p_thorloveandthunder_639_593cb642.jpeg"
	, "https://br.web.img3.acsta.net/c_310_420/pictures/22/10/25/09/01/1618750.jpg", 
	"https://br.web.img3.acsta.net/pictures/22/02/14/18/29/1382589.png"]
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
	// go to a slide;

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
								<div className='conteudo--book'>
									<Book 
										key={index} 
										descricao={item.description} 
										titulo={item.title} 
										link={item.thumbnail.path+'/portrait_incredible.jpg'}>	
									</Book>
									<div className='conteudo--item--price'>
										<h2>R$ {item.prices[0].price}</h2>
										<img alt='sacola' className={item.id} onClick={(event) => pesquisar_comic(event.target.className)} src={Sacola}></img>
									</div>                    
								</div>							
							))}
						</div>
						<div className='conteudo--curiosidade'>
							<h2 className='voce-sabia'>Você sabia?</h2>
							<p className='descri'>No inicio do "jeito marvel de ser" muitos do heróis costumavam apresentar um desejo eminente por ciência, e vindo nesta onda
								surgiram Hulk, homem aranha e homem de ferro. Mas nas palavras do Jin Morrison dalí em diante "ter superpoderes corresponderia, 
								na melhor das hipóteses, a ter grandes responsabilidades, ou na pior, ter uma horranda maldição"
							</p>
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
				<div className='filmes'>
					<h2>Filmes baseados em HQ</h2>
					<p>Os filmes de super-herois levam multidões para as salas fazendo com que se mantenha viva a 
						cultura do cinema, mesmo em meio aos gigantes serviços de streaming. E esses filmes por sua vez são baseado em obras e quadrinhos dos mais variados tipos. 
						E só aqui você encontra diversos deles. No fim o que você vê na tela teve início em uma folha de papelem branco</p>

					<CuboGiratorio imagens={links}></CuboGiratorio>
					<div className='filmes--sombra'></div>
				</div>
				<div className='compras'>
					<BannerCompra cor={"rgba(27,31,144,1)"}></BannerCompra>
					<BannerCompra cor={"rgba(145,141,144,1)"}></BannerCompra>
					<BannerCompra cor={"rgba(145,141,144,1)"}></BannerCompra>
				</div>
				<Rodape></Rodape>
		</div>
	): <Loading></Loading>
}

export default App;

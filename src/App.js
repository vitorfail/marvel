import './App.css';
import Cabecalho from './componentes/Cabecalho';
import { useState } from 'react';
import ListaHq from './ListaHq';

function App() {
  const [listahq, setlistahq] = useState([])
  const [imagemBanner, setimagemBanner] = useState('')
  const [tituloBanner, settituloBanner] =useState('Marvel Previes')
  const [descricaoBanner, setdescricaoBanner] = useState("When Hank Pym - a.k.a. Ant-Man - is tapped by U.S. Intelligence to infiltrate an international spy ring that has been siphoning secrets out of Washington, the diminutive hero jumps at the chance - unaware that he's being used as a pawn in a larger game of espionage.\r32 PGS./PARENTAL ADVISORY...$2.99")
  useState(() =>  {
    const load = async () =>{
      var lista = await ListaHq.homelist()
      setlistahq(lista[0].items)

      var random = Math.floor(Math.random() * (lista[0].items.length - 1 + 1) + 1)
      setimagemBanner(lista[0].items[random].thumbnail.path+'/portrait_incredible.jpg')
      settituloBanner(lista[0].items[random].title)
      setdescricaoBanner(lista[0].items[random].description)
  
    }
    load()
  })
  return (
    <div className="App">
        <Cabecalho></Cabecalho>
        <div className='conteudo'>
            <div className='conteudo--banner'>
              <img src={imagemBanner}></img>
              <div className='conteudo--descri'>
                <h1>{tituloBanner}</h1>
                <h3>{descricaoBanner}</h3>
              </div>
            </div>
            <div className='conteudo--lista'>
              {listahq.map((item, index) => (
                 <div key={index} className='conteudo--lista--item' style={{
                  background:'url('+item.thumbnail.path+'/portrait_incredible.jpg'+')',
                  backgroundPosition:'center', backgroundRepeat:'no-repeat', backgroundSize:'cover'}}>
                  <h3>{item.description}</h3>
                </div>
              ))}
            </div>
        </div>
    </div>
  );
}

export default App;

import './App.css'

import Cabecalho from './components/Cabecalho.jsx'
import Principal from './components/Principal'
import Rodape from './components/Rodape'

function App() {
  return (
    <>
      <div className='container'>
        <Cabecalho/>
        <Principal/>
        <Rodape/>
      </div>
    </>
  )
}

export default App

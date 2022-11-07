import './App.css';
//Importar componentes
import Show from './components/Show'
import Edit from './components/Edit'
import Create from './components/Create'
//Importar BrowserRouter
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
    //Uso de BrowserRouter para dar rutas a los componentes
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Show/>}/>
          <Route path='/edit/:id' element={<Edit/>}/>
          <Route path='/create' element={<Create/>}/>
        </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App;

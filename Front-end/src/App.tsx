import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Header from './components/Header';
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <>
    <Header/>
    <main>
      <Outlet/>
    </main>
    </>
  )
}

export default App

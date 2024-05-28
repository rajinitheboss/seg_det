import React from 'react';
import logo from './logo.svg';
import './App.css';
import Segmenter from './components/Segmenter';
import 'bootstrap/dist/css/bootstrap.min.css';
import Detector from './components/Detector';
import GridViewButton from './components/GridViewButton';
import Image from 'react-image-file-resizer';
import logoImage from './assets/logo.png';
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">
      <div className = 'full-width-container'>
        <div className= 'row' style={{justifyContent:'center', alignContent:'center'}}>
          <div className = 'col-4'></div>
          <div className = 'col-4'>
            <img src={logoImage} alt="logo" style={{ width: '10vw', height: '15vh' }} className='logo' />
          </div>
          <div className = 'col-4'></div>
        </div>
        <div className = 'row' style={{minHeight:'68vh'}}>
          <div className = 'col-6'>
            <Segmenter/>
          </div>
          <div className = 'col-6'>
            <Detector/>
          </div>
        </div>
        <div className = 'row'>
          <div className = 'col-4'></div>
          <div className = 'col-4' style={{alignItems:'center',justifyContent:'center',display:"flex", padding:'2vh'}} >
              <GridViewButton/>
          </div>
          <div className = 'col-4'>
          </div> 
        </div>
        <div className = 'row'>
          <Footer />
        </div>
      </div>
    </div>
  );
}


export default App;

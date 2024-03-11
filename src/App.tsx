import React from 'react';
import logo from './logo.svg';
import './App.css';
import Segmenter from './components/Segmenter';
import 'bootstrap/dist/css/bootstrap.min.css';
import Detector from './components/Detector';
import GridViewButton from './components/GridViewButton';

function App() {
  return (
    <div className="App">
      <div className = 'full-width-container'>
        <div className = 'row'>
          <div className = 'col-6'>
            <Segmenter/>
          </div>
          <div className = 'col-6'>
            <Detector/>
          </div>
        </div>
        <div className = 'row'>
          <div className = 'col-4'></div>
          <div className = 'col-4' style={{alignItems:'center',justifyContent:'center',display:"flex"}} >
              <GridViewButton/>
          </div>
          <div className = 'col-4'>
          </div> 
        </div>
      </div>
    </div>
  );
}

export default App;

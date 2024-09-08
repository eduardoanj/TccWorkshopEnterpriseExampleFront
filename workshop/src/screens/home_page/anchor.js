import React from 'react';
import firstImage from '../../images/place1.jpg'
import secondImage from '../../images/place2.jpg'
import tirthImage from '../../images/place3.jpg'


const Listagem = () => (
  <>
    <div style={{backgroundColor: '#F5F5F5'}}>
      <div className='div-1'
        style={{
          width: '100vw',
          height: '100vh',
          textAlign: 'center',
          backgroundColor: '#F5F5F5',
        }}>
            <img src={firstImage}/>
      </div>
      <div id="part-2"
        style={{
          width: '100vw',
          height: '100vh',
          textAlign: 'center',
          background: '#F5F5F5',
        }}>
            <img src={secondImage}/>
      </div>
      <div id="part-3"
        style={{
          width: '100vw',
          height: '100vh',
          textAlign: 'center',
          background: '#F5F5F5',
        }}>
            <img src={tirthImage}/>
      </div>
    </div>
  </>
);
export default Listagem;
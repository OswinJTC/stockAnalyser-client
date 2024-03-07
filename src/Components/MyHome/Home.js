import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';

const Home = ({ handleLogout }) => {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("loggedInUserName") || "");

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUserName");
    setCurrentUser(storedUser || "");
  }, []); 
  const handleLogoutHome = () => {
    handleLogout();
  };


  return (
    <div className='home-background'>
      <div className='pt-5'></div>
      <div className='pt-2'></div>
      
      <div className='home-heading'>
        <h1 style={{ fontFamily: 'serif', fontSize: '60px', fontWeight: 'bold', color: 'black' }}>
          {currentUser}，您好
        </h1>
      </div>

      <div className='pt-5'></div>

      <div style={{
        display: 'inline-block',
        backgroundColor: 'rgba(128, 128, 128, 0.2)',
        padding: '5px',
        borderRadius: '5px',
      }}>
        <h5 style={{ 
          fontFamily: 'serif', 
          fontSize: '20px', 
          fontWeight: 'bold', 
          color: 'black',
          margin: '0', 
        }}>
          "活魚逆流而上，死魚隨波逐流"
        </h5>
      </div>

      <div className='pt-5'></div>
      <div className='pt-5'></div>

      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <Link to="/Transaction" className="buttonWithBackground1 btn btn-secondary btn-lg btn-block square-btn">
              <div className="buttonContent">
                <span style={{ fontFamily: 'serif', fontSize: '60px', fontWeight: 'bold' }}>交易歷史</span>
              </div>
              <div className="buttonOverlay"></div>
            </Link>
          </div>

          <div className="col-md-4">
            <Link to="/Formula" className="buttonWithBackground2 btn btn-secondary btn-lg btn-block square-btn">
              <div className="buttonContent">
                <span style={{ fontFamily: 'serif', fontSize: '60px', fontWeight: 'bold', color: 'black' }}>獲利計算</span>
              </div>
              <div className="buttonOverlay"></div>
            </Link>
          </div>
        </div>
      </div>

      <div className='pt-5'></div>
      <div className='pt-5'></div>
      <button type="button" onClick={handleLogoutHome}>馬上登出</button>
      <div className='pt-5'></div>
      <div className='pt-5'></div>
    </div>
  );
};

export default Home;

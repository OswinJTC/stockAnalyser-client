import  { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import './Performance.css';
import { useNavigate } from 'react-router-dom';
 


const Performance = () => {
    const navigate = useNavigate();
  const currentUser = localStorage?.getItem("loggedInUserName") || "";
   
  const backHome = () => {
    navigate("/");
  };

  return (
    <div className="transaction-background">

<div className='pt-5'></div>
<div className='pt-5'></div>

<div>本頁更新中！！</div>
     
         

        <div className='pt-5'></div>
        <div>
          <button type="button" onClick={backHome}>返回首頁</button>
        </div>




        <div className='pt-5'></div>
        <div className='pt-5'></div>
        <div className='pt-5'></div>
    
    </div>
  );
};

export default Performance;

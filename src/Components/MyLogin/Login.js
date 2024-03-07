import React, { useState,useEffect } from 'react';
import api from '../../api/axiosConfig';
import './Login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';



const Login = ({ setIsLoggedIn, setLoggedUserName}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const [ForgotPasswordshowMessage, setForgotPasswordshowMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleForgetPasswordClick = () => {
    setForgotPasswordshowMessage(true);

    // Hide the message after 3 seconds
    setTimeout(() => {
      setForgotPasswordshowMessage(false);
    }, 3000);
  };


  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await api.post("/userApi/userLogin", {
        username: username,
        password: password,
        
      });

      
      if (response.status === 200) {
        setIsLoggedIn(true);
        const response = await api.get(`/userApi/${username}`);
        setLoggedUserName(response.data.username);
        navigate('/');

      } else {
        console.error('登入失敗', response);

      }
      setLoading(false);

    } catch (error) {

      setLoginError('An error occurred during login. Please try again.');
      setTimeout(() => {
        setLoginError('');
      }, 5000);
      console.error('登入失敗', error);
      setLoading(false);
    }
  };

  useEffect(() => {//讓背景圖片只出現在login
    document.body.classList.add('login-background'); // Add the class to the body when the component mounts
    return () => {
      document.body.classList.remove('login-background'); // Remove the class from the body when the component unmounts
    };
  }, []);

  return (

    <div>

    <div className="the-whole-login-part">
      <div className="log-in-title d-flex justify-content-center align-items-center">
        <span>美股追蹤管理系統</span>
        
        
        
      </div>

      <div className="computerPlease pb-3">
        <h5>( 請使用電腦瀏覽 )</h5>
        
        
        
      </div>

      <div>
          {loginError ? (
            <div className="error">登入失敗，請確保輸入資料無誤！</div>
          ) : null}
      </div>

      <div className='the-login-form'>
      <form>

      <div className="signInText">Sign In</div>

        <div className="login-inputRow">
          <i className="fas fa-user"></i>

          <div className='login-username-input'>
          <input
            type="text"
            placeholder="請輸入用戶名稱"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          </div>
        </div>
        
        <div className="login-inputRow">
          <i className="fas fa-lock"></i>

          <div className='login-password-input'>
          <input
            type="password"
            placeholder="請輸入密碼"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          </div>
        </div>

        <div className="forget-password"><Link to="#" onClick={handleForgetPasswordClick}>忘記密碼？</Link></div>

        <div className="log-in-button">
          <button type="button" onClick={handleLogin}>馬上登入
          
          </button>
        </div>
        <div className="ask-to-signup-link">
          還沒有帳號? <Link to="/Register">點我註冊</Link>
        </div>
      </form>
      </div>

      <div>

      {ForgotPasswordshowMessage && (
      <div className="forgot-message-being-clicked">
        <h2>目前沒有這項功能,</h2>
        <h2>自己再去創一個帳號！</h2>
      </div>
      )}

      {ForgotPasswordshowMessage && (
          <div className="overlay" />
      )}


       
      </div>
    </div>

    <div>




    {loading && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            width: "80%",
            textAlign: "center",
            transform: "translate(-50%, -50%)",
          
            color: "white",
            padding: "20px",
            borderRadius: "5px",
            zIndex: "9999",
          }}
        >
          <div className="loading-spinner" />
          <div className='mt-2'>
            <h5>系統更新資料庫中，至多需兩分鐘。謝謝您的耐心等待</h5>
          </div>
          
        </div>
      )}


    

    {loading && (
          <div className="overlay" />
      )}

    </div>
 

    </div>
 
  );
};

export default Login;
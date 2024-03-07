import React, { useState , useEffect} from 'react';
import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  

  
  const navigate = useNavigate();  

  const handleRegister = async () => {

    
    
    let hasError = false;

    if (!username) {
      setUsernameError('缺少用戶名稱!!');
      hasError = true;
    } else {
      setUsernameError('');
    }

    if (!email) {
      setEmailError('缺少電子郵件!!');
      hasError = true;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('缺少密碼!!');
      hasError = true;
    } else {
      setPasswordError('');
    }

    if (hasError) {
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Check if the email is in a valid format
    if (!emailPattern.test(email)) {
        setEmailError('無效電子郵件');
      console.error('Invalid email address');
      return; // Exit the function if email is invalid
    }

    try {
      setLoading(true);
      const response = await api.post("/userApi/userRegistration", {
        username: username,
        email: email,
        password: password,
      });

      if (response.status === 201) {
        console.log('Registration successful!');
        navigate(`/`);
      } else {
        setError('Registration failed. Please try again.');
      }
      setLoading(false);
    } catch (error) {
      setError('An error occurred during registration.');
    }
  };

  useEffect(() => {//讓背景圖片只出現在register page
    document.body.classList.add('register-background'); // Add the class to the body when the component mounts
    return () => {
      document.body.classList.remove('register-background'); // Remove the class from the body when the component unmounts
    };
  }, []);

  return (

    

    <div className="the-whole-register-part">
    
      <div className="register-title"><span>美股追蹤管理系統</span></div>
      
      <div>
        {emailError || usernameError || passwordError ? (
          <div className="error">
                {emailError === "無效電子郵件" ? <div>無效電子郵件</div> : <div>請輸入所有資料！！</div>}
          </div>
        ) : null}
      </div>




      <div className='the-register-form'>

      <form>

      

      <div className="signUpText">Sign Up</div>

        <div className="register-inputRow">
          <i className="fas fa-user"></i>
          
          <div className='register-username-input'>
          <input
            type="text"
            placeholder="請輸入用戶名稱"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          </div>
         
        </div>
        

        <div className="register-inputRow">
          <i className="fas fa-envelope"></i>

          <div className='register-email-input'>
          <input
            type="text"
            placeholder="請輸入電子郵件"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          </div>
          
          
        </div>



        <div className="register-inputRow">
          <i className="fas fa-lock"></i>

          <div className='register-password-input'>
          <input
            type="password"
            placeholder="請輸入密碼"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          </div>
           

          
        </div>


      
        <div className="register-button">
          <button type="button" onClick={handleRegister}>立即註冊</button>
        </div>

        <div className="ask-to-signin-link">已經有帳號? <Link to="/">點我登入</Link></div>
        
      </form>

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

export default Register;
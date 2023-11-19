import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css'
import '../styles/SignupStyles.css'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../store/slices/alertSlice'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSigin = async () => {
    const user = { email, password }
    try {
      dispatch(showLoading());
      const res = await axios.post('https://project1-devathon.vercel.app/api/v1/user/login', user);
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        toast.success(res.data.message);
        navigate('/');
      } else {
        toast.error(res.data.message);

      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      toast.error("Something went wrong");


    }
  }



  return (
    <div className="authDiv">
      <div className="form">
        <h1 className="text-center">Login</h1>

        <div>
          Email:  <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-100 p-2"
          />
        </div>
        <div>
          Password:  <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-100 p-2"
          />
        </div>

        <button className="mybtn p-2 auth" onClick={handleSigin}>Sign in</button>

        <div>Have an account ?<NavLink to='/signup' className='link'>SignUp</NavLink> </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;


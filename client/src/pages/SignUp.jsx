import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import '../styles/SignupStyles.css'
import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../store/slices/alertSlice'


const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async () => {
    const user = { name, email, password }
    try {
      dispatch(showLoading());
      const res = await axios.post('https://project1-devathon.vercel.app/api/v1/user/signup', user);
      dispatch(hideLoading());
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/login')
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
        <h1 className="text-center">Sign up</h1>
        <div>
          Name:  <input
            type="text"
            placeholder="e.g Ruhama Gull"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-100 p-2"
          />
        </div>
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

        <button className="mybtn p-2 auth" onClick={handleSignup}>Sign up</button>
        <div className="form-nav">Have an account ?<NavLink to='/login' className='link'>SignIn</NavLink> </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Signup;





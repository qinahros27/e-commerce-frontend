import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createAUser,fetchAllUser} from '../redux/reducers/userReducer';
import useAppDispatch from '../hooks/useAppDispatch';
import useAppSelector from '../hooks/useAppSelector';
import logo from '../images/websitelogo.png';
import '../styles/style.scss';
import User from '../types/User';
import UploadImage from './components/UploadImage';

const SignUp = () => {
  const [name , setName] = useState('');
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password1 ,setPassword1] = useState('');
  const [message, setMessage] = useState('');
  const [avatar,setAvatar] = useState('');
  const {users} = useAppSelector(state => state.userReducer);
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllUser());
  },[])

  const AddUser = () => {
      let emailAvailable: User[] = users.filter(u=> u.email === email);
      if(emailAvailable.length === 0) {
        if (name === '' || email === '' || password === '' || password1 === '' || avatar === '') {
          setMessage('Please enter all input');
        }
        else if (email.includes('@') == false || email.includes('.') == false) {
          setMessage('This is not an email');
        }
        else if (password !== password1) {
          setMessage('Re-enter password does not match password.')
        }
        else {
          dispatch(createAUser({userData: {name:name, email:email,password:password , avatar: avatar}}));
          navigate('/');
        }
      }
      else {
        alert(`This email is already registered !`)
      }  
  }

  return (
      <div className='SignUp'>
        <header className='header__img'>
          <img src={logo} alt='website logo'/>
        </header>
        
        <main>
          <div className='SignUp-container'>
            <h2>Create account</h2>
            <div className='SignUp-container__item'>
              <label htmlFor="name">Your name</label>
              <input type='text' name="name" id='name' placeholder='First and last name' onChange={e => setName(e.target.value)}/>
            </div>

            <div className='SignUp-container__item'>
              <label htmlFor="email">Email</label>
              <input type='email' name="email" id='email' onChange={e => {setEmail(e.target.value)}}/>
            </div>

            <div className='SignUp-container__item avatar'>
              <label htmlFor="avatar">Avatar</label>
              <UploadImage setAvatar={setAvatar}/>
            </div>

            <div className='SignUp-container__item'>
              <label htmlFor="password1">Password</label>
              <input type='password' name="password1" id='password1' onChange={e => setPassword1(e.target.value)}/>
            </div>

            <div className='SignUp-container__item'>
              <label htmlFor="password">Re-enter password</label>
              <input type='password' name="password" id='password' onChange={e => setPassword(e.target.value)}/>
            </div>

            <p className='SignUp-container__message'>{message}</p>
            <button onClick={()=>AddUser()}>Sign Up</button>
            
            <div className='SignUp-container__footer'>
              <p>By creating an account, you agree to Sahara's <a href="#">Conditions of Use</a> and <a href="#">Privacy Notice</a></p>
            </div>
          </div>
        </main>

        <footer>
          <nav>
            <a href="#">Conditions of Use</a>
            <a href="#">Privacy Notice</a>
            <a href="#">Help</a>
          </nav>
          <p>&#169; 2023, Sahara.com, Inc. or its affiliates</p>
        </footer>
      </div>
    )
}

export default SignUp
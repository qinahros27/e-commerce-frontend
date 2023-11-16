import { useState,useEffect } from "react";

import useAppSelector from '../hooks/useAppSelector';
import { updateAUser } from '../redux/reducers/userReducer';
import useAppDispatch from '../hooks/useAppDispatch';
import HeaderBar from "./components/HeaderBar";
import PageFooter from "./components/PageFooter";
import '../styles/style.scss';
import withAuth from "../authenticate/authenticateCheck";
import UploadImage from "./components/UploadImage";

const AccountSetting = () => {
    const [edit , setEdit] = useState(false);
    const [changePassword, setchangePassword] = useState(false);
    const [name , setName] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [avatar,setAvatar] = useState('');
    const [newpassword, setNewPassword] = useState('');
    const [retypepassword, setRetypePassword] = useState('');
    const [message, setMessage] = useState('');
    const {user} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();
    
    const UpdateUser = () => {
        if(user) {
            if(password === user.password) {
                if(changePassword) {
                    if(newpassword === '') {
                        setMessage('You need to enter new password !!!')
                    }
                    else if(retypepassword === '') {
                        setMessage('You need to retype password !!!')
                    }
                    else {
                        if(newpassword !== retypepassword) {
                            setMessage('Retype password does not match the new password.')
                        }
                        else {
                            dispatch(updateAUser({userData: {name:name, email:email,password:newpassword , avatar: avatar, role: role as 'customer' | 'admin'}, userId: user.id as number}));
                            setEdit(false);
                            setchangePassword(false);
                            setNewPassword('');
                            setRetypePassword('');
                        }
                    }  
                }
                else {
                    dispatch(updateAUser({userData: {name:name, email:email,password:password , avatar: avatar, role: role as 'customer' | 'admin'}, userId: user.id as number}))
                    setEdit(false);
                    setPassword('');
                }
            }
            else if  (password === ''){
                setMessage('Please enter current password!')
            }
            else {
                setMessage('The current password entered incorrectly.')
            }
        }
    }

    const setDefault = () => {
        setEdit(false);
        setchangePassword(false);
        setNewPassword('');
        setRetypePassword('');
        setPassword('');
        setMessage('');
    }
    
    useEffect(() => {
        if(user) {
            setName(user.name);
            setEmail(user.email);
            setAvatar(user.avatar);
            setRole(user.role as 'customer' | 'admin');
        }
    }, [user])

    return (
        <div>
            <HeaderBar/>
            <div className="AccountSetting">
                <h1>Account Settings</h1>
                
                {edit ? 
                <div>
                    {user &&
                        <div className="AccountSetting__info">
                            <div className="AccountSetting__info-avatar">
                                <img src={user.avatar} alt='avatar'/>
                                <div className="AccountSetting__info_item">
                                    <UploadImage setAvatar={setAvatar}/>
                                </div>
                            </div>

                            <div className="AccountSetting__info_item">
                                    <h4>Name: </h4>
                                    <input type='text' value={name} id='name' placeholder={user.name} name='name' onChange={e => setName(e.target.value)}/>
                            </div>

                            <div className="AccountSetting__info_item">
                                    <h4>Email: </h4>
                                    <input type='text' value={email} id='email' placeholder={user.email} name='email' onChange={e => setEmail(e.target.value)}/>
                            </div>

                            <div className="AccountSetting__info_item">
                                    <h4>Current password: </h4>
                                    <input type='text' id='password' placeholder='******' name='password' onChange={e => setPassword(e.target.value)}/>
                                    <a onClick={() => setchangePassword(true)}>Change Password</a>
                            </div>
                            
                            {changePassword &&
                            <div>
                                <div className="AccountSetting__info_item">
                                        <h4>New password: </h4>
                                        <input type='text' id='newpassword' name='newpassword' onChange={e => setNewPassword(e.target.value)}/>
                                </div>

                                <div className="AccountSetting__info_item">
                                        <h4>Retype new password: </h4>
                                        <input type='text' id='retypepassword' name='retypepassword' onChange={e => setRetypePassword(e.target.value)}/>
                                </div> 
                            </div>} 
                            
                            <div className="AccountSetting__info_button">
                                <p>{message}</p>
                                <button onClick={()=> UpdateUser()}>Save</button>
                                <button onClick={()=> setDefault()}>Cancel</button>
                            </div> 
                        </div>}
                </div>
                : 
                <div>
                    {user &&
                        <div className="AccountSetting__info">
                            <div className="AccountSetting__info-avatar">
                                <img src={user.avatar} alt='avatar'/>
                            </div>

                            <div className="AccountSetting__info_item">
                                    <h4>Name: </h4>
                                    <p>{user.name}</p>
                            </div>

                            <div className="AccountSetting__info_item">
                                    <h4>Email: </h4>
                                    <p>{user.email}</p>
                            </div>

                            <div className="AccountSetting__info_item">
                                    <h4>Password: </h4>
                                    <p>******</p>
                            </div>

                            <div className="AccountSetting__info_button">
                                <button onClick={()=> setEdit(true)}>Edit</button>
                            </div> 
                        </div> }
                </div> }    
            </div>
            <PageFooter/>
        </div>
    )
}
    
export default withAuth(AccountSetting);
import React,{useState} from 'react';
import './LoginPage.css';
import {useHistory} from 'react-router-dom';

import validator from 'validator';

//material ui
import { TextField,Button } from '@material-ui/core'

//pages
import RegisterPage from '../RegisterPage/RegisterPage';

//components
import Modal from '../../hoc/Modal/Modal';

//interface
import { Value,User } from '../RegisterPage/RegisterPage';

//defining props
interface LoginProps{
    authenticationTrueHandler: () => void;
    authenticationFalseHandler:() => void;
    userDataHandlerTrue:(email:string) => void;
    userDataHandlerFalse:() => void;
}

const LoginPage:React.FC<LoginProps>  = (props:LoginProps)  =>{

    //router hooks
    const loginPageHistory = useHistory();

    //loginvalue;
    const [email,setEmail] = useState<Value>({
        value:"",
        helperText:'',
        error:false
    });

    const [password,setPassword] = useState<string>('');

    //error msg
    const [errormsg,setErrormsg] = useState<boolean>(false);

    const [registerPage,setRegisterPage] = useState<boolean>(false);

    const registerPageONHandler = ():void =>{
        console.log("object")
        setRegisterPage(true);
    }

    const registerPageOFFHandler = ():void =>{
        setRegisterPage(false);
    }

    // change handler 
    const ChangeHandler = (event:React.ChangeEvent<HTMLInputElement>):void =>{
        let {value} = event.currentTarget;
        switch(event.currentTarget.name){
            case "email":
                setEmail(prevState => {
                    return{
                        ...prevState,
                        value:value.toLowerCase()
                    }
                })
                break;
            
            case 'password':
                setPassword(value)
                break;
            default:
                break;
        }
    }

    //blur handler
    const emailBlurHandler = (event:React.FocusEvent<HTMLInputElement>):void =>{
        setEmail(prevState =>{
            return{
                ...prevState,
                error:false,
                helperText:''
            }
        })
    }

    //login handler
    const loginHandler = (event:React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        if(validator.isEmail(email.value.toLowerCase())){
            setEmail(prevState =>{
                return{
                    ...prevState,
                    error:false,
                    helperText:""
                }
            });
            let users = window.localStorage.getItem('data');
            if(users){
                if(typeof users === 'string'){
                    let data:Array<User> = JSON.parse(users);
                    const found:User|undefined = data.find(user => (user.email === email.value) && (user.password === password) );
                    if(found){
                        
                        setErrormsg(false);
                        props.authenticationTrueHandler();
                        props.userDataHandlerTrue(found.email);
                        loginPageHistory.push('/');
                    }else{
                        
                        setErrormsg(true);
                        props.authenticationFalseHandler();
                        props.userDataHandlerFalse();
                    }
                }
            }

        }else{
            setEmail(prevState =>{
                return{
                    ...prevState,
                    error:true,
                    helperText:"InValid Email"
                }
            });
            setErrormsg(false)
        }
    }

    return (
        <div className="loginpage">
            <div className="loginpagebody">
                <div className="login">
                    {errormsg && <p style={{color:'red'}} >Invalid Authentication!!!</p>}
                    <form onSubmit={loginHandler}>
                        <TextField 
                            className="inputField"
                            type="text" 
                            variant="outlined" 
                            label="Email" size="small"
                            name="email"
                            value={email.value}
                            onChange={ChangeHandler}
                            error={email.error}
                            helperText={email.helperText}
                            onBlur={emailBlurHandler}
                            required
                        />
                        <TextField 
                            className="inputField"
                            type="password" 
                            variant="outlined" 
                            label="Password" size="small" 
                            name="password"
                            value={password}
                            onChange={ChangeHandler}
                            required
                        />
                        <Button 
                            className="button"
                            variant="contained"
                            type="submit"
                        >
                                LogIn 
                        </Button>
                    </form>
                    
                </div>
                
                <div className="register">
                    <Button 
                        variant="text"
                        onClick={() => registerPageONHandler()}
                    >
                        Sign Up
                    </Button>
                </div>
            </div>
            {
                registerPage &&
                <Modal>
                    <RegisterPage 
                        registerPageOFFHandler={registerPageOFFHandler}
                    />
                </Modal>
            }
        </div>
    )
}

export default LoginPage

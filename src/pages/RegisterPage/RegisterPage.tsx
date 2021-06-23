import React,{useState} from 'react';
import "./RegisterPage.css";

import {Close} from '@material-ui/icons'
import {TextField,Button} from '@material-ui/core'

import validator from "validator";

interface Props{
    registerPageOFFHandler:() => void
}

export interface Value{
    [key:string]:string | boolean;
    value:string;
    helperText:string;
    error:boolean
}

export interface User{
    email:string;
    password:string;
}

const RegisterPage:React.FC<Props> = (props:Props) => {

    const [email, setEmail] = useState<Value>({
        value:'',
        helperText:'',
        error:false
    });
    const [password, setPassword] = useState<Value>({
        value:'',
        helperText:'',
        error:false
    });
    const [repassword, setRepassword] = useState<Value>({
        value:'',
        helperText:'',
        error:false
    });

    //successful msg
    const [successMsg, setSuccessMsg] = useState<boolean>(false);

    //onchange handler
    const onChangeValueHandler = (event:React.ChangeEvent<HTMLInputElement>) =>{
        const {value} = event.target;
        switch (event.currentTarget.name){
            
            case 'email':
                setEmail((prevState:Value):Value => {
                    return {
                        ...prevState,
                        value:value!
                    }
                });
                break;
            
            case 'password':
                setPassword(prevState => {
                    return {
                        ...prevState,
                        value:value!
                    }

                });
                break;
            
            case 'repassword':
                setRepassword(prevState => {
                    return {
                        ...prevState,
                        value:value!
                    }

                });
                break;
            
            default:
                break;
        }
    }

    //submit data or saved data
    const onSvaedDataHandler = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(validator.isEmail(email.value)){
            setEmail(prevState =>{
                return {
                    ...prevState,
                    error:false,
                    helperText:''
                }
            });

            if(password.value.length >= 8){
                setPassword(prevState =>{
                    return {
                        ...prevState,
                        error:false,
                        helperText:""
                    }
                });

                //checking password containing atleast 1 alpha and 1 number
                let foundAlpha:boolean = false;
                let foundnumber:boolean = false;
                for (let i=0;i< password.value.length;i++){
                    if(!isNaN(parseInt(password.value[i]))){
                        foundnumber = true;
                    }else{
                        foundAlpha = true;
                    }
                }

                if(foundnumber && foundAlpha){
                    setPassword(prevState =>{
                        return {
                            ...prevState,
                            error:false,
                            helperText:""
                        }
                    });
                    
                    //checking the password and repassword matches or not
                    if(password.value === repassword.value){
                        
                        const users:string | null = window.localStorage.getItem('data');
                        if(users){
                            if(typeof users === 'string'){
                                let data:Array<User> = JSON.parse(users);
                                
                                //checking if the email already exist or not
                                const checkingemail:User|undefined = data.find(user => user.email === email.value);
                                if(checkingemail){
                                    setEmail(prevState =>{
                                        return{
                                            ...prevState,
                                            error:true,
                                            helperText:'Email Already Exists'
                                        }
                                    })
                                    setSuccessMsg(false);
                                }else{
                                    //if email not exists
                                    //successfully created!!!
                                    data = [...data,{email:email.value,password:password.value}]
                                    window.localStorage.setItem('data',JSON.stringify(data));
                                    //user created!!!
                                    setSuccessMsg(true);
                                    //clear data
                                    setEmail({
                                        value:"",
                                        helperText:'',
                                        error:false
                                    })

                                    setPassword({
                                        value:"",
                                        helperText:'',
                                        error:false
                                    })

                                    setRepassword({
                                        value:"",
                                        helperText:'',
                                        error:false
                                    })
                                } 
                            }
                        }else{

                            let data:Array<User> = [{email:email.value,password:password.value}]
                            window.localStorage.setItem('data',JSON.stringify(data));
    
                            //user created!!!
                            setSuccessMsg(true);
                            //clear data
                            setEmail({
                                value:"",
                                helperText:'',
                                error:false
                            })

                            setPassword({
                                value:"",
                                helperText:'',
                                error:false
                            })

                            setRepassword({
                                value:"",
                                helperText:'',
                                error:false
                            })
                        }

                    }else{
                        setSuccessMsg(false);
                        setPassword(prevState =>{
                            return {
                                ...prevState,
                                error:true,
                                helperText:"Doesnot match"
                            }
                        })

                        setRepassword(prevState =>{
                            return {
                                ...prevState,
                                error:true,
                                helperText:"Doesnot match"
                            }
                        }) 
                    }
                }else{
                    //if password doesnot support rules
                    setSuccessMsg(false);
                    setPassword(prevState =>{
                        return {
                            ...prevState,
                            error:true,
                            helperText:"Password must containing atleast 1 alpha and 1 number"
                        }
                    })
                }


            }else{
                //if password length is less than 8
                setSuccessMsg(false);
                setPassword(prevState =>{
                    return {
                        ...prevState,
                        error:true,
                        helperText:"Password must be 8 character long containing atleast 1 alpha and 1 number"
                    }
                })
            }
        }else{

            //if email is invalid
            setSuccessMsg(false);
            setEmail(prevState =>{
                return {
                    ...prevState,
                    error:true,
                    helperText:'InValid Email'
                }
            })
        }
        
    }

    //focus event
    const emailFocusHandler = (event:React.FocusEvent<HTMLInputElement>) =>{
        setSuccessMsg(false);
    }

    const passwordFocusHandler = (event:React.FocusEvent<HTMLInputElement>) =>{
        setPassword(prevState =>{
            return {
                ...prevState,
                error:false,
                helperText:""
            }
        })
        setSuccessMsg(false);
    }

    const repasswordFocusHandler = (event:React.FocusEvent<HTMLInputElement>) =>{
        setRepassword(prevState =>{
            return {
                ...prevState,
                error:false,
                helperText:""
            }
        })
        setSuccessMsg(false);
    }

    

    return (
        <div className="registerPage">
            {/* header */}
            <div className="registerPage__header">
                <Close 
                    style={{
                        cursor:'pointer'
                    }}
                    onClick={props.registerPageOFFHandler}
                />
            </div>

            <div className="registerPage__body">
                { successMsg && <p style={{color:'green'}}>Successfully Register</p>}
                <h3>Create Account!!!</h3>
                <form onSubmit={onSvaedDataHandler}>
                    <TextField
                        className="registerPage__inputField"
                        type="text" 
                        variant="outlined" label="Email" size="small" 
                        value={email.value}
                        name="email"
                        onChange={onChangeValueHandler}
                        helperText={email.helperText}
                        error={email.error}
                        required
                        onFocus={emailFocusHandler}
                    />

                    <TextField
                        className="registerPage__inputField"
                        type="password" 
                        variant="outlined" label="Password" size="small" 
                        value={password.value!}
                        name="password"
                        onChange={onChangeValueHandler}
                        required
                        helperText={password.helperText}
                        error={password.error}
                        onFocus={passwordFocusHandler}
                    />

                    <TextField
                        className="registerPage__inputField"
                        type="password" 
                        variant="outlined" label="Re Password" size="small"
                        value={repassword.value}
                        name="repassword"
                        onChange={onChangeValueHandler}
                        required
                        helperText={repassword.helperText}
                        error={repassword.error}
                        onFocus={repasswordFocusHandler}
                    />

                    <Button
                        className="registerPage__button"
                        variant="contained"
                        type="submit"
                        disabled={password.error || repassword.error}
                    >
                        Register
                    </Button>

                </form>
            </div>
        </div>
    )
}

export default RegisterPage

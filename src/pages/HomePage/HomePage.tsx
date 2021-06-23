import React from 'react'
import {useHistory,Redirect} from 'react-router-dom';
import "./HomePage.css";
import { Button } from '@material-ui/core'

interface HomePageProps{
    authentication:boolean;
    user:string;
    userDataHandlerFalse:()=> void;
    authenticationFalseHandler:()=>void;
}

const HomePage:React.FC<HomePageProps> = (props:HomePageProps):JSX.Element => {
    
    const homePageHistory = useHistory();

    //logout handler
    const logoutHandler = () => {
        homePageHistory.replace('/login');
        props.authenticationFalseHandler();
        props.userDataHandlerFalse()
    }

    return (
        props.authentication ? 
        <div className="homepage">
            Hello {props.user} !!!
            <Button style={{ marginTop:'20px'}} onClick={logoutHandler} variant="contained">LogOut</Button>
        </div>

        :<Redirect to="/login" />
    )
}

export default HomePage

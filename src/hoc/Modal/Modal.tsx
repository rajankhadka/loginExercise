import React from 'react';
import "./Modal.css";

interface Props{

}

const  Modal:React.FC<Props> = ({children}) => {
    return (
        <div className="modal">
            {children}
        </div>
    )
}

export default Modal

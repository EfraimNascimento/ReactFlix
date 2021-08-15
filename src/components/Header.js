import React from "react";
import './Header.css';

export default ({black}) =>{
    return(
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="logo"></img>
                </a>
            </div>

            <div className="header--user">
                <a href="/">
                    <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/bb3a8833850498.56ba69ac33f26.png" alt="user icon"></img>
                </a>
            </div>
        </header>
    );
}
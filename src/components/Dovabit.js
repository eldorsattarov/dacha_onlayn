import React from 'react';
import {getText} from "../locales";
import Header from "./Header";
import Footer from "./Footer";

const Dovabit = () => {
    return (
        <div>
            <Header/>
            <div className="dovabitDacha">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h1><img src="./images/chiziq.png" className="lineImgg"/> {getText("reklama")} <img src="./images/chiziq.png" className="lineImgg"/></h1>
                        </div>
                    </div>
                </div>
            </div>


            <Footer/>
        </div>
    );
};

export default Dovabit;

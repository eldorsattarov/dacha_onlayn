import React, {useEffect} from 'react';
import Header from "./Header";
import Header2 from "./Header2";
import Footer2 from "./Footer2";
import {getText,getLanguage} from "../locales";

const Stat = () => {
    useEffect(()=>{
        window.scrollTo(0,0);
    },[])
    return (
        <div>
            <div>
                {window.location.href.includes("/partner") ? <Header/> : ""}
                <div className="onas">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center">
                                <h1><img src="./images/chiziq.png" className="lineImgg"/> {getText("shartStat")} <img src="./images/chiziq.png" className="lineImgg"/></h1>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-9 col-xl-11 col-12">
                                <p className="">
                                    {getText("shartStatText")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {window.location.href.includes("/partner") ? <Footer2/> : ""}
            </div>
        </div>
    );
};

export default Stat;

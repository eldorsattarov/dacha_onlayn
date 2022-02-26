import React, {useEffect} from 'react';
import Header from "./Header";
import Header2 from "./Header2";
import Footer2 from "./Footer2";
import {getText,getLanguage} from "../locales";

const Usloviya = () => {
    useEffect(()=>{
        window.scrollTo(0,0);
    },[])
    return (
        <div>
            <div>
                {window.location.href.includes("/conditions") ? <Header2/> : ""}
                <div className="onas">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h1>{getText("shartUslov")}</h1>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-9 col-xl-9 col-12">
                              <p>{getText("shartUslovText")}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {window.location.href.includes("/conditions") ? <Footer2/> : ""}
            </div>
        </div>
    );
};

export default Usloviya;

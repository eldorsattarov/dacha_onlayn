import React, {useEffect, useState} from 'react';
import Header from "./Header";
import Header2 from "./Header2";
import Footer from "./Footer";
import Footer2 from "./Footer2";
import axios from "axios";
import {getText,getLanguage} from "../locales";
import {Link} from "react-router-dom";
const Onas = () => {
    // const [menu, setMenu] = useState([]);
    // useEffect(() => {
    //     axios.get("https://work.bingo99.uz/api/dacha")
    //         .then((res) => {
    //             console.log(res);
    //             setMenu(res.data.data.data)
    //             console.log("menu")
    //             console.log(menu);
    //         })
    // }, [])
    useEffect(()=>{
        window.scrollTo(0,0);
    },[])

    return (
        <div>
            {window.location.href.includes("/about") ? <Header/> : ""}
            <div className="onas">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h1><img src="./images/chiziq.png" className="lineImgg"/>  {getText("onasTitle")} <img src="./images/chiziq.png" className="lineImgg"/></h1>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-9 col-xl-9 col-12">
                            <p>
                                {getText("onasText")}
                            </p>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-12 d-flex justify-content-center align-items-center statUsloviLink1">
                            <Link to="/partner" className="statUsloviLink">{getText("shartStat")}</Link>
                            <Link to="/conditions" className="statUsloviLink">{getText("shartUslov")}</Link>
                        </div>
                    </div>
                </div>
            </div>
            {window.location.href.includes("/about") ? <Footer2/> : ""}
        </div>

    );
};

export default Onas;

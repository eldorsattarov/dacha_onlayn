import React from 'react';
import {Link} from "react-router-dom";
import {getLanguage,getText} from "../locales";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footerTop">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3 col-12 pl-0 mt-2 ">
                            <ul className='nav flex-column'>
                                <li className="nav-item"><Link to="/about" className="nav-link">{getText("footerOnas")}</Link></li>
                                <li className="nav-item"><a href="#" className="nav-link">{getText("footerGlav")}</a></li>
                                <li className="nav-item"><Link to="/conditions" className="nav-link">{getText("footerUsloviya")}</Link></li>
                                <li className="nav-item"><Link to="/partner" className="nav-link">{getText("footerStat")}</Link></li>
                            </ul>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-4 col-xl-4 col-12 pl-0 mt-2 ">
                            <ul className='nav flex-column'>
                                <li className="nav-item"><a href="#" className="nav-link">{getText("footerGrafik")}</a></li>
                                <li className="nav-item"><a href="tel:+998977057570" className="nav-link">+998 97 705 75 70</a></li>
                            </ul>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3 col-12 pl-0 mt-2 ">
                            <ul className='nav flex-column'>
                                <li className="nav-item"><a href="#" className="nav-link">{getText("footerSetya")}</a></li>
                                <div className="nav">
                                    <li className="nav-item"><a href="https://instagram.com/dachaonline.uz" target="_blank" className="nav-link">
                                        <img src="./images/Vector (13).png"/>
                                    </a></li>
                                    <li className="nav-item"><a href="https://www.facebook.com/dachaonline.uz" target="_blank" className="nav-link">
                                        <img src="./images/Vector (14).png"/>
                                    </a></li>
                                    <li className="nav-item"><a href="https://t.me/DachaOnlineUZ" target="_blank" className="nav-link">
                                        <img src="./images/Vector (15).png"/>
                                    </a></li>
                                </div>
                            </ul>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-2 col-xl-2 col-12 mt-2 ">
                            <a href="#"><img src="./images/Group 1 (1).png" className="footerLogo"/></a>
                            <div className="d-flex mt-4">
                                <a href="#"><img src="./images/Badge.png"/></a>
                                <a href="#"><img src="./images/Badge (1).png" className="ml-2"/></a>
                            </div>
                            <div className="mt-3 myCarea">
                                <span> </span><a href="https://t.me/developer_ES" target="_blank">{getText("footerDev")}
                                <img src="./images/Vector (15).png" className="ml-2"/></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footerBottom text-center">
                <a href="#">{getText("footerBottom")}</a>
            </div>
        </div>
    );
};

export default Footer;

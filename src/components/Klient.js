import React from 'react';
import {getText,getLanguage} from "../locales";

const Klient = () => {
    return (
        <div className="klient">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>{getText("klient")}</h1>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-12 mt-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex align-items-center mb-2">
                                    <img src="./images/image1.jpg"/>
                                    <h4 className="m-0 ml-3">{getText("klientismi")}</h4>
                                </div>
                                <p>{getText("biosi")}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-12 mt-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex align-items-center mb-2">
                                    <img src="./images/image2.jpg"/>
                                    <h4 className="m-0 ml-3">{getText("klientismi2")}</h4>
                                </div>
                                <p>{getText("biosi")}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-12 mt-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex align-items-center mb-2">
                                    <img src="./images/image3.jpg"/>
                                    <h4 className="m-0 ml-3">{getText("klientismi3")}</h4>
                                </div>
                                <p>{getText("biosi")}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-12 mt-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex align-items-center mb-2">
                                    <img src="./images/image4.jpg"/>
                                    <h4 className="m-0 ml-3">{getText("klientismi4")}</h4>
                                </div>
                                <p>{getText("biosi")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Klient;

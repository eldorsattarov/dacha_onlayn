import React from 'react';
import {getText} from "../locales";

const DachaBalance = () => {
    return (
        <div>

            <div className="dachaBalance">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3 col-6">
                           <div className="card w-100 bg-transparent border-0">
                               <div className="card-body p-0 d-flex align-items-center">
                                   <img src="../images/newImg/Smart Home Checked.png"/>
                                   <div className="ml-3">
                                       <p>750+</p>
                                       <span>{getText("balanse1")}</span>
                                   </div>
                               </div>
                           </div>
                        </div>
                        <div className="col-sm-3 col-6">
                           <div className="card w-100 bg-transparent border-0">
                               <div className="card-body p-0 d-flex align-items-center">
                                   <img src="../images/newImg/Lease.png"/>
                                   <div className="ml-3">
                                       <p>120+</p>
                                       <span>{getText("balanse2")}</span>
                                   </div>
                               </div>
                           </div>
                        </div>
                        <div className="col-sm-3 col-6">
                           <div className="card w-100 bg-transparent border-0">
                               <div className="card-body p-0 d-flex align-items-center">
                                   <img src="../images/newImg/Management.png"/>
                                   <div className="ml-3">
                                       <p>30+</p>
                                       <span>{getText("balanse3")}</span>
                                   </div>
                               </div>
                           </div>
                        </div>
                        <div className="col-sm-3 col-6">
                           <div className="card w-100 bg-transparent border-0">
                               <div className="card-body p-0 d-flex align-items-center">
                                   <img src="../images/newImg/Party.png"/>
                                   <div className="ml-3">
                                       <p>370+</p>
                                       <span>{getText("balanse4")}</span>
                                   </div>
                               </div>
                           </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DachaBalance;

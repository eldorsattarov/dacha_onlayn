import React from 'react';

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
                                       <p>3450+</p>
                                       <span>Общая неджимость </span>
                                   </div>
                               </div>
                           </div>
                        </div>
                        <div className="col-sm-3 col-6">
                           <div className="card w-100 bg-transparent border-0">
                               <div className="card-body p-0 d-flex align-items-center">
                                   <img src="../images/newImg/Lease.png"/>
                                   <div className="ml-3">
                                       {/*<p>3450+</p>*/}
                                       <span>Доверенные агенства</span>
                                   </div>
                               </div>
                           </div>
                        </div>
                        <div className="col-sm-3 col-6">
                           <div className="card w-100 bg-transparent border-0">
                               <div className="card-body p-0 d-flex align-items-center">
                                   <img src="../images/newImg/Management.png"/>
                                   <div className="ml-3">
                                       <p>2200+</p>
                                       <span>Всего агентов</span>
                                   </div>
                               </div>
                           </div>
                        </div>
                        <div className="col-sm-3 col-6">
                           <div className="card w-100 bg-transparent border-0">
                               <div className="card-body p-0 d-flex align-items-center">
                                   <img src="../images/newImg/Party.png"/>
                                   <div className="ml-3">
                                       <p>2575+</p>
                                       <span>Счастливые покупатели</span>
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

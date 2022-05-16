import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import Header from "./Header";
import Header2 from "./Header2";
import Footer2 from "./Footer2";
import {connect} from "react-redux";
import {updateState,getDacha} from "../redux/action/dachaAction";
import {BASE_URL} from "../tools/constants";
import {getText,getLanguage} from "../locales";

const DrugiDachaAll = (props) => {

  useEffect(()=>{
    props.getDacha();
    window.scrollTo(0,0);
  },[]);


  return (
      <div>
        {window.location.href.includes("/dachaall") ? <Header/> : ""}
        <div className="drugidacha">
          <div className="container">
            <div className="row">
              <div className="col-12 d-flex justify-content-between align-items-center">
                <h1>{getText("dacha")}</h1>
              </div>
            </div>
            <div className="row mt-4">
              {props.dacha.map((item,index)=>{
                return(
                    <div className="col-sm-6 col-md-4 col-6 mt-3">
                      <Link to="/countryhouse" className="text-decoration-none"
                            onClick={()=>props.topTan.splice(0,1,item)}>
                        <div className="card">
                          <div className="cardimgg">
                            <div className="cardimgg2"></div>
                            <img src={BASE_URL + item.images[0].image_path} className="card-img-top"/>
                          </div>
                          <div className="card-img-overlay">
                            <div className="summm">
                              {/*<img src="./images/Vector (18).png"/>*/}
                              {/*<span className="summ">{item.cost} {getText("sum")}</span>*/}
                            </div>
                          </div>
                          <div className="card-body">
                            <h3>{getLanguage() === "ru" ? item.name_ru : item.name_uz}</h3>
                            <div>
                              <img src="./images/Vector (18).png"/>
                              <span>{item.room_count} {getText("komnat")}</span>
                            </div>
                            <div>
                              <img src="./images/Vector (18).png"/>
                              <span>{item.bathroom_count} {getText("danniy")}</span>
                            </div>
                            <div>
                              <img src="./images/Vector (18).png"/>
                              <span>{item.capacity} {getText("gost")}</span>
                            </div>
                            <div>
                              <img src="./images/Vector (18).png"/>
                              <span>{item.cost} {getText("sum")}</span>
                            </div>
                            <div className="mt-2">
                              <Link to="" className="text-secondary text-decoration-none">{getText("podrobni")}</Link>
                            </div>
                          </div>
                        </div>
                      </Link>

                    </div>
                )
              })}
            </div>
          </div>
        </div>
        {window.location.href.includes("/dachaall") ? <Footer2/> : ""}
      </div>
  );
};
const mapStateToProps = (state) =>{
  return{
    dacha : state.dacha.dacha,
    topTan: state.dacha.topTan
  }
}
export default connect(mapStateToProps,{getDacha,updateState})(DrugiDachaAll);

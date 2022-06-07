import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {updateState,getDacha} from "../redux/action/dachaAction";
import {API_PATH, BASE_URL} from "../tools/constants";
import {getText,getLanguage} from "../locales";
import axios from "axios";

const DrugiDacha = (props) => {

    useEffect(()=>{
        props.getDacha();
        // window.scrollTo(0,0);
    },[]);

    const [drugiDacha , setDrugiDacha] = useState([]);
    useEffect(() => {
        axios.get(API_PATH + "dacha")
            .then((res) => {
                setDrugiDacha(res.data.data.data)
            })
    }, []);

    return (
        <div className="drugidacha">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                         <h1><img src="./images/chiziq.png" className="lineImgg"/> {getText("dacha")} <img src="./images/chiziq.png" className="lineImgg"/></h1>
                    </div>
                </div>
                <div className="row mt-4">

                    {/*{props.dacha?.map((item,index)=>{*/}
                    {drugiDacha?.map((item,index)=>{
                       while (index<6){
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
                                                   {
                                                       item?.top_rated == 1 ?
                                                           <button type="button" className="bbb">Top</button>
                                                           : ""
                                                   }
                                               </div>
                                           </div>

                                           <div className="card-body">
                                               {/*<h3>{getLanguage() === "ru" ? item.advertiser_name}</h3>*/}
                                               {/*<h3>{getLanguage() === "ru" ? item.name_ru : item.name_uz}</h3>*/}
                                               <h3>{item.name}</h3>
                                               <div>
                                                   <img src="./images/newImagesTwo/Vector (14).png"/>
                                                   <span>{item.room_count} {getText("komnat")}</span>
                                               </div>
                                               <div>
                                                   <img src="./images/newImagesTwo/Vector (15).png"/>
                                                   <span>{item.bathroom_count} {getText("danniy")}</span>
                                               </div>
                                               <div>
                                                   <img src="./images/newImagesTwo/Vector (16).png"/>
                                                   <span>{item.capacity} {getText("gost")}</span>
                                               </div>
                                               <div>
                                                   <img src="./images/newImagesTwo/Vector (17).png"/>
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
                       }
                    })}

                </div>
                <div className="row">
                    <div className="col-12 text-center mt-4">
                        {/*<button type="button" className="btn rounded-0 border-0">*/}
                          <Link to="/dachaall" className="text-decoration-none text-white eshoLink">{getText("vse")}</Link>
                        {/*</button>*/}
                    </div>
                </div>
            </div>
        </div>
    );
};
const mapStateToProps = (state) =>{
    return{
        dacha :state.dacha.dacha,
        topTan: state.dacha.topTan
    }
}
export default connect(mapStateToProps,{getDacha,updateState})(DrugiDacha);

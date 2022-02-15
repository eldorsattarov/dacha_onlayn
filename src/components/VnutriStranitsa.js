import React, {useEffect} from 'react';
import Footer2 from "./Footer2";
import Header from "./Header";
import TopDacha from "./TopDacha";
import {connect} from "react-redux";
import {getCategoryPage,getCategory,updateState} from "../redux/action/categoryAction";
import {BASE_URL} from "../tools/constants";
import {getLanguage,getText} from "../locales";

const VnutriStranitsa = (props) => {
    // console.log(props.selectedCategory);

    useEffect(()=>{
        props.getCategoryPage();
        props.getCategory();
        window.scrollTo(0,0);
    },[]);

    return (
        <div>
            {window.location.href.includes("/inner_page") ? <Header/> : ""}
            <div className="vnutriStranitsa">
                <div className="container">
                    {props.cat.map((item,index)=>{
                      while (index<1){
                          return(
                              <div className="row">
                                  <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mt-3">
                                      <img src={`${BASE_URL+item.image_path}`} className="w-100"/>
                                  </div>
                                  <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mt-3">
                                      <h1>{getLanguage()==="ru" ? item.name_ru : item.name_uz}</h1>
                                      <p>{getLanguage()==="ru" ? item.description_ru : item.description_uz}</p>
                                  </div>
                              </div>
                          )
                      }
                    })}
                </div>
            </div>
            {/*bunisi media bolganda chiqadi (vnutriStranitsa2) */}
            <div className="vnutriStranitsa2">
                <div className="container">
                    {props.cat.map((item,index)=>{
                        while (index<1){
                            return(
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mt-3">
                                            <h1>{getLanguage()==="ru" ? item.name_ru : item.name_uz}</h1>
                                            <img src={`${BASE_URL+item.image_path}`} className="w-100"/>
                                        </div>
                                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mt-3">
                                            <p>{getLanguage()==="ru" ? item.description_ru : item.description_uz}</p>
                                        </div>
                                    </div>
                            )
                        }
                    })}
                </div>
            </div>
            <TopDacha/>
            {window.location.href.includes("/inner_page") ? <Footer2/> : ""}
        </div>
    );
};
const mapStateToProps = (state) =>{
    return{
        cat: state.category.cat,
        category : state.category.category
    }
}
export default connect(mapStateToProps,{getCategoryPage,getCategory,updateState})(VnutriStranitsa);

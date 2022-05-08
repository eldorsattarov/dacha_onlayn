import React, {useEffect, useState} from 'react';
import Header from "./Header";
import Header2 from "./Header2";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {updateState, getCategory} from "../redux/action/categoryAction";
import {BASE_URL} from "../tools/constants";
// import {BASE_URL} from "../tools/constants";
import {getText, getLanguage} from "../locales";
import ReactPlayer from "react-player";

const HomePage1 = (props) => {
  useEffect(() => {
    props.getCategory();
  }, []);

  return (
      <div className="homePage1">
        <div className="card border-0">
          <img src="./images/Rectangle 1.png" className="card-img-top w-100 imgBackk"/>
          {/*<video src="./video/video.mp4" autoplay="true" loop={true}/>*/}
          <div className="card-img-overlay p-0 cardImgOverlay">
            <Header/>
            <div className="rasmUstiga">
              <div className="d-flex justify-content-center w-100">
                <div className="input-group bg-transparent mt-4">
                  {/*<div className="input-group-append">*/}
                  <img src="./images/newImg/Icon.png" className="input-group-append"/>
                  {/*</div>*/}
                  <input type="search" className="form-control bg-transparent" placeholder="Dacha qidirish"/>
                </div>
              </div>
              <div className="dachaBio">
                <h1>Dacha online</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="homePageDown">
          <div className="container">
            <div className="row">
              {props.category.map((item, index) => {
                while (index < 2) {
                  return (
                      <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 mt-3">
                        <Link to="/inner_page"
                              onClick={() => props.cat.splice(0, 1, item)}>
                          <div className="card border-0">
                            {/*<img src="./images/Rectangle 19.png" className="w-100"/>*/}
                            <img src={`${BASE_URL + item.image_path}`} alt="not img"
                                 className="w-100 twoImg"/>
                            <div className="card-img-overlay">
                                                    <span
                                                        className="">{getLanguage() === "ru" ? item.name_ru : item.name_uz}</span>
                            </div>
                          </div>
                        </Link>
                      </div>
                  )
                }
              })}

              {/*<div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 mt-2">*/}
              {/*    <Link to="/inner_page">*/}
              {/*        <div className="card border-0 rounded-0">*/}
              {/*            <img src="./images/Rectangle 20.png" className="w-100"/>*/}
              {/*            <div className="card-img-overlay">*/}
              {/*                <span className="">Билдирсой</span>*/}
              {/*            </div>*/}
              {/*        </div>*/}
              {/*    </Link>*/}
              {/*</div>*/}

              {props.category.map((item, index) => {
                if (index != 0 && index != 1 && index < 5) {
                  return (
                      <div className="col-sm-6 col-md-4 col-6 mt-4">
                        <Link to="/inner_page"
                              onClick={() => props.cat.splice(0, 1, item)}>
                          <div className="card border-0">
                            <img src={BASE_URL + item.image_path} className="w-100 twoImg"/>
                            <div className="card-img-overlay">
                                                    <span
                                                        className="">{getLanguage() === "ru" ? item.name_ru : item.name_uz}</span>
                            </div>
                          </div>
                        </Link>
                      </div>
                  )
                }
              })}
            </div>
            <div className="row mt-2">
              <div className="col-12 text-center mt-4">
                {/*<button type="button" className="btn rounded-0 border-0">*/}
                <Link to="/category_all"
                      className="text-decoration-none text-white eshoLink">{getText("vse")}</Link>
                {/*</button>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
const mapStateToProps = (state) => {
  return {
    category: state.category.category,
    cat: state.category.cat
    // selectedCategory: state.category.selectedCategory
  }
}
  export default connect(mapStateToProps,{getCategory,updateState})(HomePage1);



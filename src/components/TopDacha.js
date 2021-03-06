import React, {Component, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
// import Slider from "react-slick";
import axios from "axios";
import {API_PATH, BASE_URL} from "../tools/constants";
import {getText, getLanguage} from "../locales";
import {connect} from "react-redux";
import {updateState, getTopdacha} from "../redux/action/dachaAction";
import Carousel from "react-simply-carousel";
import SimpleSlider from "./Carousell";


const TopDacha = (props) => {

    const [activeSlide, setActiveSlide] = useState(0);
    const [topDacha, setTopDacha] = useState([]);

    useEffect(() => {
        props.getTopdacha();
        console.log(props);
        axios.get(API_PATH + "top-rated")
            .then((res) => {
                console.log("res.data.data");
                console.log(res.data.data);
                setTopDacha(res.data.data.data);
            })
    }, []);

    return (
        <div className="topdacha">
            <div className="container position-relative p-0">
                <div className="row p-0 m-0">
                    <div className="col-12 d-flex justify-content-between align-items-center">
                        <div className="text-center w-100">
                            <h1 className="">
                                <img src="./images/chiziq.png" className="lineImgg"/> {getText("topDacha")} <img
                                src="./images/chiziq.png" className="lineImgg"/></h1>
                        </div>
                        {/*<div className="d-flex justify-content-between">*/}
                        {/*    <button className="nextprev mr-2 "><img src="./images/Vector (16).png"/></button>*/}
                        {/*    <button className="nextprev"><img src="./images/Vector (17).png"/></button>*/}
                        {/*</div>*/}
                    </div>
                </div>

                   <SimpleSlider topDacha1={topDacha}/>

                <div className="row mt-4 d-flex position-relative">

                    {/*{topDacha.map((item, index) => {*/}
                    {/*    return (*/}
                    {/*        <div className="col-sm-6 col-md-4 col-6 mt-3" key={item.id}>*/}
                    {/*            <Link to="/countryhouse" className="text-decoration-none"*/}
                    {/*                  onClick={() => props.topTan.splice(0, 1, item)}>*/}
                    {/*                /!*onClick={()=>{props.updateState({topTan:item})}}>*!/*/}
                    {/*                <div className="card">*/}
                    {/*                    <div className="cardimgg">*/}
                    {/*                        /!*<div className="cardimgg2"></div>*!/*/}
                    {/*                        <img src={BASE_URL + item.images[0].image_path}*/}
                    {/*                             className="card-img-top"/>*/}
                    {/*                    </div>*/}

                    {/*                    <div className="card-img-overlay">*/}
                    {/*                        <div className="summm">*/}
                    {/*                            {*/}
                    {/*                                item?.top_rated == 1 ?*/}
                    {/*                                    <button type="button" className="bbb">Top</button>*/}
                    {/*                                    : ""*/}
                    {/*                            }*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                    <div className="card-body">*/}
                    {/*                        /!*<h3>{getLanguage() === "ru" ? item.name_ru : item.name_uz}</h3>*!/*/}
                    {/*                        <h3>{item.name}</h3>*/}
                    {/*                        <div>*/}
                    {/*                            <img src="./images/newImagesTwo/Vector (14).png"/>*/}
                    {/*                            <span>{item.room_count} {getText("komnat")}</span>*/}
                    {/*                        </div>*/}
                    {/*                        <div>*/}
                    {/*                            <img src="./images/newImagesTwo/Vector (15).png"/>*/}
                    {/*                            <span>{item.bathroom_count} {getText("danniy")}</span>*/}
                    {/*                        </div>*/}
                    {/*                        <div>*/}
                    {/*                            <img src="./images/newImagesTwo/Vector (16).png"/>*/}
                    {/*                            <span>{item.capacity} {getText("gost")}</span>*/}
                    {/*                        </div>*/}
                    {/*                        <div>*/}
                    {/*                            <img src="./images/newImagesTwo/Vector (17).png"/>*/}
                    {/*                            <span>{item.cost} {getText("sum")}</span>*/}
                    {/*                        </div>*/}
                    {/*                        <div className="mt-2">*/}
                    {/*                            <Link to="/countryhouse"*/}
                    {/*                                  className="text-secondary text-decoration-none">*/}
                    {/*                                {getText("podrobni")}</Link>*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            </Link>*/}
                    {/*        </div>*/}
                    {/*    )*/}
                    {/*})}*/}


                </div>


            </div>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        topDacha: state.dacha.topDacha,
        topTan: state.dacha.topTan,
        locale: state.dacha.locale
    }
};
export default connect(mapStateToProps, {getTopdacha, updateState})(TopDacha);



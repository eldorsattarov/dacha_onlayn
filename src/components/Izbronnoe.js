import React, {useEffect} from 'react';
import Header from "./Header";
import Header2 from "./Header2";
import Footer2 from "./Footer2";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {getIzbrannoe, updateState} from "../redux/action/dachaAction";
import index from "@mui/material/darkScrollbar";
import {getText, getLanguage} from "../locales";
import {BASE_URL} from "../tools/constants";

const Izbronnoe = (props) => {
    // console.log(props.topTan)
    useEffect(() => {
        props.getIzbrannoe();
        window.scrollTo(0, 0);
        // localStorage.setItem("locale" , JSON.stringify(props.locale));
    }, []);
    return (
        <div className="">
            {/*<Header/>*/}
            <div className="izbrannoe">
                <div className="container">
                    {
                        props.izbran.id ?
                            props.izbran.map((item, index) => {
                                    return (
                                        <div className="row mt-4" key={item.id}>
                                            <div className="col-12">
                                                <h1>{getLanguage() === "ru" ? item.name_ru : item.name_uz}</h1>
                                            </div>
                                            <div className="col-sm-12 col-md-8 col-12 d-flex cardTwo mt-2">
                                                <div className="card w-50 rounded-0 border-right-0">
                                                    <img src={BASE_URL + item.images[0].image_path} className="card-img-top h-100"/>
                                                    {/*<img src={BASE_URL + item.image_path} className="w-100"/>*/}
                                                </div>
                                                <div className="card w-50 rounded-0 border-left-0 cardTwo">
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
                                                            <Link to="/countryhouse" className="text-secondary text-decoration-none"
                                                                  onClick={() => props.topTan.splice(0, 1, item)}
                                                            >
                                                                {getText("podrobni")}</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-4 col-12 mt-2">
                                                <div className="card cardddd">
                                                    <div className="card-body">
                                                        <h3>{item.cost} сум</h3>
                                                        <span>
                                            {getText("izbranText")}<br/>
                                                            {item.phone}
                                             </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                : ""
                    }
                </div>
            </div>
            <Footer2/>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        izbran: state.dacha.izbran,
        topTan: state.dacha.topTan,
        ids_array: state.dacha.ids_array
    }
}
export default connect(mapStateToProps, {getIzbrannoe, updateState})(Izbronnoe);


import React, {useEffect, useState} from 'react';
import Header from "./Header";
import Footer from "./Footer";
import {getLanguage, getText} from "../locales";
import * as Yup from "yup";
import axios from "axios";
import {API_PATH, BASE_URL, TOKEN_NAME_LOGIN} from "../tools/constants";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";


import {getIzbrannoe, updateState} from "../redux/action/dachaAction";
import index from "@mui/material/darkScrollbar";
import {connect} from "react-redux";


const DachaFilterNewPage = (props) => {

    useEffect(() => {
        props.getIzbrannoe();
        window.scrollTo(0, 0);
        // localStorage.setItem("locale" , JSON.stringify(props.locale));
    }, []);


    const [userFavourite, setUserFavourite] = useState([]);

    const [dachaFilter , setDachaFilter] = useState([])

    useEffect(() => {
        axios.get(API_PATH + "dacha", {
            // headers: {
            //     'Authorization': `Bearer ${localStorage.getItem(TOKEN_NAME_LOGIN)}`
            // }
        })
            .then((res) => {
                setUserFavourite(res.data?.data.data)
                setDachaFilter(res.data?.data.data);
            })
    }, []);



    return (
        <div>
            <Header/>
            <div className="dacha_filter">
                <div className="container">

                    <form className="w-100">

                        <div className="row">
                            <div className="col-sm-10 col-8 mt-2">
                                <input type="text" className="form-control input1" name="" placeholder="Поиск дачи..."/>
                            </div>
                            <div className="col-sm-2 col-3  mt-2">
                                <button type="submit" className=""><img src="./images/newimg/Icon.png"/>Поиск</button>
                            </div>

                            <div className="col-6 col-sm-2 mt-2">
                                <label>Цена</label>
                                <input type="number" name="" className="form-control input1" placeholder="от"/>
                            </div>
                            <div className="col-6 col-sm-2 mt-2">
                                <label>.</label><br/>
                                <input type="number" name="" className="form-control input1" placeholder="до"/>

                            </div>
                            <div className="col-6 col-sm-4 mt-2">
                                <label>Город</label>
                                <select className="form-control input1">
                                    <option>Билдирсой</option>
                                    <option>Билдирсой</option>
                                    <option>Билдирсой</option>
                                </select>
                            </div>
                            <div className="col-6 col-sm-4 mt-2">
                                <label>Число людей</label>
                                <input type="text" className="form-control input1" name=""/>
                            </div>


                            <div className="col-sm-2 col-6 mt-2">
                                <label className="checkk1"><input type="checkbox" name=""
                                                                  className="checkk"/>Бассейн</label><br/>
                                <label className="checkk1"><input type="checkbox" name="" className="checkk"/>Зимний
                                    бассейн</label>
                            </div>
                            <div className="col-sm-2 col-6 mt-2">
                                <label className="checkk1"><input type="checkbox" name=""
                                                                  className="checkk"/>Бильярд</label><br/>
                                <label className="checkk1"><input type="checkbox" name="" className="checkk"/>PlayStation
                                    3/4/5</label>
                            </div>
                            <div className="col-sm-2 col-6 mt-2">
                                <label className="checkk1"><input type="checkbox" name=""
                                                                  className="checkk"/>Сауна</label><br/>
                                <label className="checkk1"><input type="checkbox" name=""
                                                                  className="checkk"/>Караоке</label>
                            </div>
                            <div className="col-sm-2 col-6 mt-2">
                                <label className="checkk1"><input type="checkbox" name="" className="checkk"/>Стол
                                    тенниси</label><br/>
                                <label className="checkk1"><input type="checkbox" name="" className="checkk"/>PlayStation
                                    3/4/5</label>
                            </div>
                            <div className="col-sm-2 col-6 mt-2">
                                <label className="checkk1"><input type="checkbox" name="" className="checkk"/>Кондиционер</label><br/>
                                <label className="checkk1"><input type="checkbox" name="" className="checkk"/>WI
                                    FI</label>
                            </div>

                        </div>

                    </form>

                </div>

                <div className="container p-0">
                    {
                        userFavourite?.map((item, index) => {
                            return (
                                <div className="row mt-4 izbrannoe" key={item.id}>
                                    <div className="col-12">
                                        <h1>{item.name}</h1>
                                    </div>
                                    <div className="col-sm-12 col-md-8 col-12 d-flex cardTwo mt-2">
                                        <div className="card w-50 border-right-0 cardTwo1">
                                            <img src={BASE_URL + item.images[0].image_path}
                                                 className="card-img-top h-100"/>
                                            {/*<img src={BASE_URL + item.image_path} className="w-100"/>*/}
                                        </div>
                                        <div className="card w-50 border-left-0 cardTwo2">
                                            <div className="card-body">
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
                                                    <Link to="/countryhouse"
                                                          className="text-secondary text-decoration-none"
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
                                                <span>{getText("izbranText")}<br/>{item.phone}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
            <Footer/>
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
export default connect(mapStateToProps, {getIzbrannoe, updateState})(DachaFilterNewPage);


// export default DachaFilterNewPage;
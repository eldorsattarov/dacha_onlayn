import React, {useEffect} from 'react';
import Header from "./Header";
import Header2 from "./Header2";
import Footer2 from "./Footer2";
import TopDacha from "./TopDacha";
import {connect} from "react-redux";
import {getTopdacha, getId, updateState, getIzbrannoe} from "../redux/action/dachaAction";
import {getText, getLanguage} from "../locales";
import {API_PATH, BASE_URL, TOKEN_NAME_LOGIN} from "../tools/constants";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


import Img1 from "../images/newImagesTwo/Micro.png";
import Img2 from "../images/newImagesTwo/Game Controller.png";
import Img3 from "../images/newImagesTwo/Timezone +8.png";
import Img4 from "../images/newImagesTwo/Table Tennis.png";
import Img5 from "../images/newImagesTwo/Soccer Ball.png";
import Img6 from "../images/newImagesTwo/Sofa.png";
import Img7 from "../images/newImagesTwo/Balcony.png";
import Img8 from "../images/newImagesTwo/Air Conditioner.png";
import Img9 from "../images/newImagesTwo/Wi-Fi.png";
const imgs = [Img1,Img2,Img3,Img4,Img5,Img6,Img7,Img8];

toast.configure();
const Dacha = (props) => {
    console.log(props.topTan);
    // console.log("a = "+localStorage.getItem("locale"));
    //  console.log(props.locale)
    // localStorage.setItem("locale" , JSON.stringify(props.locale));
    // console.log("izbranLocal = " + props.ids_array);
    useEffect(() => {
        // props.getIzbrannoe();
        props.getTopdacha();
        props.getId();
        window.scrollTo(0, 0);
        localStorage.setItem("locale", JSON.stringify(props.locale));
        // props.updateState({ids_array : JSON.parse(localStorage.getItem("locale"))});
    }, []);

    const addFovourite = (dacha_id) => {
        axios.post(API_PATH + `favourite-add/${dacha_id}`, {}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_NAME_LOGIN)}`
            }
        })
            .then((res) => {
                console.log(res)
            })
    }

    return (
        <div>
            <Header/>
            <div className="dacha">
                {props.topTan?.map((item, index) => {
                    return (
                        <div className="container" key={item.id}>
                            <div className="row">
                                <div className="col-12">
                                    {/*<h3>{localStorage.locales}</h3>*/}
                                    {/*<h1>{getLanguage() === "ru" ? item.name_ru : item.name_uz}</h1>*/}
                                    <h1>{item.name}</h1>
                                </div>
                            </div>
                            <div className="mt-4 imagesRow">
                                {props.topTan[index].images?.map((item2, index2) => {
                                    return (
                                        <div className="col-9 col-sm-3">
                                            <img src={BASE_URL + item2.image_path} className=""/>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="row mt-5">
                                <div className="col-12">
                                    <h4>Удобства</h4>
                                    <div className="line "></div>
                                </div>
                                <div className="col-12 col-sm-4 aaaaa mt-3">
                                    <ul className="flex-column nav">
                                        <li className="">
                                            <img src="./images/newImagesTwo/Vector (14).png"/>
                                            <a href="#" className="">{getText("komnat")}: {item.room_count}</a>
                                        </li>
                                        <li className="">
                                            <img src="./images/newImagesTwo/Vector (16).png"/>
                                            <a href="#" className="">{getText("gost")}: {item.capacity} </a>
                                        </li>
                                        <li className="">
                                            <img src="./images/newImagesTwo/Vector (15).png"/>
                                            <a href="#" className="">{getText("danniy")}: {item.bathroom_count}</a>
                                        </li>
                                        {/*<li className=""><a href="#" className="">{getText("vremyaOne")}</a></li>*/}
                                        {/*<li className=""><a href="#" className="">{getText("vremyaTwo")}</a></li>*/}
                                    </ul>
                                </div>
                                <div className="col-12 col-sm-4 aaaaa mt-3">

                                    <ul className="flex-column nav">
                                        {props.topTan[index].comforts ? props.topTan[index].comforts.map((item3, index3) => {
                                            return (
                                                <li className="">
                                                    <img src={BASE_URL + item3.icon} className="comfortIcon"/>
                                                    <a href="#" className="">{getLanguage() === "ru" ? item3.name_ru : item3.name_uz}</a>
                                                </li>
                                            )
                                        }) : ""
                                        }
                                    </ul>
                                </div>
                                <div className="col-12 col-sm-4 aaaaa mt-3">
                                    <div className="card rounded-0">
                                        <div className="card-body">
                                            <h5>{item.cost} {getText("sum")}</h5>
                                            <p>
                                                {getText("izbranText")}<br/>
                                                {item.phone}
                                            </p>
                                            <button className="btn izbran w-100" onClick={() => addFovourite(item.id)}>{getText("izbrannoe")}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-12 col-sm-8 aaaaa">
                                    <h4>Подробнее</h4>
                                    <p className="comments">
                                       {item.comment}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <TopDacha/>
            </div>
            <Footer2/>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        topTan: state.dacha.topTan,
        topDacha: state.dacha.topDacha,
        locale: state.dacha.locale,
        ids_array: state.dacha.ids_array
    }
}
export default connect(mapStateToProps, {getTopdacha, getIzbrannoe, getId, updateState})(Dacha);

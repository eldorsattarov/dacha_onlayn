import React, {useEffect} from 'react';
import Header from "./Header";
import Header2 from "./Header2";
import Footer2 from "./Footer2";
import TopDacha from "./TopDacha";
import {connect} from "react-redux";
import {getTopdacha,getId, updateState,getIzbrannoe} from "../redux/action/dachaAction";
import {getText, getLanguage} from "../locales";
import {BASE_URL} from "../tools/constants";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
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
        window.scrollTo(0,0);
        localStorage.setItem("locale" , JSON.stringify(props.locale));
        // props.updateState({ids_array : JSON.parse(localStorage.getItem("locale"))});
    }, []);

    return (
        <div>
            <Header/>
            <div className="dacha">
                {props.topTan.map((item, index) => {
                        return (
                            <div className="container" key={item.id}>
                                <div className="row">
                                    <div className="col-12">
                                        {/*<h3>{localStorage.locales}</h3>*/}
                                        <h1>{getLanguage() === "ru" ? item.name_ru : item.name_uz}</h1>
                                    </div>
                                </div>
                                <div className="mt-4 imagesRow">
                                    {props.topTan[index].images.map((item2, index2) => {
                                        return (
                                            <div className="col-9 col-sm-3">
                                                <img src={BASE_URL + item2.image_path} className=""/>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="row mt-5">
                                    <div className="col-12 col-sm-4 aaaaa">
                                        <h4>Подробнее</h4>
                                        <div className="line d-sm-none"></div>
                                        <ul className="flex-column">
                                            <li className=""><a href="#"
                                                                className="">{getText("komnat")}: {item.room_count}</a></li>
                                            <li className=""><a href="#"
                                                                className="">{getText("gost")}: {item.capacity} </a></li>
                                            {/*<li className=""><a href="#" className="">Спальние: 2</a></li>*/}
                                            {/*<li className=""><a href="#" className="">Кровати: 6</a></li>*/}
                                            <li className=""><a href="#"
                                                                className="">{getText("danniy")}: {item.bathroom_count}</a>
                                            </li>
                                            <li className=""><a href="#" className="">{getText("vremyaOne")}</a></li>
                                            <li className=""><a href="#" className="">{getText("vremyaTwo")}</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-12 col-sm-4 aaaaa">
                                        <h4>Удобства</h4>
                                        <div className="line d-sm-none"></div>
                                        <ul className="flex-column">
                                            {/*{getLanguage() === "ru" ? props.topTan[index].comforts.map((item3, index3) => {*/}
                                            {/*        return (*/}
                                            {/*            <li className=""><a href="#" className="">{item3.name_ru}</a></li>*/}
                                            {/*        )*/}
                                            {/*    }) :*/}
                                            {props.topTan[index].comforts ? props.topTan[index].comforts.map((item3, index3) => {
                                                    return (
                                                        <li className=""><a href="#" className="">
                                                            {getLanguage() === "ru" ? item3.name_ru : item3.name_uz}
                                                        </a></li>
                                                    )
                                                }) : ""
                                            }
                                        </ul>
                                    </div>
                                    <div className="col-12 col-sm-4 aaaaa">
                                        <div className="card rounded-0">
                                            <div className="card-body">
                                                <h5>{item.cost} {getText("sum")}</h5>
                                                <p>
                                                   {getText("izbranText")}<br/>
                                                    {item.phone}
                                                </p>
                                                <button className="btn izbran w-100 rounded-0" onClick={()=>props.locale.push(item.id)}>{getText("izbrannoe")}</button>
                                                {/*<button className="btn izbran w-100 rounded-0"*/}
                                                {/*        onClick={()=>props.locale.push(item.id)}>*/}
                                                {/*    <a href={`${"tel:" + item.phone}`}>{item.phone}</a>*/}
                                                {/*</button>*/}
                                                {/*onClick={()=>localStorage.setItem("locale" , [item.id])}>в избранное</button>*/}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*<div className="line"></div>*/}

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
        ids_array : state.dacha.ids_array
    }
}
export default connect(mapStateToProps, {getTopdacha,getIzbrannoe,getId, updateState})(Dacha);

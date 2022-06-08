import React, {useEffect, useState} from 'react';
import {getText} from "../locales";
import Header from "./Header";
import Footer from "./Footer";
import {Alert} from "reactstrap";
import {Modal} from "reactstrap";
import {Formik , Form , Field , ErrorMessage} from 'formik';
import {Select} from "antd"
// import { Alert } from 'antd';
import * as Yup from "yup";
import axios from "axios";
import {API_PATH, TOKEN_NAME_LOGIN} from "../tools/constants";

import Click from "../images/clickog.png";
import Payme from "../images/ass.jpg";
import Apelsin from "../images/Apelsin_02.png";

// import {Input, Select, DatePicker, TreeSelect, Switch} from 'antd';
import {Link} from "react-router-dom";
import {Option} from "antd/es/mentions";
import 'antd/dist/antd.css';
import {toast} from "react-toastify";


toast.configure();
const Dovabit = () => {


    const [image_path, setImages] = useState([]);
    const [currency, setCurrency] = useState("");
    const tanladi = (e) => {
        setCurrency(e.target.value)
        console.log(currency)
    }
    const handleImageChange = (e) => {
        console.log(e)
        setImages(e.target.files)
    }
    // console.log(image_path)

    const initialValues = {
        name: "",
        phone: "",
        category_id: "",
        room_count: "",
        bathroom_count: "",
        capacity: "",
        cost: "",
        advertiser_name: "",
        currency: "",
        comment: "",
        image_path: [],
        _method: "method"
    }
    const validationSchema = Yup.object({
        name: Yup.string().required('название ...'),
        phone: Yup.string()
            .matches(
                /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                "Номер телефона недействителен"
            )
            .min(12 , "минимум 12 символов")
            .required('телефон...'),
        // category_id: Yup.string().required('категория ...'),
        room_count: Yup.string().required('количество комнат ...'),
        bathroom_count: Yup.string().required('ванная комната ...'),
        capacity: Yup.string().required('вместимость ...'),
        cost: Yup.string().required('Стоимость ...'),
        advertiser_name: Yup.string().required('имя рекламодателя ...'),
        currency: Yup.string().required('валюта ...'),
        comment: Yup.string().required('комментарий ...'),
        image_path: Yup.string().required('путь изображения ...'),
        // _method: Yup.string().required('method ...'),
    });

    const onSubmit = (values) => {
        console.log("value = ", values);
        axios.post(API_PATH + "dacha", {
                // name : values.name,
                // phone : values.phone,
                // _method : "put"
            },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(TOKEN_NAME_LOGIN)}`
                }
            },
        )
            .then(res => {
                // console.log(res)
                // // props.updateState({user : res.data})
                // toast.success("Успешный !");
                // navigate("/profil");
            })
            .catch(err => {
                toast.error("Ошибка ?");
            })
    }


    const [location, setLocation] = useState([]);
    useEffect(() => {
        axios.get(API_PATH + "category")
            .then((res) => {
                setLocation(res.data.data);
            })
    }, []);


    const [category , setCategory] = useState(null);
    const chan = (e) => {
        console.log(e.target.value);
        setCategory(e.target.value);
    }


    const [userinfo, setUserinfo] = useState([]);
    useEffect(() => {
        axios.get(API_PATH + "user", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_NAME_LOGIN)}`
            }
        })
            .then((res) => {
                setUserinfo(res?.data);
            })
    }, []);

    const [pay, setPay] = useState(false);
    const payModal = () => {
        setPay(!pay);
    }


    return (
        <div>
            <Header/>
            <div className="dovabitDacha">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h1>
                                <img src="./images/chiziq.png" className="lineImgg"/> {getText("reklama")}
                                <img src="./images/chiziq.png" className="lineImgg"/>
                            </h1>
                        </div>
                        <div className="col-12 col-sm-4 offset-sm-4 mt-3 mb-3">
                            {
                                userinfo.payment_status == 1 ?
                                    <Alert color="success" className="pt-3 pb-3 payalert">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span>{getText("alerttext2")}</span>
                                            <button type="button" className="btn-danger ml-2"
                                                    onClick={payModal}>{getText("tolov")}</button>
                                        </div>
                                    </Alert>
                                    :
                                    (userinfo.payment_status == 0 ?
                                        <Alert color="danger" className="pt-3 pb-3 payalert">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span>{getText("alerttext")}</span>
                                                <button type="button" className="btn-danger ml-2"
                                                        onClick={payModal}>{getText("tolov")}</button>
                                            </div>
                                        </Alert> : "")
                            }
                        </div>
                    </div>

                    <div className="login_forms">
                        <Formik
                            initialValues={initialValues}
                            onSubmit={onSubmit}
                            validationSchema={validationSchema}
                        >
                            {
                                formik => {
                                    return <Form>
                                        <div className="login_page_inputs">
                                            <div className="login_inputs_wrapper">
                                                <div className="row">

                                                    <div className="col-sm-6 col-12 mt-2">
                                                        <label>{getText("dovnazvani")}</label>
                                                        <Field
                                                            type="text"
                                                            id="name"
                                                            autoComplete="off"
                                                            className="form-control input1"
                                                            name="name"
                                                        />
                                                        <ErrorMessage name="name" component='div' style={{color: 'red'}}
                                                                      className="error"/>
                                                    </div>
                                                    {/*select*/}
                                                    <div className="col-sm-6 col-12 mt-2">
                                                        <label>{getText("dovadres")}</label>
                                                        {/*<select onChange={chan} type="select" id="category_id"*/}
                                                        {/*        autoComplete="off" className="form-control input1"*/}
                                                        {/*        name="category_id"*/}
                                                        {/*        value={category}*/}
                                                        {/*>*/}
                                                        {/*    {*/}
                                                        {/*        location.map((item, index) => {*/}
                                                        {/*            return (*/}
                                                        {/*                <option value={item.id}>{item.name_ru}</option>*/}
                                                        {/*            )*/}
                                                        {/*        })*/}
                                                        {/*    }*/}
                                                        {/*</select>*/}
                                                        <Field
                                                            type="text"
                                                            name="category_id"
                                                            as="select"
                                                            className="form-control input1"
                                                        >
                                                            {
                                                                location.map((item, index) => {
                                                                    return (
                                                                        <option value={item.id}>{item.name_ru}</option>
                                                                    )
                                                                })
                                                            }
                                                        </Field>

                                                        {/*<ErrorMessage name="category_id" component='div'*/}
                                                        {/*              style={{color: 'red'}} className="error"/>*/}
                                                    </div>
                                                    {/*images*/}

                                                    <div className="col-12 mt-2">
                                                        <label>{getText("dovizb")}</label>

                                                        <Field
                                                            type="file"
                                                            id="image_path"
                                                            autoComplete="off"
                                                            className="form-control input2"
                                                            name="image_path"
                                                            onChange={handleImageChange}
                                                        />
                                                        <ErrorMessage name="image_path" component='div'
                                                                      style={{color: 'red'}} className="error"/>
                                                    </div>

                                                    <div className="col-12 mt-2">
                                                        <label>{getText("dovfilter")}</label>
                                                    </div>

                                                    <div className="col-sm-3 col-6 mt-2 mb-2">
                                                        <div className="d-flex align-items-center filters">
                                                            <img src="./images/newImg/Two Beds.png"/>
                                                            <span>{getText("dovkolich1")}</span>
                                                            <Field
                                                                type="text"
                                                                id="room_count"
                                                                autoComplete="off"
                                                                className="form-control filterField"
                                                                name="room_count"
                                                            />
                                                            {/*<ErrorMessage name = "room_count" component = 'div' style={{color: 'red'}}  className = "error" />*/}

                                                        </div>
                                                    </div>

                                                    <div className="col-sm-3 col-6 mt-2 mb-2">
                                                        <div className="d-flex align-items-center filters">
                                                            <img src="./images/newImg/Swimming Pool.png"/>
                                                            <span>{getText("dovkolich2")}</span>
                                                            <Field
                                                                type="text"
                                                                id="bathroom_count"
                                                                autoComplete="off"
                                                                className="form-control filterField"
                                                                name="bathroom_count"
                                                            />
                                                            {/*<ErrorMessage name = "bathroom_count" component = 'div' style={{color: 'red'}}  className = "error" />*/}

                                                        </div>
                                                    </div>

                                                    <div className="col-sm-3 col-6 mt-2 mb-2">
                                                        <div className="d-flex align-items-center filters">
                                                            <img src="./images/newImg/Vector (3).png"/>
                                                            <span>{getText("dovkolich3")}</span>
                                                            <Field
                                                                type="text"
                                                                id="capacity"
                                                                autoComplete="off"
                                                                className="form-control filterField"
                                                                name="capacity"
                                                            />
                                                            {/*<ErrorMessage name = "capacity" component = 'div' style={{color: 'red'}}  className = "error" />*/}

                                                        </div>
                                                    </div>

                                                    <div className="col-sm-3 col-12 mt-2 mb-2"></div>

                                                    {/*<div className="col-sm-2 col-6 mt-2">*/}
                                                    {/*    <label className="checkk1"><Field type="checkbox" name="1"*/}
                                                    {/*                                      className="checkk"/>{getText("bassen")}*/}
                                                    {/*    </label><br/>*/}
                                                    {/*    <label className="checkk1"><Field type="checkbox" name="2"*/}
                                                    {/*                                      className="checkk"/>{getText("zimbassen")}*/}
                                                    {/*    </label>*/}
                                                    {/*</div>*/}
                                                    {/*<div className="col-sm-2 col-6 mt-2">*/}
                                                    {/*    <label className="checkk1"><Field type="checkbox" name="3"*/}
                                                    {/*                                      className="checkk"/>{getText("bilyard")}*/}
                                                    {/*    </label><br/>*/}
                                                    {/*    <label className="checkk1"><Field type="checkbox" name="4"*/}
                                                    {/*                                      className="checkk"/>{getText("play")}*/}
                                                    {/*    </label>*/}
                                                    {/*</div>*/}
                                                    {/*<div className="col-sm-2 col-6 mt-2">*/}
                                                    {/*    <label className="checkk1"><Field type="checkbox" name="5"*/}
                                                    {/*                                      className="checkk"/>{getText("sauna")}*/}
                                                    {/*    </label><br/>*/}
                                                    {/*    <label className="checkk1"><Field type="checkbox" name="6"*/}
                                                    {/*                                      className="checkk"/>{getText("karoke")}*/}
                                                    {/*    </label>*/}
                                                    {/*</div>*/}
                                                    {/*<div className="col-sm-2 col-6 mt-2">*/}
                                                    {/*    <label className="checkk1"><Field type="checkbox" name="7"*/}
                                                    {/*                                      className="checkk"/>{getText("tenis")}*/}
                                                    {/*    </label><br/>*/}
                                                    {/*    <label className="checkk1"><Field type="checkbox" name="8"*/}
                                                    {/*                                      className="checkk"/>{getText("play")}*/}
                                                    {/*    </label>*/}
                                                    {/*</div>*/}
                                                    {/*<div className="col-sm-2 col-6 mt-2">*/}
                                                    {/*    <label className="checkk1"><Field type="checkbox" name="9"*/}
                                                    {/*                                      className="checkk"/>{getText("con")}*/}
                                                    {/*    </label><br/>*/}
                                                    {/*    <label className="checkk1"><Field type="checkbox" name="10"*/}
                                                    {/*                                      className="checkk"/>{getText("wife")}*/}
                                                    {/*    </label>*/}
                                                    {/*</div>*/}

                                                    <div className="col-12 mt-2">
                                                        <label>{getText("dovopis")}</label>
                                                        <Field
                                                            type="text"
                                                            name="comment"
                                                            autoComplete="off"
                                                            className="form-control inputArea"
                                                            placeholder={getText("dovopisplace")}
                                                        />
                                                    </div>

                                                    <div className="col-12 mt-3">
                                                        <label>{getText("dovkomm")}</label>
                                                    </div>

                                                    <div className="col-sm-7 col-12 mt-2">
                                                        <label>{getText("dovimya")}</label>
                                                        <Field
                                                            type="text"
                                                            name="advertiser_name"
                                                            autoComplete="off"
                                                            id="advertiser_name"
                                                            className="form-control input1"
                                                        />
                                                        <ErrorMessage name="advertiser_name" component='div'
                                                                      style={{color: 'red'}} className="error"/>
                                                    </div>

                                                    <div className="col-9 col-sm-3 mt-2">
                                                        <label>{getText("dovsena")}</label>
                                                        <Field
                                                            type="text"
                                                            name="cost"
                                                            id="cost"
                                                            autoComplete="off"
                                                            className="form-control input1"
                                                        />
                                                        <ErrorMessage name="cost" component='div' style={{color: 'red'}}
                                                                      className="error"/>
                                                    </div>

                                                    <div className="col-3 col-sm-2 mt-2">
                                                        <label>.</label><br/>
                                                        {/*<select className="form-control input1" name="currency"*/}
                                                        {/*        onChange={tanladi} value={currency}>*/}
                                                        {/*    <option value="y">y.e</option>*/}
                                                        {/*    <option value="s">cyм</option>*/}
                                                        {/*</select>*/}
                                                        <Field
                                                            type={"text"}
                                                            name="currency"
                                                            as="select"
                                                            className="form-control input1"
                                                            onChange={tanladi}
                                                        >
                                                                <option value="y.e">y.e</option>
                                                                <option value="cyм">cyм</option>
                                                        </Field>
                                                    </div>

                                                    <div className="col-12 col-sm-7 mt-2">
                                                        <label>{getText("dovnomer")}</label>
                                                        <Field
                                                            type="number"
                                                            name="phone"
                                                            id="phone"
                                                            className="form-control input1"
                                                        />
                                                        <ErrorMessage name="phone" component='div'
                                                                      style={{color: 'red'}} className="error"/>
                                                    </div>

                                                    <div className="col-12 mt-3 d-flex justify-content-center">
                                                        <button type="submit" className="btn">{getText("dovv")}</button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </Form>
                                }
                            }

                        </Formik>
                    </div>

                </div>
                <Modal isOpen={pay} toggle={() => setPay(!pay)} className="payModal1">
                    <div className="payModal p-4" style={{borderRadius: "50px"}}>
                        <div className="title">
                            <h2 style={{fontFamily: "Manrope", color: "#F2931F"}}>{getText("paymodaltitle")}</h2>
                        </div>
                        <div className="imgs d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center justify-content-center"
                                 style={{
                                     width: "100px",
                                     height: "60px",
                                     border: "2px solid #E8E8E8",
                                     borderRadius: "10px"
                                 }}>
                                <a href={`https://my.click.uz/services/pay?service_id=23092&merchant_id=15939&amount=5000&transaction_param=${userinfo.id}`}
                                   target="_blank"
                                   className="">
                                    <img src={Click} className="" style={{width: "60px", height: "50px"}}/>
                                </a>
                            </div>
                            <div className="d-flex align-items-center justify-content-center"
                                 style={{
                                     width: "100px",
                                     height: "60px",
                                     border: "2px solid #E8E8E8",
                                     borderRadius: "10px"
                                 }}>
                                <a href="#"
                                    // target="_blank"
                                   className="">
                                    <img src={Payme} className="" style={{width: "65px", height: "50px"}}/>
                                </a>
                            </div>
                            <div className="d-flex align-items-center justify-content-center"
                                 style={{
                                     width: "100px",
                                     height: "60px",
                                     border: "2px solid #E8E8E8",
                                     borderRadius: "10px"
                                 }}>
                                <a href="#"
                                    // target="_blank"
                                   className="">
                                    <img src={Apelsin} className="" style={{width: "70px", height: "30px"}}/>
                                </a>
                            </div>
                        </div>
                        <div className="text mt-3">
                            <p className="mb-0"
                               style={{fontFamily: "Manrope", color: "#858585"}}>{getText("paymodal")}</p>
                            <p className="mb-0"
                               style={{fontFamily: "Manrope", color: "#858585"}}>{getText("paymodal2")}</p>
                            <p className="mb-0"
                               style={{fontFamily: "Manrope", color: "#858585"}}>{getText("paymodal3")}</p>
                        </div>
                    </div>
                </Modal>


            </div>
            <Footer/>


        </div>
    );
};

export default Dovabit;

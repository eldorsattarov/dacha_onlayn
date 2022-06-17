import React, {useEffect, useState} from 'react';
import {getLanguage, getText} from "../locales";
import Header from "./Header";
import Footer from "./Footer";
import {Alert} from "reactstrap";
import {Modal} from "reactstrap";
import {Formik, Form, Field, ErrorMessage, useFormik} from 'formik';
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
import {Upload} from 'antd';
import ImgCrop from 'antd-img-crop';
import {toast} from "react-toastify";


toast.configure();


const Dovabit = () => {


// img qo'shish uchun
    const [fileList, setFileList] = useState([]);

    const onChange = ({fileList: newFileList}) => {
        setFileList(newFileList);
    };
    console.log(fileList);

    const onPreview = async (file) => {
        let src = file.url;

        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };
// img qo'shish uchun

    const formik = useFormik({
        initialValues: {
            name_ru: "",
            name_uz: "",
            phone: "",
            category_id: "",
            room_count: "",
            bathroom_count: "",
            capacity: "",
            cost: "",
            advertiser_name: "",
            currency: "",
            comment: "",
            image_path: fileList,
            comforts: [],
        },

        onSubmit: values => {
            const data = {
                category_id: values.category_id,
                room_count: values.room_count,
                bathroom_count: values.bathroom_count,
                capacity: values.capacity,
                cost: values.capacity,
                image_path: fileList,
                name_uz: values.name_uz,
                name_ru: values.name_ru,
                _method: "method",
                phone: values.phone,
                advertiser_name: values.advertiser_name,
                comment: values.comment,
                currency: values.currency
            };
            const formData = new FormData();
            formData.append('file', data);
            console.log(formData);
            console.log(data);
            axios.post(API_PATH + "dacha", data,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem(TOKEN_NAME_LOGIN)}`
                    }
                },
            )
                .then(res => {
                    console.log(res);
                    toast.success("Успешный !");
                    // navigate("/profil");
                })
                .catch(err => {
                    toast.error("Ошибка ?");
                    console.log(err.response)
                })
        }
    });
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
        image_path: fileList,
        comforts: [],
        // _method: "method"
    };
    const validationSchema = Yup.object({
        name: Yup.string().required('название ...'),
        phone: Yup.string()
            .matches(
                /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                "Номер телефона недействителен"
            )
            .min(12, "минимум 12 символов")
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

    };


    const [location, setLocation] = useState([]);
    useEffect(() => {
        axios.get(API_PATH + "category")
            .then((res) => {
                setLocation(res.data.data);
            })
    }, []);

    const [comfort, setComfort] = useState([]);
    useEffect(() => {
        axios.get(API_PATH + "comfort")
            .then((res) => {
                // console.log(res.data.data)
                setComfort(res.data.data);
            })
    }, []);


    // tolov ni tekshirish uchun
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
                        <form onSubmit={formik.handleSubmit}>
                            <div className="login_page_inputs">
                                <div className="login_inputs_wrapper">
                                    <div className="row">
                                        <div className="col-sm-4 col-12 mt-2">
                                            <label>{getText("dovnazvani")}</label>
                                            <input
                                                type="text"
                                                required
                                                id="name_ru"
                                                className="form-control input1"
                                                name="name_ru"
                                                value={formik.values.name_ru}
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                        <div className="col-sm-4 col-12 mt-2">
                                            <label>{getText("dovnazvani2")}</label>
                                            <input
                                                required
                                                type="text"
                                                id="name_uz"
                                                className="form-control input1"
                                                name="name_uz"
                                                value={formik.values.name_uz}
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                        {/*select*/}
                                        <div className="col-sm-4 col-12 mt-2">
                                            <label>{getText("dovadres")}</label>
                                            <select
                                                name="category_id"
                                                className="form-control input1"
                                                value={formik.values.category_id}
                                                required
                                                onChange={formik.handleChange}
                                            >
                                                {
                                                    location.map((item, index) => {
                                                        return (
                                                            <option value={item.id} key={index}>
                                                                {getLanguage() === "ru" ? item.name_ru : item.name_uz}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>

                                            {/*<ErrorMessage name="category_id" component='div'*/}
                                            {/*              style={{color: 'red'}} className="error"/>*/}
                                        </div>
                                        {/*images*/}
                                        <div className="col-12 mt-2">
                                            <label>{getText("dovizb")}</label>
                                        </div>
                                        <div className="col-12 mt-2">

                                            <ImgCrop rotate>
                                                <Upload
                                                    type="file"
                                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                    listType="picture-card"
                                                    fileList={fileList}
                                                    value={formik.values.image_path}
                                                    required
                                                    onChange={onChange}
                                                    onPreview={onPreview}
                                                    name="image_path"
                                                >
                                                    {fileList.length < 10 && '+ Upload'}
                                                </Upload>
                                            </ImgCrop>


                                        </div>

                                        <div className="col-12 mt-2">
                                            <label>{getText("dovfilter")}</label>
                                        </div>

                                        <div className="col-sm-3 col-6 mt-2 mb-2">
                                            <div className="d-flex align-items-center filters">
                                                <img src="./images/newImg/Two Beds.png"/>
                                                <span>{getText("dovkolich1")}</span>
                                                <input
                                                    type="text"
                                                    id="room_count"
                                                    className="form-control filterField"
                                                    name="room_count"
                                                    value={formik.values.room_count}
                                                    required
                                                    onChange={formik.handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-sm-3 col-6 mt-2 mb-2">
                                            <div className="d-flex align-items-center filters">
                                                <img src="./images/newImg/Swimming Pool.png"/>
                                                <span>{getText("dovkolich2")}</span>
                                                <input
                                                    type="text"
                                                    id="bathroom_count"
                                                    className="form-control filterField"
                                                    name="bathroom_count"
                                                    value={formik.values.bathroom_count}
                                                    required
                                                    onChange={formik.handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-sm-3 col-6 mt-2 mb-2">
                                            <div className="d-flex align-items-center filters">
                                                <img src="./images/newImg/Vector (3).png"/>
                                                <span>{getText("dovkolich3")}</span>
                                                <input
                                                    type="text"
                                                    id="capacity"
                                                    className="form-control filterField"
                                                    name="capacity"
                                                    value={formik.values.capacity}
                                                    required
                                                    onChange={formik.handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-3 col-12 mt-2 mb-2"></div>
                                        {comfort?.map((item, index) => {
                                            return (
                                                <div className="col-sm-2 col-6 mt-2" key={index}>
                                                    <label className="checkk1">
                                                        <input
                                                            type="checkbox"
                                                            name="comforts"
                                                            className="checkk"
                                                            value={formik.values.comforts}
                                                            onChange={formik.handleChange}
                                                        />
                                                        {getLanguage() === "ru" ? item.name_ru : item.name_uz}
                                                    </label><br/>
                                                </div>
                                            )
                                        })}
                                        <div className="col-12 mt-2">
                                            <label>{getText("dovopis")}</label>
                                            <input
                                                type="text"
                                                name="comment"
                                                // autoComplete="off"
                                                className="form-control inputArea"
                                                placeholder={getText("dovopisplace")}
                                                value={formik.values.comment}
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                        <div className="col-12 mt-3">
                                            <label>{getText("dovkomm")}</label>
                                        </div>
                                        <div className="col-sm-7 col-12 mt-2">
                                            <label>{getText("dovimya")}</label>
                                            <input
                                                type="text"
                                                name="advertiser_name"
                                                // autoComplete="off"
                                                id="advertiser_name"
                                                className="form-control input1"
                                                value={formik.values.advertiser_name}
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                        <div className="col-9 col-sm-3 mt-2">
                                            <label>{getText("dovsena")}</label>
                                            <input
                                                type="text"
                                                name="cost"
                                                id="cost"
                                                className="form-control input1"
                                                value={formik.values.cost}
                                                required
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                        <div className="col-3 col-sm-2 mt-2">
                                            <label>.</label><br/>
                                            <select
                                                name="currency"
                                                className="form-control input1"
                                                value={formik.values.currency}
                                                onChange={formik.handleChange}
                                            >
                                                <option value="y.e">y.e</option>
                                                <option value="cyм">cyм</option>
                                            </select>
                                        </div>

                                        <div className="col-12 col-sm-7 mt-2">
                                            <label>{getText("dovnomer")}</label>
                                            <input
                                                type="number"
                                                name="phone"
                                                id="phone"
                                                className="form-control input1"
                                                value={formik.values.phone}
                                                onChange={formik.handleChange}
                                            />
                                        </div>

                                        <div className="col-12 mt-3 d-flex justify-content-center">
                                            <button
                                                type="submit"
                                                onClick={formik.handleSubmit}
                                                className="btn"
                                            >
                                                {getText("dovv")}
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </form>
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

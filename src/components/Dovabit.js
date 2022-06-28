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
import {Link, useNavigate} from "react-router-dom";
import {Option} from "antd/es/mentions";
import 'antd/dist/antd.css';
import {Upload} from 'antd';
import ImgCrop from 'antd-img-crop';
import {toast} from "react-toastify";
import {connect} from "react-redux";
import {getIzbrannoe, updateState} from "../redux/action/dachaAction";


toast.configure();


const Dovabit = (props) => {
    console.log("prop edit" , props.userDachaEdit);
    const navigate = useNavigate()


// img qo'shish uchun
    const [fileList, setFileList] = useState(
       // props.userDachaEdit.length>0 ? props.userDachaEdit[0].images :
           []
    );


    const onChange = ({fileList: newFileList}) => {
        // props.userDachaEdit.length>0 ? fileList.push(props.userDachaEdit[0].images) :
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

    // location
    const [location, setLocation] = useState([]);
    useEffect(() => {
        axios.get(API_PATH + "category")
            .then((res) => {
                setLocation(res?.data.data);
            })
    }, []);

    // location
    // console.log(props.userDachaEdit[0].id)

    const formik = useFormik({

            initialValues : props.userDachaEdit.length > 0 ?
                {
                    name: props.userDachaEdit[0].name,
                    phone: props.userDachaEdit[0].phone,
                    category_id: props.userDachaEdit[0].category_id,
                    room_count: props.userDachaEdit[0].room_count,
                    bathroom_count: props.userDachaEdit[0].bathroom_count,
                    capacity: props.userDachaEdit[0].capacity,
                    cost: props.userDachaEdit[0].cost,
                    advertiser_name: props.userDachaEdit[0].advertiser_name,
                    currency: props.userDachaEdit[0].currency,
                    comment: props.userDachaEdit[0].comment,
                    image_path: "",
                    comforts: [],
                    _method : "put"
                }
                :
                {
                        name: "",
                        phone: "",
                        category_id: "",
                        room_count: "",
                        bathroom_count: "",
                        capacity: "",
                        cost: "",
                        advertiser_name: "",
                        currency: "y.e",
                        comment: "",
                        image_path: "",
                        comforts: [],
                    },

        onSubmit: values => {
            // console.log("valuesss ", values);

            const comfortNumber = [];

            values.comforts.forEach(str => {
                comfortNumber.push(Number(str));
            });

            const data = {
                name: values.name,
                category_id: parseInt(values.category_id),
                room_count: values.room_count,
                bathroom_count: values.bathroom_count,
                capacity: values.capacity,
                cost: values.cost,
                // image_path: [fileList[0].originFileObj],
                image_path: fileList,
                phone: values.phone,
                advertiser_name: values.advertiser_name,
                comment: values.comment,
                currency: values.currency,
                comforts: comfortNumber
            };

            const formData = new FormData();
            for (let i = 0; i < fileList.length; i++) {
                // formData.append('image_path[]', fileList[i])
                formData.append('image_path[]', new Blob([fileList[i].originFileObj],
                        // "images/png"
                        {type: "application/octet-stream"}
                        ))
            }
            formData.append('name', values.name)
            formData.append('category_id', values.category_id)
            formData.append('room_count', values.room_count)
            formData.append('bathroom_count', values.bathroom_count)
            formData.append('capacity', values.capacity)
            formData.append('cost', values.cost)
            formData.append('advertiser_name', values.advertiser_name)
            formData.append('phone', values.phone)
            formData.append('comment', values.comment)
            formData.append('currency', values.currency)
            for (let i = 0; i < comfortNumber.length ; i++) {
                formData.append("comforts[]" , [comfortNumber[i]])
            }
            props.userDachaEdit.length > 0 ? formData.append("_method" , "put")
                : formData.append("_method" , "post")
            console.log(formData);
            console.log(data);

            props.userDachaEdit.length > 0 ?
                axios.post(API_PATH + "dacha/" + props.userDachaEdit[0].id, formData,
                    {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem(TOKEN_NAME_LOGIN)}`,
                        }
                    },
                )
                    .then(res => {
                        props.userDachaEdit.splice(0,1);
                        setFileList([])
                        navigate("/profil");
                        toast.success("Сохранять !");
                    })
                    .catch(err => {
                        toast.error("Ошибка ?");
                        console.log(err.response)
                    })
                :
                axios.post(API_PATH + "dacha", formData,
                    {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem(TOKEN_NAME_LOGIN)}`,
                        }
                    },
                )
                    .then(res => {
                        setFileList([])
                        navigate("/profil");
                        toast.success("Успешный !");

                    })
                    .catch(err => {
                        toast.error("Ошибка ?");
                        console.log(err.response)
                    })
        }
    });


    const [comfort, setComfort] = useState([]);
    useEffect(() => {
        axios.get(API_PATH + "comfort")
            .then((res) => {
                // console.log(res.data.data)
                setComfort(res?.data.data);
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
                                <img src="./images/chiziq.png" className="lineImgg"/>
                                {getText("reklama")}
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
                                        <div className="col-sm-6 col-12 mt-2">
                                            <label>{getText("dovnazvanii")}</label>
                                            <input
                                                type="text"
                                                required
                                                id="name"
                                                className="form-control input1"
                                                name="name"
                                                value={formik.values.name}
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                        <div className="col-sm-6 col-12 mt-2">
                                            <label>{getText("dovadres")}</label>
                                            <select
                                                type="number"
                                                name="category_id"
                                                className="form-control input1"
                                                value={formik.values.category_id}
                                                // defaultValue={location[1]?.id}
                                                // value={location[0]?.id}
                                                required
                                                onChange={formik.handleChange}
                                                // defaultValue={3}
                                            >
                                                {
                                                    location.map((item, index) => {
                                                        return (
                                                            <option value={item.id} key={index} >
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
                                                    action="http://work.bingo99.uz/"
                                                    listType="picture-card"
                                                    fileList={fileList}
                                                    value={formik.values.image_path}
                                                    required
                                                    onChange={onChange}
                                                    onPreview={onPreview}
                                                    name="image_path"
                                                >
                                                    {fileList.length < 10 && `+ ${getText("upload")}`}
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
                                                    type="number"
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
                                                    type="number"
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
                                                    type="number"
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
                                                            value={item.id}
                                                            onChange={formik.handleChange}
                                                        />
                                                        {getLanguage() === "ru" ? item.name_ru : item.name_uz}
                                                    </label><br/>
                                                </div>
                                            )
                                        })}
                                        <div className="col-12 mt-2">
                                            <label>{getText("dovopis")}</label>
                                            <textarea
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
                                                type="number"
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
                                                type={"text"}
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
                                                // onClick={formik.handleSubmit}
                                                className="btn"
                                            >
                                                {
                                                    props.userDachaEdit.length>0 ?
                                                    getText("dovv2") :
                                                        getText("dovv")
                                                }
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
const mapStateToProps = (state) => {
    return {
        user: state.login.user,
        dacha: state.dacha.dacha,
        topTan: state.dacha.topTan,
        userDachaEdit: state.dacha.userDachaEdit
    }
}
export default connect(mapStateToProps, {getIzbrannoe, updateState})(Dovabit);

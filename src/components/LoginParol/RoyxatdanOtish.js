
import React , {useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import Header from "../Header";
import axios from "axios";
// import {API_PATH, BASE_URL} from "../../tools/constants";
import { useNavigate } from "react-router-dom";


import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import {toast,ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Button} from "reactstrap";
import {TOKEN_NAME_REGISTER} from "../../tools/constants";
import {getText} from "../../locales";
toast.configure();

const RoyxatdanOtish = () => {

    const navigate = useNavigate()

    const [token1, setToken1] = useState(null)


    const initialValues = {
        name : "",
        phone: "998",
        password: '',
        very_password: '',
    }
    const validationSchema = Yup.object({
        name: Yup.string().required('название ...'),
        // phone: Yup.number().typeError("Это не похоже на номер телефона")
        //     .positive("Номер телефона не может начинаться с минуса")
        //     .integer("Номер телефона не может содержать десятичную точку")
        //     .min(12 , "минимум 12 символов")
        //     .required('телефон...'),
        phone: Yup.string()
            .matches(
                /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                "Номер телефона недействителен"
            )
            .min(12 , "минимум 12 символов")
            .required('телефон...'),
        password: Yup.string().min(6 , "минимум 6 символов").required('пароль...'),
        very_password: Yup.string().min(6 , "минимум 6 символов").required('пароль...'),
    })

    const onSubmit = (values) => {
        axios.post("https://work.bingo99.uz/api/register" ,
            {
            name : values.name,
            phone : values.phone,
            // phone : values.phone.slice(1,values.phone.length),
            password : values.password,
            very_password : values.very_password
        }
        )
            .then((res) => {
                console.log(res)
                // setToken(res.data.accessToken)
                localStorage.setItem(TOKEN_NAME_REGISTER, res.data.token);
                toast.success("Успешный !");
                navigate("/login");
            })
            .catch(err => {
                toast.error("Ошибка ?");
            })
    }

    return (
        <div>
            <Header/>
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="text-center w-100">
                                <h1 className="">
                                    <img src="./images/chiziq.png" className="lineImgg"/> {getText("regtitle")} <img src="./images/chiziq.png" className="lineImgg"/></h1>
                            </div>
                        </div>


                        <div className="col-sm-4 col-8 offset-2 offset-sm-4">
                            <div className="card">
                                <div className="card-body">
                                    {/*formik*/}

                                    <div className="login_forms">
                                        <Formik
                                            initialValues = {initialValues}
                                            onSubmit = {onSubmit}
                                            validationSchema = {validationSchema}
                                        >
                                            {
                                                formik => {
                                                    return <Form>
                                                        <div className="login_page_inputs">
                                                            <div className="login_inputs_wrapper">
                                                                <div className="login_control">
                                                                    <label className="login_label" >{getText("regimya")}</label>
                                                                    <div className="login_input">
                                                                        <Field
                                                                            type = "text"
                                                                            id = "name"
                                                                            name = "name"
                                                                            autoComplete="off"
                                                                            className="form-control"
                                                                        />
                                                                        <ErrorMessage name = "name" component = 'div' style={{color: 'red'}}  className = "error"/>
                                                                    </div>
                                                                </div>
                                                                <div className="login_control">
                                                                    <label className="login_label" >{getText("regnomer")}</label>
                                                                    <div className="parol_input">
                                                                        <Field
                                                                            type="phone"
                                                                            id = "phone"
                                                                            name = "phone"
                                                                            autoComplete="off"
                                                                            className="form-control"
                                                                            // placeholder={"998"}
                                                                        />
                                                                        <ErrorMessage name = "phone" component = 'div' style={{color: 'red'}} className = "error" />
                                                                    </div>
                                                                </div>
                                                                <div className="login_control">
                                                                    <label className="login_label" >{getText("regparol")}</label>
                                                                    <div className="parol_input">
                                                                        <Field
                                                                            type="text"
                                                                            id = "password"
                                                                            name = "password"
                                                                            autoComplete="off"
                                                                            className="form-control"
                                                                        />
                                                                        <ErrorMessage name = "password" component = 'div' style={{color: 'red'}} className = "error"
                                                                                      maxWidth={6}/>
                                                                    </div>
                                                                </div>
                                                                <div className="login_control">
                                                                    <label className="login_label" >{getText("regparol2")}</label>
                                                                    <div className="parol_input">
                                                                        <Field
                                                                            type="text"
                                                                            id = "very_password"
                                                                            name = "very_password"
                                                                            autoComplete="off"
                                                                            className="form-control"
                                                                        />
                                                                        <ErrorMessage name = "very_password" component = 'div' style={{color: 'red'}} className = "error" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>


                                                        <button
                                                            type = 'submit'
                                                            className = "in_button mt-3"
                                                        >
                                                            {getText("regg")}
                                                        </button>
                                                        <div className="w-100 text-center mt-2">
                                                            <Link to="/login" className="royxat">{getText("regglogin")}</Link>
                                                        </div>

                                                    </Form>
                                                }
                                            }

                                        </Formik>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default RoyxatdanOtish;

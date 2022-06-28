import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";

import {getText} from "../../locales";
import Header from "../Header";
import {Link, useHref, HistoryRouterProps} from "react-router-dom";
import axios from "axios";
import {API_PATH, BASE_URL, TOKEN_NAME_LOGIN} from "../../tools/constants";
import {toast} from "react-toastify";

import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from "react-redux";
import {onSubmitOne} from "../../images/loginAction";

toast.configure();

const Kirish = () => {
// const Kirish = ({ setUser }) => {

    const navigate = useNavigate()


    // formik
    const [token, setToken] = useState(null)



    const initialValues = {
        phone: '998',
        password: ''
    }
    const validationSchema = Yup.object({
        // phone: Yup.number().typeError("Это не похоже на номер телефона")
        // .positive("Номер телефона не может начинаться с минуса")
        // .integer("Номер телефона не может содержать десятичную точку")
        // .min(12 , "минимум 12 символов")
        // .required('телефон...'),
        phone: Yup.string()
            .matches(
                /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                "Номер телефона недействителен"
            )
            .min(12 , "минимум 12 символов")
            .max(12 , "Максимум 12 символов")
            .required('телефон...'),
        password: Yup.string().min(6 , "минимум 6 символов").required('пароль ...'),
    })

    const onSubmit = (values) => {
        axios.post(API_PATH + "login", {
            phone : values.phone,
            // phone : values.phone.slice(1,values.phone.length),
            password: values.password
        })
            .then((res) => {
                console.log(res.data.token)
                setToken(res.data.token);
                localStorage.setItem(TOKEN_NAME_LOGIN, res.data.token);
                // props.history.push("/");
                // nextPage();
                navigate("/profil");
                toast.success("Успешный !");
            })
            .catch(err => {
                console.log(err);
                toast.error("Ошибка ?");
            })
    }

    return (
        <div>
            <Header/>
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="text-center w-100">
                                <h1 className="">
                                    <img src="./images/chiziq.png" className="lineImgg"/> {getText("logtitle")} <img
                                    src="./images/chiziq.png" className="lineImgg"/></h1>
                            </div>
                        </div>

                        <div className="col-sm-4 col-8 offset-2 offset-sm-4">
                            <div className="card">
                                <div className="card-body">
                                    {/*formik*/}

                                    <div className="login_forms">
                                        <Formik
                                            initialValues={initialValues}
                                            onSubmit={onSubmit}
                                            // onSubmit = {(event, errors, values) => {props.onSubmitOne(event, errors, values, props.history)}}
                                            validationSchema={validationSchema}
                                        >
                                            {
                                                formik => {
                                                    return <Form>
                                                        <div className="login_page_inputs">
                                                            <div className="login_inputs_wrapper">
                                                                <div className="login_control">
                                                                    <label className="login_label">{getText("logtel")}</label>
                                                                    <div className="login_input">
                                                                        <Field
                                                                            type="text"
                                                                            id="phone"
                                                                            name="phone"
                                                                            autoComplete="off"
                                                                            className="form-control"
                                                                        />
                                                                        <ErrorMessage name="phone" component='div'
                                                                                      style={{color: 'red'}}
                                                                                      className="error"/>
                                                                    </div>
                                                                </div>
                                                                <div className="login_control mt-2">
                                                                    <label className="login_label">{getText("logparol")}</label>
                                                                    <div className="parol_input">
                                                                        <Field
                                                                            type="password"
                                                                            id="password"
                                                                            name="password"
                                                                            autoComplete="off"
                                                                            className="form-control"
                                                                        />
                                                                        <ErrorMessage name="password" component='div'
                                                                                      style={{color: 'red'}}
                                                                                      className="error"/>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>


                                                        <button
                                                            type='submit'
                                                            className="in_button mt-4"
                                                        >
                                                            {getText("logg")}
                                                        </button>
                                                        <div className="w-100 text-center mt-2">
                                                            <Link to="/register"
                                                                  className="royxat">{getText("logre")}</Link>
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

export default connect(null, {onSubmitOne})(Kirish);

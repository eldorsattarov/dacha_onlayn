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
import {onSubmitOne} from "../../redux/action/loginAction";

import Main from "../Main";

toast.configure();

const Kirish = () => {
// const Kirish = ({ setUser }) => {

    const navigate = useNavigate()


    // formik
    const [token, setToken] = useState(null)

    const initialValues = {
        phone: '',
        password: ''
    }
    const validationSchema = Yup.object({
        phone: Yup.string().required('телефон ...'),
        password: Yup.string().required('пароль ...'),
    })

    const onSubmit = (values) => {
        axios.post("https://work.bingo99.uz/api/login", {
            phone: values.phone,
            password: values.password
        })
            .then((res) => {
                console.log(res.data.token)
                setToken(res.data.token);
                localStorage.setItem(TOKEN_NAME_LOGIN, res.data.token);
                navigate("/profil");
                toast.success("Успешный !");
            })
            .catch(err => {
                console.log(err);
                toast.error("Ошибка ?");
            })
    }


    // useEffect(() => {
        // if (localStorage.getItem(TOKEN_NAME_LOGIN)) {
        //     axios.get("https://work.bingo99.uz/api/user", {
        //         headers: {
        //             'Authorization': `Bearer ${token}`}
        //     })
        //         .then(res => {
        //             console.log(res)
        //             setUser(res.data.data)
        //         })
        //         .catch(err => {
        //             // console.log(err)
        //         })
        // }
    // }, [token, setUser])

    // formik


    return (
        <div>
            <Header/>
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="text-center w-100">
                                <h1 className="">
                                    <img src="./images/chiziq.png" className="lineImgg"/> Войти в аккаунт <img
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
                                                                    <label className="login_label">Телефонный
                                                                        номер</label>
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
                                                                    <label className="login_label">Пароль</label>
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
                                                            Войти
                                                        </button>
                                                        <div className="w-100 text-center mt-2">
                                                            <Link to="/register"
                                                                  className="royxat">Зарегистрироваться</Link>
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
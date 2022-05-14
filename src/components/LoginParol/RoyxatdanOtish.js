
import React , {useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import Header from "../Header";
import axios from "axios";
// import {API_PATH, BASE_URL} from "../../tools/constants";

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import {toast,ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Button} from "reactstrap";
import {TOKEN_NAME_REGISTER} from "../../tools/constants";
toast.configure();

const RoyxatdanOtish = () => {

    const [token1, setToken1] = useState(null)

    const initialValues = {
        name : "",
        phone: '',
        password: '',
        very_password: '',
    }
    const validationSchema = Yup.object({
        name: Yup.string().required('название ...'),
        phone: Yup.string().required('телефон...'),
        password: Yup.string().required('пароль...'),
        very_password: Yup.string().required('пароль...'),
    })

    const onSubmit = (values) => {
        // console.log(values)
        axios.post("https://work.bingo99.uz/api/register" , values)
            .then((res) => {
                console.log(res)
                // setToken(res.data.accessToken)
                localStorage.setItem(TOKEN_NAME_REGISTER, res.data.token);
                toast.success("Успешный !");
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
                                    <img src="./images/chiziq.png" className="lineImgg"/> Зарегистрироваться <img src="./images/chiziq.png" className="lineImgg"/></h1>
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
                                                                        <label className="login_label" >Полное имя</label>
                                                                        <div className="login_input">
                                                                            <Field
                                                                                type = "text"
                                                                                id = "name"
                                                                                name = "name"
                                                                                autoComplete="off"
                                                                                className="form-control"
                                                                            />
                                                                            <ErrorMessage name = "name" component = 'div' style={{color: 'red'}}  className = "error" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="login_control">
                                                                        <label className="login_label" >Телефонный номер</label>
                                                                        <div className="parol_input">
                                                                            <Field
                                                                                type="phone"
                                                                                id = "phone"
                                                                                name = "phone"
                                                                                autoComplete="off"
                                                                                className="form-control"
                                                                            />
                                                                            <ErrorMessage name = "phone" component = 'div' style={{color: 'red'}} className = "error" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="login_control">
                                                                        <label className="login_label" >Пароль</label>
                                                                        <div className="parol_input">
                                                                            <Field
                                                                                type="text"
                                                                                id = "password"
                                                                                name = "password"
                                                                                autoComplete="off"
                                                                                className="form-control"
                                                                            />
                                                                            <ErrorMessage name = "password" component = 'div' style={{color: 'red'}} className = "error" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="login_control">
                                                                        <label className="login_label" >Подтвердить Пароль</label>
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
                                                                Зарегистрироваться
                                                            </button>
                                                            <div className="w-100 text-center mt-2">
                                                                <Link to="/login" className="royxat">Войти в аккаунт</Link>
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
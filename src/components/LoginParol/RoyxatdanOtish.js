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
        name: Yup.string().required('name kritilmagan ...'),
        phone: Yup.string().required('phone kritilmagan ...'),
        password: Yup.string().required('parol kiritilmagan...'),
        very_password: Yup.string().required('parol kiritilmagan...'),
    })

    const onSubmit = (values) => {
        // console.log(values)
        axios.post("https://work.bingo99.uz/api/register" , values)
            .then((res) => {
                console.log(res)
                // setToken(res.data.accessToken)
                // localStorage.setItem('soft-ais-token', res.data.accessToken);
                toast.success("tog'ri");
            })
            .catch(err => {
                toast.error("xatolik");
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

                        {/*formik*/}
                        <div className="row">
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
                                                            <label className="login_label" >Phone</label>
                                                            <div className="login_input">
                                                                <Field
                                                                    type = "text"
                                                                    id = "name"
                                                                    name = "name"
                                                                    placeholder="name ni kiriting"
                                                                    autoComplete="off"
                                                                />
                                                                <ErrorMessage name = "name" component = 'div' style={{color: 'red'}}  className = "error" />
                                                            </div>
                                                        </div>
                                                        <div className="login_control">
                                                            <label className="login_label" >Password</label>
                                                            <div className="parol_input">
                                                                <Field
                                                                    type="phone"
                                                                    id = "phone"
                                                                    name = "phone"
                                                                    placeholder="Phone ni kiriting"
                                                                    autoComplete="off"
                                                                />
                                                                <ErrorMessage name = "phone" component = 'div' style={{color: 'red'}} className = "error" />
                                                            </div>
                                                        </div>
                                                        <div className="login_control">
                                                            <label className="login_label" >Password</label>
                                                            <div className="parol_input">
                                                                <Field
                                                                    type="password"
                                                                    id = "password"
                                                                    name = "password"
                                                                    placeholder="Parolni kiriting"
                                                                    autoComplete="off"
                                                                />
                                                                <ErrorMessage name = "password" component = 'div' style={{color: 'red'}} className = "error" />
                                                            </div>
                                                        </div>
                                                        <div className="login_control">
                                                            <label className="login_label" >Password</label>
                                                            <div className="parol_input">
                                                                <Field
                                                                    type="password"
                                                                    id = "password2"
                                                                    name = "very_password"
                                                                    placeholder="Parolni kiriting"
                                                                    autoComplete="off"
                                                                />
                                                                <ErrorMessage name = "password2" component = 'div' style={{color: 'red'}} className = "error" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                                <button
                                                    type = 'submit'
                                                    className = "in_button"
                                                >
                                                   Register
                                                </button>

                                            </Form>
                                        }
                                    }

                                </Formik>
                            </div>
                        </div>

                        <div className="col-sm-4 col-8 offset-2 offset-sm-4">
                            <div className="card">
                                <div className="card-body">
                                    <form>
                                        <div className="">
                                            <label>Полное имя</label>
                                            <input type="text" className="form-control" name="name"/>
                                        </div>
                                        <div className="mt-2">
                                            <label>Телефонный номер</label>
                                            <input type="text" className="form-control" name="phone"/>
                                        </div>
                                        <div className="mt-2">
                                            <label>Пароль</label>
                                            <input type="text" className="form-control" name="password"/>
                                        </div>
                                        <div className="mt-2">
                                            <label>Подтвердить Пароль</label>
                                            <input type="text" className="form-control" name="very_password"/>
                                        </div>
                                        <div className="mt-3">
                                            {/*<button type="submit">Зарегистрироваться</button>*/}
                                            <Button>Зарегистрироваться</Button>
                                        </div>
                                        <div className="w-100 text-center mt-2">
                                            <Link to="/login" className="royxat">Войти в аккаунт</Link>
                                        </div>
                                    </form>
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

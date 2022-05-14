import React,{useEffect,useState} from 'react';
import {getText} from "../../locales";
import Header from "../Header";
import {Link} from "react-router-dom";
import axios from "axios";
import {API_PATH, BASE_URL} from "../../tools/constants";
import {toast} from "react-toastify";

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import 'react-toastify/dist/ReactToastify.css';
import {Button} from "reactstrap";
toast.configure();

const Kirish = () => {
// const Kirish = ({ setUser }) => {

    // formik
    const [token, setToken] = useState(null)

    const initialValues = {
        phone: '',
        password: ''
    }
    const validationSchema = Yup.object({
        phone: Yup.string().required('phone kritilmagan ...'),
        password: Yup.string().required('parol kiritilmagan...'),
    })

    const onSubmit = (values) => {
        // console.log(values)
        axios.post("https://work.bingo99.uz/api/login" , {
            phone: values.phone,
            password: values.password
        })
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

    // useEffect(() => {
    //     if(localStorage.getItem('soft-ais-token')) {
    //         axios.get("https://work.bingo99.uz/api/login", {headers: { 'x-access-token': localStorage.getItem('soft-ais-token')}})
    //             .then(res => {
    //                 setUser(res.data.data)
    //             })
    //             .catch(err => {
    //                 // console.log(err)
    //             })
    //     }
    // }, [token, setUser])

    // formik

    const [formValue, setformValue] = React.useState({
        phone: '',
        password: ''
    });

    // const handleChange = (event) => {
    //     setformValue({
    //         ...formValue,
    //         [event.target.name]: event.target.value
    //     });
    // }
    //
    //
    // const handleSubmit = async() => {
    //     const loginFormData = new FormData();
    //     loginFormData.append("phone", formValue.phone);
    //     loginFormData.append("password", formValue.password);
    //     try {
    //         // make axios post request
    //         const response = await axios({
    //             method: "post",
    //             url: API_PATH + "login",
    //             data: loginFormData,
    //             headers: [],
    //             // headers: { "Content-Type": "multipart/form-data" },
    //         });
    //         formValue.phone = "";
    //         formValue.password = "";
    //         toast.success("Успешный");
    //         console.log(response);
    //         console.log(JSON.stringify(response.data));
    //
    //     } catch(error) {
    //         toast.error("Ошибка, поле пустое")
    //     }
    // }

    return (
        <div>
            <Header/>
            <div className="login">
                <div className="container">
                    <div className="row">
                     <div className="col-12">
                         <div className="text-center w-100">
                             <h1 className="">
                                 <img src="./images/chiziq.png" className="lineImgg"/> Войти в аккаунт <img src="./images/chiziq.png" className="lineImgg"/></h1>
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
                                                                    id = "phone"
                                                                    name = "phone"
                                                                    placeholder="Phone ni kiriting"
                                                                    autoComplete="off"
                                                                />
                                                                <ErrorMessage name = "phone" component = 'div' style={{color: 'red'}}  className = "error" />
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
                                                    </div>
                                                </div>


                                                <button
                                                    type = 'submit'
                                                    className = "in_button"
                                                >
                                                    Kirish
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
                                            <label>Телефонный номер</label>
                                            <input type="text" className="form-control" name="phone"/>
                                        </div>
                                        <div className="mt-2">
                                            <label>Пароль</label>
                                            <input type="password" className="form-control" name="password"/>
                                        </div>
                                        <div className="mt-3">
                                            <Button type="submit">Войти</Button>
                                        </div>
                                        <div className="w-100 text-center mt-2">
                                            <Link to="/register" className="royxat">Зарегистрироваться</Link>
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

export default Kirish;

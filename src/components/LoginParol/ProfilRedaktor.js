import React, {useEffect, useState} from 'react';
import Header from "../Header";
import {Link, useNavigate} from "react-router-dom";
import {API_PATH, TOKEN_NAME_LOGIN} from "../../tools/constants";
import axios from "axios";
import {getIzbrannoe} from "../../redux/action/dachaAction";
import {updateState} from "../../redux/action/loginAction";
import {connect} from "react-redux";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";

toast.configure();

const ProfilRedaktor = (props) => {

    const navigate = useNavigate()

    // useEffect(()=>{
    //     props.getIzbrannoe();
    //     if (localStorage.getItem(TOKEN_NAME_LOGIN)) {
    //         axios.put(API_PATH + "user", {
    //             headers: {
    //                 'Authorization': `Bearer ${localStorage.getItem(TOKEN_NAME_LOGIN)}`
    //             }
    //         })
    //             .then(res => {
    //                 console.log(res)
    //                 props.updateState({user : res.data})
    //                 // setUser(res.data)
    //             })
    //             .catch(err => {
    //                 // console.log(err)
    //             })
    //     }
    // },[])

    // formik
    // const [token, setToken] = useState(null)

    const initialValues = {
        name : "",
        phone: "",
    }
    const validationSchema = Yup.object({
        name: Yup.string().required('название ...'),
        phone: Yup.string().required('телефон ...'),
    })
    const onSubmit = (values) => {
        console.log(values)
        axios.put(API_PATH + "user",
            {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_NAME_LOGIN)}`
            }
        }
        )
            .then(res => {
                console.log(res)
                // props.updateState({user : res.data})
                toast.success("Успешный !");
                navigate("/profil");
            })
            .catch(err => {
                toast.error("Ошибка ?");
            })
    }


    return (
        <div>
            <Header/>
            <div className="profilRedactor">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="text-center w-100">
                                <h1 className="">
                                    <img src="./images/chiziq.png" className="lineImgg"/> Редактировать профиль <img src="./images/chiziq.png" className="lineImgg"/></h1>
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
                                            validationSchema={validationSchema}
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
                                                                <div className="login_control mt-2">
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
                                                            </div>
                                                        </div>


                                                        <button
                                                            type='submit'
                                                            className="in_button mt-4"
                                                        >
                                                            Сохранять
                                                        </button>
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
const mapStateToProps =(state)=>{
    return{
        user : state.login.user
    }
}
export default connect(mapStateToProps,{getIzbrannoe,updateState})(ProfilRedaktor);

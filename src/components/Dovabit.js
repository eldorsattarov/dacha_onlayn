import React from 'react';
import {getText} from "../locales";
import Header from "./Header";
import Footer from "./Footer";

import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";
import axios from "axios";
import {API_PATH, TOKEN_NAME_LOGIN} from "../tools/constants";

const Dovabit = () => {
    const initialValues = {
        // name : props.user.name,
        // phone: props.user.phone,
        // _method : "put"
    }
    const validationSchema = Yup.object({
        // name: Yup.string().required('название ...'),
        // phone: Yup.string().required('телефон ...'),
        // _method: Yup.string().required('method ...'),
    })
    const onSubmit = (values) => {
        console.log(values)
        axios.post(API_PATH + "user-update", {
                // name : values.name,
                // phone : values.phone,
                // _method : "put"
            },
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(TOKEN_NAME_LOGIN)}`
                }
            } ,
        )
            .then(res => {
                // console.log(res)
                // // props.updateState({user : res.data})
                // toast.success("Успешный !");
                // navigate("/profil");
            })
            .catch(err => {
                // toast.error("Ошибка ?");
            })
    }

    return (
        <div>
            <Header/>
            <div className="dovabitDacha">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h1><img src="./images/chiziq.png" className="lineImgg"/> {getText("reklama")} <img
                                src="./images/chiziq.png" className="lineImgg"/></h1>
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
                                                  {/*<div className="login_control">*/}
                                                  {/*    <label className="login_label" >Полное имя</label>*/}
                                                  {/*    <div className="login_input">*/}
                                                  {/*        <Field*/}
                                                  {/*            type = "text"*/}
                                                  {/*            id = "name"*/}
                                                  {/*            name = "name"*/}
                                                  {/*            autoComplete="off"*/}
                                                  {/*            className="form-control"*/}
                                                  {/*        />*/}
                                                  {/*        <ErrorMessage name = "name" component = 'div' style={{color: 'red'}}  className = "error" />*/}
                                                  {/*    </div>*/}
                                                  {/*</div>*/}
                                                  <div className="col-sm-6 col-12 mt-2">
                                                      <label>Введите название</label>
                                                      <Field type="text" id = "name" autoComplete="off" className="form-control input1" name="name"/>
                                                      <ErrorMessage name = "name" component = 'div' style={{color: 'red'}}  className = "error" />
                                                  </div>
                                                  <div className="col-sm-6 col-12 mt-2">
                                                      <label>Адрес местонахождения</label>
                                                      <select type="select" id = "name2" autoComplete="off" className="form-control input1" name="name2">
                                                          <option>Билдирсой</option>
                                                          <option>Билдирсой</option>
                                                          <option>Билдирсой</option>
                                                      </select>
                                                      <ErrorMessage name = "name2" component = 'div' style={{color: 'red'}}  className = "error" />
                                                  </div>


                                              </div>
                                            </div>
                                        </div>

                                    </Form>
                                }
                            }

                        </Formik>
                    </div>

                    <form className="w-100">

                       <div className="row">

                           <div className="col-12 mt-2">
                               <label>Изображение</label>
                               <input type="file" className="form-control input2"/>
                           </div>
                           <div className="col-12 mt-2">
                               <label>Добавить фильтры</label>
                               <div>

                               </div>
                           </div>
                           <div className="col-sm-2 col-6 mt-2">
                               <label className="checkk1"><input type="checkbox" name="" className="checkk"/>Бассейн</label><br/>
                               <label className="checkk1"><input type="checkbox" name="" className="checkk"/>Зимний бассейн</label>
                           </div>
                           <div className="col-sm-2 col-6 mt-2">
                               <label className="checkk1"><input type="checkbox" name="" className="checkk"/>Бильярд</label><br/>
                               <label className="checkk1"><input type="checkbox" name="" className="checkk"/>PlayStation 3/4/5</label>
                           </div>
                           <div className="col-sm-2 col-6 mt-2">
                               <label className="checkk1"><input type="checkbox" name="" className="checkk"/>Сауна</label><br/>
                               <label className="checkk1"><input type="checkbox" name="" className="checkk"/>Караоке</label>
                           </div>
                           <div className="col-sm-2 col-6 mt-2">
                               <label className="checkk1"><input type="checkbox" name="" className="checkk"/>Стол тенниси</label><br/>
                               <label className="checkk1"><input type="checkbox" name="" className="checkk"/>PlayStation 3/4/5</label>
                           </div>
                           <div className="col-sm-2 col-6 mt-2">
                               <label className="checkk1"><input type="checkbox" name="" className="checkk"/>Кондиционер</label><br/>
                               <label className="checkk1"><input type="checkbox" name="" className="checkk"/>WI FI</label>
                           </div>

                           <div className="col-12 mt-2">
                               <label>Описание</label>
                               <input type="textarea" name="" className="form-control inputArea"
                                      placeholder="Напишите описание вашего объявления" />
                           </div>
                           <div className="col-12 mt-3">
                               <label>Коммуникация</label>
                           </div>

                           <div className="col-sm-7 col-12 mt-2">
                               <label>Имя рекламодателя</label>
                               <input type="text" name=""  className="form-control input1"/>
                           </div>
                           <div className="col-9 col-sm-3 mt-2">
                               <label>Цена</label>
                               <input type="number" name="" className="form-control input1"/>
                           </div>
                           <div className="col-3 col-sm-2 mt-2">
                               <label>.</label><br/>
                               <select className="form-control input1">
                                   <option>y.e</option>
                                   <option>cyм</option>
                               </select>
                           </div>
                           <div className="col-12 col-sm-7 mt-2">
                               <label>Номер телефона</label>
                               <input type="number" name="" className="form-control input1"/>
                           </div>

                           <div className="col-12 mt-3 d-flex justify-content-center">
                               <button type="submit" className="btn">Добавлять</button>
                           </div>
                       </div>

                    </form>


                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Dovabit;

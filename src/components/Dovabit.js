import React, {useEffect, useState} from 'react';
import {getText} from "../locales";
import Header from "./Header";
import Footer from "./Footer";
import {Alert} from "reactstrap";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {Select} from "antd"

import * as Yup from "yup";
import axios from "axios";
import {API_PATH, TOKEN_NAME_LOGIN} from "../tools/constants";
// import {Input, Select, DatePicker, TreeSelect, Switch} from 'antd';
import {Link} from "react-router-dom";

const Dovabit = () => {
    const initialValues = {
        name : "",
        phone: "",
        category_id : "",
        room_count : "",
        bathroom_count : "",
        capacity : "",
        cost : "",
        advertiser_name : "",
        currency : "",
        comment : "",
        image_path : ""

        // _method : "put"
    }
    const validationSchema = Yup.object({
        name: Yup.string().required('название ...'),
        phone: Yup.string().required('телефон ...'),
        // _method: Yup.string().required('method ...'),
    })
    const onSubmit = (values) => {
        console.log(values);
        axios.post(API_PATH + "dacha", {
                name : values.name,
                phone : values.phone,
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


    const [location , setLocation] = useState([]);
    useEffect(()=>{
        axios.get(API_PATH + "category")
            .then((res)=>{
                // console.log(res.data.data)
                setLocation(res.data.data);
            })
    },[])

    const chan = (e) =>{
        console.log(e.target.value)
    }
    return (
        <div>
            <Header/>
            <div className="dovabitDacha">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h1>
                                <img src="./images/chiziq.png" className="lineImgg"/> {getText("reklama")} <img
                                src="./images/chiziq.png" className="lineImgg"/>
                            </h1>
                        </div>
                        <div className="col-12 col-sm-4 offset-sm-4 mt-3 mb-3">
                            <Alert color="danger" className="pt-3 pb-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <span>Плати, чтобы добавить дачу!</span>
                                    {/*<button type="button" className="btn btn-danger">оплаты</button>*/}
                                    <Link to="">оплаты</Link>
                                    {/*<button type="button" className="btn btn-danger">*/}
                                        {/*<img src="./images/newImg/payicon.png"/>*/}
                                    {/*</button>*/}
                                </div>
                            </Alert>
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
                                                  <div className="col-sm-6 col-12 mt-2">
                                                      <label>Введите название</label>
                                                      <Field
                                                          type="text"
                                                          id = "name"
                                                          autoComplete="off"
                                                          className="form-control input1"
                                                          name="name"
                                                      />
                                                      <ErrorMessage name = "name" component = 'div' style={{color: 'red'}}  className = "error" />
                                                  </div>
                                                  <div className="col-sm-6 col-12 mt-2">
                                                      <label>Адрес местонахождения</label>
                                                      <select onChange={chan} type="select" id ="category_id" autoComplete="off" className="form-control input1" name="category_id">
                                                          {
                                                              location.map((item,index)=>{
                                                                  return(
                                                                      <option value={item.id}>{item.name_ru}</option>
                                                                  )
                                                              })
                                                          }
                                                      </select>



                                                      <ErrorMessage name = "category_id" component = 'div' style={{color: 'red'}}  className = "error" />
                                                  </div>
                                                  <div className="col-12 mt-2">
                                                      <label>Изображение</label>
                                                      <Field
                                                          type="file"
                                                          id = "images"
                                                          autoComplete="off"
                                                          className="form-control input2"
                                                          name="images"
                                                      />
                                                      <ErrorMessage name = "images" component = 'div' style={{color: 'red'}}  className = "error" />
                                                  </div>
                                                  <div className="col-12 mt-2">
                                                      <label>Добавить фильтры</label>
                                                  </div>

                                                  <div className="col-sm-3 col-6 mt-2 mb-2">
                                                         <div className="d-flex align-items-center filters">
                                                             <img src="./images/newImg/Two Beds.png"/>
                                                             <span>Количество спален</span>
                                                             <Field
                                                                 type="text"
                                                                 id = "room_count"
                                                                 autoComplete="off"
                                                                 className="form-control filterField"
                                                                 name="room_count"
                                                             />
                                                             {/*<ErrorMessage name = "room_count" component = 'div' style={{color: 'red'}}  className = "error" />*/}

                                                         </div>
                                                  </div>
                                                  <div className="col-sm-3 col-6 mt-2 mb-2">
                                                      <div className="d-flex align-items-center filters">
                                                          <img src="./images/newImg/Swimming Pool.png"/>
                                                          <span>Кол-во бассейнов</span>
                                                          <Field
                                                              type="text"
                                                              id = "bathroom_count"
                                                              autoComplete="off"
                                                              className="form-control filterField"
                                                              name="bathroom_count"
                                                          />
                                                          {/*<ErrorMessage name = "bathroom_count" component = 'div' style={{color: 'red'}}  className = "error" />*/}

                                                      </div>
                                                  </div>
                                                  <div className="col-sm-3 col-6 mt-2 mb-2">
                                                      <div className="d-flex align-items-center filters">
                                                          <img src="./images/newImg/Vector (3).png"/>
                                                          <span>Число людей</span>
                                                          <Field
                                                              type="text"
                                                              id = "capacity"
                                                              autoComplete="off"
                                                              className="form-control filterField"
                                                              name="capacity"
                                                          />
                                                          {/*<ErrorMessage name = "capacity" component = 'div' style={{color: 'red'}}  className = "error" />*/}

                                                      </div>
                                                  </div>
                                                  <div className="col-sm-3 col-12 mt-2 mb-2"></div>

                                                  <div className="col-sm-2 col-6 mt-2">
                                                      <label className="checkk1"><Field type="checkbox" name="1" className="checkk"/>Бассейн</label><br/>
                                                      <label className="checkk1"><Field type="checkbox" name="2" className="checkk"/>Зимний бассейн</label>
                                                  </div>
                                                  <div className="col-sm-2 col-6 mt-2">
                                                      <label className="checkk1"><Field type="checkbox" name="3" className="checkk"/>Бильярд</label><br/>
                                                      <label className="checkk1"><Field type="checkbox" name="4" className="checkk"/>PlayStation 3/4/5</label>
                                                  </div>
                                                  <div className="col-sm-2 col-6 mt-2">
                                                      <label className="checkk1"><Field type="checkbox" name="5" className="checkk"/>Сауна</label><br/>
                                                      <label className="checkk1"><Field type="checkbox" name="6" className="checkk"/>Караоке</label>
                                                  </div>
                                                  <div className="col-sm-2 col-6 mt-2">
                                                      <label className="checkk1"><Field type="checkbox" name="7" className="checkk"/>Стол тенниси</label><br/>
                                                      <label className="checkk1"><Field type="checkbox" name="8" className="checkk"/>PlayStation 3/4/5</label>
                                                  </div>
                                                  <div className="col-sm-2 col-6 mt-2">
                                                      <label className="checkk1"><Field type="checkbox" name="9" className="checkk"/>Кондиционер</label><br/>
                                                      <label className="checkk1"><Field type="checkbox" name="10" className="checkk"/>WI FI</label>
                                                  </div>

                                                  <div className="col-12 mt-2">
                                                      <label>Описание</label>
                                                      <Field
                                                          type="text"
                                                          name="comment"
                                                          autoComplete="off"
                                                          className="form-control inputArea"
                                                          placeholder="Напишите описание вашего объявления"
                                                      />
                                                  </div>

                                                  <div className="col-12 mt-3">
                                                      <label>Коммуникация</label>
                                                  </div>
                                                  <div className="col-sm-7 col-12 mt-2">
                                                      <label>Имя рекламодателя</label>
                                                      <Field
                                                          type="text"
                                                          name="advertiser_name"
                                                          autoComplete="off"
                                                          id="advertiser_name"
                                                          className="form-control input1"
                                                      />
                                                      <ErrorMessage name = "advertiser_name" component = 'div' style={{color: 'red'}}  className = "error" />
                                                  </div>
                                                  <div className="col-9 col-sm-3 mt-2">
                                                      <label>Цена</label>
                                                      <Field
                                                          type="text"
                                                          name="cost"
                                                          id="cost"
                                                          autoComplete="off"
                                                          className="form-control input1"
                                                      />
                                                      <ErrorMessage name = "cost" component = 'div' style={{color: 'red'}}  className = "error" />
                                                  </div>
                                                  {/*<Select>*/}
                                                  {/*    <Select.Option value="y.e" className="form-control input1">*/}
                                                  {/*        <span style={{color:"#bfbfbf"}}>y.e</span>*/}
                                                  {/*    </Select.Option>*/}
                                                  {/*    <Select.Option value="cyм">*/}
                                                  {/*        <span style={{color:"#bfbfbf"}}>cyм</span>*/}
                                                  {/*    </Select.Option>*/}
                                                  {/*</Select>*/}

                                                  <div className="col-3 col-sm-2 mt-2">
                                                      <label>.</label><br/>
                                                      <select className="form-control input1">
                                                          <option>y.e</option>
                                                          <option>cyм</option>
                                                      </select>
                                                  </div>


                                                  <div className="col-12 col-sm-7 mt-2">
                                                      <label>Номер телефона</label>
                                                      <Field
                                                          type="number"
                                                          name="phone"
                                                          id="phone"
                                                          className="form-control input1"
                                                      />
                                                      <ErrorMessage name = "phone" component = 'div' style={{color: 'red'}}  className = "error" />
                                                  </div>

                                                  <div className="col-12 mt-3 d-flex justify-content-center">
                                                      <button type="submit" className="btn">Добавлять</button>
                                                  </div>

                                              </div>
                                            </div>
                                        </div>

                                    </Form>
                                }
                            }

                        </Formik>
                    </div>

                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Dovabit;

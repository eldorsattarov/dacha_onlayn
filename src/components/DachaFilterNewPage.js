import React, {useEffect, useState} from 'react';
import Header from "./Header";
import Footer from "./Footer";
import {getLanguage, getText} from "../locales";
import * as Yup from "yup";
import axios from "axios";
import {API_PATH, BASE_URL, TOKEN_NAME_LOGIN} from "../tools/constants";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";


import {getIzbrannoe, updateState} from "../redux/action/dachaAction";
import index from "@mui/material/darkScrollbar";
import {connect} from "react-redux";
import {ErrorMessage, Field, Form, Formik} from "formik";
import ImgCrop from "antd-img-crop";
import {Upload} from "antd";
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';


const DachaFilterNewPage = (props) => {

    useEffect(() => {
        props.getIzbrannoe();
        window.scrollTo(0, 0);
        // localStorage.setItem("locale" , JSON.stringify(props.locale));
    }, []);


    const [userFavourite, setUserFavourite] = useState([]);

    const [dachaFilter , setDachaFilter] = useState([])

    useEffect(() => {
        axios.get(API_PATH + "dacha", {
            // headers: {
            //     'Authorization': `Bearer ${localStorage.getItem(TOKEN_NAME_LOGIN)}`
            // }
        })
            .then((res) => {
                setUserFavourite(res.data?.data.data)
                setDachaFilter(res.data?.data.data);
            })
    }, []);

    const [location , setLocation] = useState([]);
    useEffect(()=>{
        axios.get(API_PATH + "category")
            .then((res)=>{
                // console.log(res.data.data)
                setLocation(res.data.data);
            })
    },[]);


    const chan = (e) =>{
        console.log(e.target.value)
    }


    const [comfort2, setComfort2] = useState([]);
    useEffect(() => {
        axios.get(API_PATH + "comfort")
            .then((res) => {
                // console.log(res.data.data)
                setComfort2(res.data.data);
            })
    }, []);


    const initialValues = {

    }
    const validationSchema = Yup.object({

    });

    const onSubmit = (values) => {
        console.log("value = ", values);

    }


    // search input
    const { Search } = Input;
    const suffix = (
        <AudioOutlined
            style={{
                fontSize: 16,
                color: "red",
            }}
        />
    );

    const onSearch = (value) => console.log(value);

    // search input


    return (
        <div>
            <Header/>
            <div className="dacha_filter">
                <div className="container">

                    <div className="login_forms">
                        <Formik
                            initialValues={initialValues}
                            onSubmit={onSubmit}
                            validationSchema={validationSchema}
                        >
                            {
                                formik => {
                                    return <Form>
                                        <div className="row">

                                            <div className="col-12">
                                                <Search
                                                    placeholder={getText("dachapoisk")}
                                                    allowClear
                                                    enterButton={getText("lupa")}
                                                    size="large"
                                                    onSearch={onSearch}
                                                />
                                            </div>

                                            <div className="col-6 col-sm-2 mt-2">
                                                <label>{getText("sena")}</label>
                                                <Field
                                                    type="text"
                                                    id="name"
                                                    autoComplete="off"
                                                    className="form-control input1"
                                                    name="name"
                                                    placeholder={getText("sena1")}
                                                />
                                            </div>
                                            <div className="col-6 col-sm-2 mt-2">
                                                <label>.</label><br/>
                                                <Field
                                                    type="text"
                                                    id="name"
                                                    autoComplete="off"
                                                    className="form-control input1"
                                                    name="name"
                                                    placeholder={getText("sena2")}
                                                />
                                            </div>
                                            <div className="col-6 col-sm-4 mt-2">
                                                <label>{getText("gorod")}</label>

                                                <Field
                                                    type="text"
                                                    name="category_id"
                                                    as="select"
                                                    className="form-control input1"
                                                >
                                                    {
                                                        location?.map((item, index) => {
                                                            return (
                                                                <option value={item.id} key={index}>
                                                                    {getLanguage() === "ru" ? item.name_ru : item.name_uz}
                                                                </option>
                                                            )
                                                        })
                                                    }
                                                </Field>

                                            </div>
                                            <div className="col-6 col-sm-4 mt-2">
                                                <label>{getText("chislo")}</label>
                                                <Field
                                                    type="text"
                                                    id="name"
                                                    autoComplete="off"
                                                    className="form-control input1"
                                                    name="name"
                                                />
                                            </div>

                                            {comfort2?.map((item,index)=>{
                                                return(
                                                    <div className="col-sm-2 col-6 mt-3" key={index}>
                                                        <label className="checkk1">
                                                            <Field type="checkbox" name="comforts" className="checkk"/>
                                                            {getLanguage()==="ru" ? item.name_ru : item.name_uz}
                                                        </label><br/>
                                                    </div>
                                                )
                                            })}

                                        </div>
                                    </Form>
                                }
                            }

                        </Formik>
                    </div>


                </div>

                <div className="container p-0">
                    {
                        userFavourite?.map((item, index) => {
                            return (
                                <div className="row mt-4 izbrannoe" key={item.id}>
                                    <div className="col-12">
                                        <h1>{item.name}</h1>
                                    </div>

                                        <div className="col-sm-12 col-md-8 col-12 d-flex cardTwo mt-2">
                                            {/*<Link to="/countryhouse" className="text-decoration-none" onClick={()=>props.topTan.splice(0,1,item)}>*/}
                                            {/*    <div className="d-flex w-100">*/}
                                                    <div className="card w-50 border-right-0 cardTwo1">
                                                        <img src={BASE_URL + item.images[0].image_path}
                                                             className="card-img-top h-100"/>
                                                        {/*<img src={BASE_URL + item.image_path} className="w-100"/>*/}
                                                    </div>
                                                    <div className="card w-50 border-left-0 cardTwo2">
                                                        <div className="card-body">
                                                            <h3>{item.name}</h3>
                                                            <div>
                                                                <img src="./images/newImagesTwo/Vector (14).png"/>
                                                                <span>{item.room_count} {getText("komnat")}</span>
                                                            </div>
                                                            <div>
                                                                <img src="./images/newImagesTwo/Vector (15).png"/>
                                                                <span>{item.bathroom_count} {getText("danniy")}</span>
                                                            </div>
                                                            <div>
                                                                <img src="./images/newImagesTwo/Vector (16).png"/>
                                                                <span>{item.capacity} {getText("gost")}</span>
                                                            </div>
                                                            <div>
                                                                <img src="./images/newImagesTwo/Vector (17).png"/>
                                                                <span>{item.cost} {getText("sum")}</span>
                                                            </div>
                                                            <div className="mt-2">
                                                                <Link to="/countryhouse"
                                                                      className="text-secondary text-decoration-none"
                                                                      onClick={() => props.topTan.splice(0, 1, item)}
                                                                >
                                                                    {getText("podrobni")}</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                {/*</div>*/}
                                            {/*</Link>*/}
                                        </div>


                                    <div className="col-sm-12 col-md-4 col-12 mt-2">
                                        <div className="card cardddd">
                                            <div className="card-body">
                                                <h3>{item.cost} сум</h3>
                                                <span>{getText("izbranText")}<br/>{item.phone}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>
            <Footer/>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        izbran: state.dacha.izbran,
        topTan: state.dacha.topTan,
        ids_array: state.dacha.ids_array
    }

}
export default connect(mapStateToProps, {getIzbrannoe, updateState})(DachaFilterNewPage);


// export default DachaFilterNewPage;
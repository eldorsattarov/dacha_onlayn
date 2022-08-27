import React, {useEffect, useState} from 'react';
import Header from "../Header";
import {Link, useNavigate} from "react-router-dom";
import {API_PATH, BASE_URL, TOKEN_NAME_LOGIN, TOKEN_NAME_REGISTER} from "../../tools/constants";
import axios from "axios";
import {getIzbrannoe} from "../../redux/action/dachaAction";
import {updateState} from "../../images/loginAction";
import {connect} from "react-redux";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";
import {getText} from "../../locales";
import ImgCrop from "antd-img-crop";
import {Upload} from "antd";


toast.configure();

const ProfilRedaktor = (props) => {


    const navigate = useNavigate();


    // img qo'shish uchun
    const [fileList, setFileList] = useState(
        // props.userDachaEdit.length>0 ? props.userDachaEdit[0].images :
        []
    );


    const onChange = ({fileList: newFileList}) => {
        // props.userDachaEdit.length>0 ? fileList.push(props.userDachaEdit[0].images) :
        setFileList(newFileList);
    };
    console.log(fileList);

    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

// img qo'shish uchun


    // formik
    // const [token, setToken] = useState(null)

    const initialValues = {
        name: props.user.name,
        phone: props.user.phone,
        photo: "",
        _method: "put"
    }
    const validationSchema = Yup.object({
        name: Yup.string().required('название ...'),
        // phone: Yup.string().required('телефон ...'),
        phone: Yup.string()
            .matches(
                /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                "Номер телефона недействителен"
            )
            .min(12, "минимум 12 символов")
            .max(12, "Максимум 12 символов")
            .required('телефон...'),
        _method: Yup.string().required('method ...'),
    })
    const onSubmit = (values) => {
        const formData = new FormData();
        for (let i = 0; i < fileList.length; i++) {
            formData.append('photo', new Blob([fileList[i].originFileObj],
                // "images/png"
                {type: "application/octet-stream"}
            ))
        }
        formData.append('name', values.name)
        formData.append('phone', values.phone)
        formData.append('_method', "put")


        console.log(values)
        axios.post(API_PATH + "user-update", formData
            // {
            //     name: values.name,
            //     phone: values.phone,
            //     image_path: fileList,
            //     _method: "put"
            // }
            ,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(TOKEN_NAME_LOGIN)}`
                }
            },
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
    const exitProfile = () => {
        localStorage.removeItem(TOKEN_NAME_LOGIN);
        localStorage.removeItem(TOKEN_NAME_REGISTER);
        navigate("/");
        toast.warning("Выйти из профиля !");
    }
    // console.log(localStorage.getItem(TOKEN_NAME_REGISTER))
    // console.log(localStorage.getItem(TOKEN_NAME_LOGIN))

    return (
        <div>
            <Header/>
            <div className="profilRedactor">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="text-center w-100">
                                <h1 className="">
                                    <img src="./images/chiziq.png" className="lineImgg"/> {getText("redaktitle")} <img
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
                                            validationSchema={validationSchema}
                                        >
                                            {
                                                formik => {
                                                    return <Form>
                                                        <div className="login_page_inputs">
                                                            <div className="login_inputs_wrapper">
                                                                <div className="login_control">
                                                                    <label
                                                                        className="login_label">{getText("redakimya")}</label>
                                                                    <div className="login_input">
                                                                        <Field
                                                                            type="text"
                                                                            id="name"
                                                                            name="name"
                                                                            autoComplete="off"
                                                                            className="form-control"

                                                                        />
                                                                        <ErrorMessage name="name" component='div'
                                                                                      style={{color: 'red'}}
                                                                                      className="error"/>
                                                                    </div>
                                                                </div>
                                                                <div className="login_control mt-2">
                                                                    <label
                                                                        className="login_label">{getText("redaktel")}</label>
                                                                    <div className="parol_input">
                                                                        <Field
                                                                            type="phone"
                                                                            id="phone"
                                                                            name="phone"
                                                                            autoComplete="off"
                                                                            className="form-control"
                                                                        />
                                                                        <ErrorMessage name="phone" component='div'
                                                                                      style={{color: 'red'}}
                                                                                      className="error"/>

                                                                        <div className="mt-2">
                                                                            <label
                                                                                className="login_label">{getText("rasm")}</label>
                                                                            <ImgCrop rotate>
                                                                                <Upload
                                                                                    type="file"
                                                                                    action="https://api.dachaonline.uz/"
                                                                                    listType="picture-card"
                                                                                    fileList={fileList}
                                                                                    value={formik.values.photo}
                                                                                    required
                                                                                    onChange={onChange}
                                                                                    onPreview={onPreview}
                                                                                    name="photo"
                                                                                >
                                                                                    {fileList.length < 1 && `+ ${getText("upload")}`}
                                                                                </Upload>
                                                                            </ImgCrop>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>


                                                        <button
                                                            type='submit'
                                                            className="in_button mt-4"
                                                        >
                                                            {getText("reaksox")}
                                                        </button>
                                                    </Form>
                                                }
                                            }

                                        </Formik>

                                        <button type="button" className="btn exitButton mt-3"
                                                onClick={exitProfile}>{getText("redchiqish")}</button>
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
const mapStateToProps = (state) => {
    return {
        user: state.login.user
    }
}
export default connect(mapStateToProps, {getIzbrannoe, updateState})(ProfilRedaktor);

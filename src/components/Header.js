import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {login} from "../images/loginAction";
import {Form,Input,Label,Button} from "reactstrap";
import axios from "axios";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";

import {API_PATH, BASE_URL, LANGUAGE, TOKEN_NAME_LOGIN, TOKEN_NAME_REGISTER} from "../tools/constants";
import {getText, getLanguage} from "../locales";
import {wrapMapToPropsConstant} from "react-redux/lib/connect/wrapMapToProps";
import {toast,ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
const Header = (props) => {

        const changeLanguage = (e) => {
            console.log(e);
            // localStorage.setItem(LANGUAGE, e.target.value);
            localStorage.setItem(LANGUAGE, e);
            document.location.reload(true);
        }


    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const openModal = () => {
        setOpen(true)
    }
    const openToggle = () => {
        setOpen2(true);
    }


    // post
    const [formValue, setformValue] = React.useState({
        name: '',
        phone: '',
        description : ""
    });

    const handleChange = (event) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }
    const handleSubmit = async() => {
        // store the states in the form data
        const loginFormData = new FormData();
        loginFormData.append("name", formValue.name);
        loginFormData.append("phone", formValue.phone);
        loginFormData.append("description", formValue.description);
        try {
            // make axios post request
            const response = await axios({
                method: "post",
                url: API_PATH + "rent-dacha",
                data: loginFormData,
                headers: { "Content-Type": "multipart/form-data" },
            });
            formValue.phone = "";
            formValue.name = "";
            formValue.description = "";
            setOpen(!open);
            // toast.success(response.data.message);
            toast.success("Успешный");
        } catch(error) {
            // toast.error("Ошибка")
            toast.error("Ошибка, поле пустое")
            // console.log(error);
            // alert("error")
        }
    }
    ///////////////////////////

    return (
        <div className="navbar">
        {/*<div className={`${props.history.location.pathname==="/" ? "navbar backBlack" : "navbar"}`}>*/}
            <div className="container">

                <div className="row w-100 navXl">
                    <div className="col-12 d-flex justify-content-between align-items-center pr-0">
                        <div className="navbarLeft d-flex align-items-center">
                            {/*<Link to="/"><img src="./images/Group 1.png" className="navbar-brand"/></Link>*/}
                            {/*<Link to="/"><img src="./images/dacha logo.png" className="navbar-brand"/></Link>*/}
                            <Link to="/"><img src="./images/newImg/logoNeww.png" className="navbar-brand"/></Link>
                            <ul className="nav">
                                <li className="nav-item">
                                    {/*<a href="#" className="nav-link navlink">О нас</a>*/}
                                    <Link to="/about" className="nav-link navlink">{getText("onas")}</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/" className="nav-link navlink">{getText("glav")}</Link>
                                </li>
                                <li className="nav-item">
                                    {/*<Link to="/countryhouse" className="nav-link navlink">{getText("dachi")}</Link>*/}
                                    <Link to="/filter_dacha" className="nav-link navlink">{getText("dachi")}</Link>
                                </li>
                                {/*<li className="nav-item">*/}
                                {/*    <Link to="/favorite" className="nav-link navlink">{getText("izb")}</Link>*/}
                                {/*</li>*/}
                                {localStorage.getItem(TOKEN_NAME_LOGIN) ?
                                    <li className="nav-item"><Link to="/add_dacha" className="nav-link navlink">{getText("dovabit")}</Link></li>
                                : ""}
                            </ul>
                        </div>
                        <div className="navbarRight d-flex align-items-center">
                            {localStorage.getItem(TOKEN_NAME_LOGIN) ? <Link to="/profil" className="mr-3">
                                <img
                                    // src="./images/newImg/profill2.png"
                                    src={BASE_URL + props.user.photo}
                                    className="avatar_icon"
                                />
                            </Link> : ""}
                            <div className="mr-2">
                                <button type="button"  type="button" onClick={()=>changeLanguage('uz')} className="border-0 bg-transparent">
                                    <img src={"./images/uzbekistan 1.png"}
                                         className="mr-2"/>
                                </button>
                                <button type="button" onClick={()=>changeLanguage('ru')} className="border-0 bg-transparent">
                                    <img src={"./images/rus.png"}
                                         className="mr-2"/>
                                </button>
                            </div>
                            {/*<div className="d-flex align-items-center mr-3">*/}
                            {/*    <img src={getLanguage() === "ru" ? "./images/rus.png" : "./images/uzbekistan 1.png"}*/}
                            {/*         className="mr-2"/>*/}
                            {/*    <select className="border-0" onChange={changeLanguage}>*/}
                            {/*        <option value="ru" selected={getLanguage() === "ru"}>RU</option>*/}
                            {/*        <option value="uz" selected={getLanguage() === "uz"}>UZB</option>*/}
                            {/*    </select>*/}
                            {/*</div>*/}
                            {/*<button className="link" onClick={openModal}>{getText("sdatdacha")}</button>*/}

                           {localStorage.getItem(TOKEN_NAME_REGISTER)||localStorage.getItem(TOKEN_NAME_LOGIN) ? "" :
                               <Link to="/register" className="loginLink">{getText("registerr")}</Link>
                           }
                        </div>
                    </div>
                </div>


                <div className="row w-100 navSm">
                    <div className="col-12 d-flex justify-content-between align-items-center pr-0">
                        <div className="navbarLeft d-flex align-items-center">
                            <Link to="/"><img src="./images/Group 1.png" className="navbar-brand"/></Link>
                        </div>
                        <div className="navbarRight d-flex align-items-center">
                            <div className="mr-2">
                                {localStorage.getItem(TOKEN_NAME_LOGIN) ?
                                    <Link to="/profil" className="mr-3 rasssm">
                                    <img
                                        // src="./images/newImg/rassss.svg"
                                        src={BASE_URL + props.user.photo}
                                        className="avatar_icon"
                                    />
                                </Link>
                                    : ""}
                                <button type="button"  type="button" onClick={()=>changeLanguage('uz')} className="border-0 bg-transparent">
                                    <img src={"./images/uzbekistan 1.png"}
                                         className="mr-2"/>
                                </button>
                                <button type="button" onClick={()=>changeLanguage('ru')} className="border-0 bg-transparent">
                                    <img src={"./images/rus.png"}
                                         className="mr-2"/>
                                </button>
                            </div>
                            {/*<div className="d-flex align-items-center mr-3">*/}
                            {/*    <img src={getLanguage() === "ru" ? "./images/rus.png" : "./images/uzbekistan 1.png"}*/}
                            {/*         className="mr-2"/>*/}
                            {/*    <select className="border-0" onChange={changeLanguage}>*/}
                            {/*        <option value="ru" selected={getLanguage() === "ru"}>RU</option>*/}
                            {/*        <option value="uz" selected={getLanguage() === "uz"}>UZB</option>*/}
                            {/*    </select>*/}
                            {/*</div>*/}
                            <button type="button" className="btn pr-0 pl-0 "><img src="./images/Vecto.png" className="toggleButton pr-0" onClick={openToggle}/>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`${open2 === true ? "openToggle" : "openToggle d-none"}`}>
                    <div className="d-flex justify-content-end">
                        <img src="./images/Vectoras.png" className="mr-5" onClick={() => setOpen2(!open2)}/>
                    </div>
                    <ul className="nav flex-column text-center">
                        <li className="nav-item"><Link to="/about"
                                                       className="nav-link navlink">{getText("onas")}</Link>
                        </li>
                        <li className="nav-item"><Link to="/"
                                                       className="nav-link navlink">{getText("glav")}</Link>
                        </li>
                        <li className="nav-item"><Link to="/filter_dacha" className="nav-link navlink">{getText("dachi")}</Link></li>
                        {/*<li className="nav-item"><Link to="/countryhouse" className="nav-link navlink">{getText("dachi")}</Link></li>*/}


                        {/*<li className="nav-item"><Link to="/favorite"*/}
                        {/*                               className="nav-link navlink">{getText("izb")}</Link>*/}
                        {/*</li>*/}
                        {localStorage.getItem(TOKEN_NAME_LOGIN) ?
                            <li className="nav-item"><Link to="/add_dacha" className="nav-link navlink">{getText("dovabit")}</Link></li>
                        : ""}
                    </ul>
                    <div className="d-flex justify-content-center mt-3">
                        {localStorage.getItem(TOKEN_NAME_REGISTER)||localStorage.getItem(TOKEN_NAME_LOGIN) ? "" : <Link to="/register" className="loginLink">
                            {getText("registerr")}
                        </Link>}
                        {/*<button className="link" onClick={openModal}>{getText("sdatdacha")}</button>*/}
                    </div>
                </div>
                <Modal isOpen={open} toggle={() => setOpen(!open)} className="modal1"
                       style={{width: "", marginTop: "120px", marginLeft: "auto", marginRight: "auto"}}>
                    <div className="card border-0 rounded-0 modalcard">
                        <div className="card-body">
                            <h2 className="texta text-center mt-4">{getText("sdatdacha")}</h2>

                            {/*<Form className="mt-5"*/}
                            {/*      onSubmit={(event, errors, values) => {props.login(event, errors, values, props.history)}}>*/}
                            <form className="mt-5">
                                <input className="rounded-0 form-control mt-4" type="text" name="name" placeholder={getText("imya")}
                                         required errorMessage={getText("majburiy")}
                                       value={formValue.name} onChange={handleChange}/>
                                <input className="rounded-0 form-control mt-4" type="text" name="phone" placeholder={getText("tel")}
                                         required errorMessage={getText("majburiy")}
                                       value={formValue.phone}
                                       onChange={handleChange}/>
                                <textarea className="rounded-0 form-control mt-4" type="textarea" name="description"
                                          placeholder={getText("koment")} required errorMessage={getText("majburiy")}
                                          value={formValue.description}
                                          onChange={handleChange}/>
                                {/*<button type="submit" className="btn rounded-0 w-100 mt-4 mb-3">{getText("zvanok")}</button>*/}
                                <Button className="btn rounded-0 w-100 mt-4 mb-3" onClick={handleSubmit}>{getText("zvanok")}</Button>
                            </form>

                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
};
const mapStateToProps = (state) =>{
    return{
        user: state.login.user,
    }
}
export  default connect(mapStateToProps,{login})(Header);

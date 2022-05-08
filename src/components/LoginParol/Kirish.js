import React,{useEffect} from 'react';
import {getText} from "../../locales";
import Header from "../Header";
import {Link} from "react-router-dom";
import axios from "axios";
import {API_PATH, BASE_URL} from "../../tools/constants";
import {toast} from "react-toastify";
// import Header from
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
const Kirish = () => {

    useEffect(()=>{
        axios.get(API_PATH + "dacha")
            .then((res)=>{
                // console.log(res)
            })
    },[])


    const [formValue, setformValue] = React.useState({
        phone: '',
        password: ''
    });

    const handleChange = (event) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }
    const handleSubmit = async() => {
        const loginFormData = new FormData();
        loginFormData.append("phone", formValue.phone);
        loginFormData.append("password", formValue.password);
        try {
            // make axios post request
            const response = await axios({
                method: "post",
                url: API_PATH + "login",
                data: loginFormData,
                headers: { "Content-Type": "multipart/form-data" },
            });
            formValue.phone = "";
            formValue.password = "";
            toast.success("Успешный");
        } catch(error) {
            toast.error("Ошибка, поле пустое")
        }
    }

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

                        <div className="col-sm-4 col-8 offset-2 offset-sm-4">
                            <div className="card">
                                <div className="card-body">
                                    <form>
                                        <div className="">
                                            <label>Телефонный номер</label>
                                            <input type="text" className="form-control" name="phone"
                                                   value={formValue.phone}
                                                   onChange={handleChange}/>
                                        </div>
                                        <div className="mt-2">
                                            <label>Пароль</label>
                                            <input type="password" className="form-control" name="password"
                                                   value={formValue.password}
                                                   onChange={handleChange}/>
                                        </div>
                                        <div className="mt-3">
                                            <button type="submit" onClick={handleSubmit}>Войти</button>
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

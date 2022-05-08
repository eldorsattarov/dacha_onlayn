import React from 'react';
import Header from "../Header";
import {Link} from "react-router-dom";

const ProfilRedaktor = () => {
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
                                    <form>
                                        <div className="">
                                            <label>Полное имя</label>
                                            <input type="text" className="form-control" name="number"/>
                                        </div>
                                        <div className="mt-2">
                                            <label>Телефонный номер</label>
                                            <input type="password" className="form-control" name="password"/>
                                        </div>
                                        <div className="mt-2">
                                            <label>Изображение</label>
                                            <input type="file" className="form-control" name="password"/>
                                        </div>

                                        <div className="mt-3">
                                            <button type="button">Сохранять</button>
                                        </div>
                                        {/*<div className="w-100 text-center mt-2">*/}
                                        {/*    <Link to="/login" className="royxat">Войти в аккаунт</Link>*/}
                                        {/*</div>*/}
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

export default ProfilRedaktor;

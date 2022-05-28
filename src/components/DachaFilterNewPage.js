import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import {getText} from "../locales";
import * as Yup from "yup";
import axios from "axios";
import {API_PATH, TOKEN_NAME_LOGIN} from "../tools/constants";
import {toast} from "react-toastify";

const DachaFilterNewPage = () => {



    return (
        <div>
            <Header/>
          <div className="dacha_filter">
              <div className="container">

                  <form className="w-100">

                      <div className="row">
                          <div className="col-sm-10 col-8 mt-2">
                              <input type="text" className="form-control input1" name="" placeholder="Поиск дачи..."/>
                          </div>
                          <div className="col-sm-2 col-3  mt-2">
                              <button type="submit" className=""><img src="./images/newimg/Icon.png"/>Поиск</button>
                          </div>

                          <div className="col-6 col-sm-2 mt-2">
                              <label>Цена</label>
                              <input type="number" name="" className="form-control input1" placeholder="от"/>
                          </div>
                          <div className="col-6 col-sm-2 mt-2">
                              <label>.</label><br/>
                              <input type="number" name="" className="form-control input1" placeholder="до"/>

                          </div>
                          <div className="col-6 col-sm-4 mt-2">
                              <label>Город</label>
                              <select className="form-control input1">
                                  <option>Билдирсой</option>
                                  <option>Билдирсой</option>
                                  <option>Билдирсой</option>
                              </select>
                          </div>
                          <div className="col-6 col-sm-4 mt-2">
                              <label>Число людей</label>
                              <input type="text" className="form-control input1" name=""/>
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



                      </div>

                  </form>


              </div>
          </div>
            <Footer/>
        </div>
    );
};

export default DachaFilterNewPage;
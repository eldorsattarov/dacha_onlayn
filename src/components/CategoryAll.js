import React, {useEffect, useState} from 'react';
import Header2 from "./Header2";
import Footer2 from "./Footer2";
import {Link} from "react-router-dom";
import {API_PATH, BASE_URL} from "../tools/constants";
import {getLanguage} from "../locales";
import {connect} from "react-redux";
import {getCategory, updateState} from "../redux/action/categoryAction";
import Header from "./Header";
import axios from "axios";
const CategoryAll = (props) => {
    useEffect(()=>{
        props.getCategory();
        window.scrollTo(0,0);
    },[]);

    const [categorye , setCategorye] = useState([]);
    useEffect(()=>{
        axios.get(API_PATH + "category")
            .then((res) => {
                // dispatch(updateState({category: res.data.data}));
                setCategorye(res.data.data);
            })
    },[])

    return (
        <div>
            <Header/>

            <div className="categoryAll">
                <div className="container">
                    <div className="row">
                        {/*{props.category.map((item,index)=>{*/}
                         {categorye.map((item,index)=>{
                                return(
                                    <div className="col-sm-6 col-md-4 col-6 mt-4">
                                        <Link to="/inner_page"
                                              onClick={()=>props.cat.splice(0,1,item)}>
                                            <div className="card border-0">
                                                <img src={BASE_URL + item.image_path} className="w-100 twoImg"/>
                                                <div className="card-img-overlay">
                                                    <span className="">{getLanguage()==="ru" ? item.name_ru : item.name_uz}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            // }
                        })}
                    </div>
                </div>
            </div>

            <Footer2/>
        </div>
    );
};
const mapStateToProps = (state) =>{
    return{
        category : state.category.category,
        cat : state.category.cat
    }
}
export default connect(mapStateToProps,{getCategory,updateState})(CategoryAll);

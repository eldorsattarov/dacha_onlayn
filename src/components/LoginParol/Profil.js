import React, {useEffect, useState} from 'react';
import Header from "../Header";
import {Link} from "react-router-dom";
import Izbronnoe from "../Izbronnoe";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {connect} from "react-redux";
import {getIzbrannoe} from "../../redux/action/dachaAction";
import {updateState} from "../../images/loginAction";
import axios from "axios";
import {API_PATH, BASE_URL, TOKEN_NAME_LOGIN} from "../../tools/constants";
import "bootstrap/dist/css/bootstrap-grid.css";
import {getLanguage, getText} from "../../locales";

const Profil = (props) => {
    const [userDacha , setUserDacha] = useState([]);
    useEffect(()=>{
        axios.get(API_PATH + "user/dacha" , {headers: {
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_NAME_LOGIN)}`
            }})
            .then((res)=>{
                // console.log("userDacha " , res.data.data.data)
                setUserDacha(res.data?.data.data)
            })
    },[])

    // const [user ,  setUser] = useState([]);
    useEffect(()=>{
        if (localStorage.getItem(TOKEN_NAME_LOGIN)) {
            axios.get(API_PATH + "user", {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(TOKEN_NAME_LOGIN)}`
                }
            })
                .then(res => {
                    // console.log(res)
                    props.updateState({user : res.data})
                    // setUser(res.data)
                })
                .catch(err => {
                    // console.log(err)
                })
        }
    },[]);

    const [userFavourite , setUserFavourite] = useState([]);

    useEffect(()=>{
        axios.get(API_PATH + "favourite-list" , {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_NAME_LOGIN)}`
            }
        })
            .then((res)=>{
                setUserFavourite(res.data?.dacha)
                console.log(res.data.dacha)
            })
    },[]);

    const [dacha , setDacha] = useState([]);
    useEffect(()=>{
        axios.get(API_PATH + "dacha")
            .then((res)=>{
                console.log(res.data.data.data)
            })
    },[])

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Header/>
            <div className="profil">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <img src="./images/newImg/profilll.png" className="profImg"/>
                            <h1 className="">{props.user.name}</h1>
                            <Link to="/profil_redactor" className="profLink">{getText("protitle")}</Link>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-12 mt-4">
                            <Box sx={{ width: '100%', typography: 'body1' }}>
                                <TabContext value={value}>
                                    <Box sx={{ }}>
                                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                                            <Tab className="label salom" label={getText("profmoy")} value="1" />
                                            <Tab className="label salom" label={getText("profizb")} value="2" />
                                        </TabList>
                                    </Box>
                                    <TabPanel value="1">
                                        <div className="row">
                                            {userDacha?.map((item , index)=>{
                                                return(
                                                    <div className="col-sm-6 col-md-4 col-6 mt-3">
                                                        <Link to="/countryhouse" className="text-decoration-none"
                                                            // onClick={()=>props.topTan.splice(0,1,item)}>
                                                              onClick={()=>props.topTan.splice(0,1,item)}>
                                                            <div className="card">
                                                                <div className="cardimgg">
                                                                    <div className="cardimgg2"></div>
                                                                    {/*<img src="./images/image1.jpg" className="card-img-top"/>*/}
                                                                    <img src={BASE_URL + item.images[0]?.image_path} className="card-img-top"/>
                                                                </div>
                                                                <div className="card-img-overlay">
                                                                    <div className="summm">
                                                                        {/*<img src="./images/Vector (18).png"/>*/}
                                                                        {/*<span className="summ">{item.cost} {getText("sum")}</span>*/}
                                                                    </div>
                                                                </div>
                                                                <div className="card-body">
                                                                    {/*<h3>{getLanguage() === "ru" ? item.name_ru : item.name_uz}</h3>*/}
                                                                    <h3>{item.name}</h3>
                                                                    <div>
                                                                        <img src="./images/newImagesTwo/Vector (14).png"/>
                                                                        <span>{item.room_count} {getText("komnat")}</span>
                                                                        {/*<span>sasas</span>*/}
                                                                    </div>
                                                                    <div>
                                                                        <img src="./images/newImagesTwo/Vector (15).png"/>
                                                                        <span>{item.bathroom_count} {getText("danniy")}</span>
                                                                        {/*<span>sasasas</span>*/}
                                                                    </div>
                                                                    <div>
                                                                        <img src="./images/newImagesTwo/Vector (16).png"/>
                                                                        <span>{item.capacity} {getText("gost")}</span>
                                                                        {/*<span>saacasc</span>*/}
                                                                    </div>
                                                                    <div>
                                                                        <img src="./images/newImagesTwo/Vector (17).png"/>
                                                                        <span>{item.cost} {getText("sum")}</span>
                                                                        {/*<span>saasxasxas</span>*/}
                                                                    </div>
                                                                    <div className="mt-2">
                                                                        <Link to="/countryhouse" className="text-secondary text-decoration-none">{getText("podrobni")}</Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )
                                            })}


                                        </div>
                                    </TabPanel>
                                    <TabPanel value="2">
                                        <div className="row">
                                            {userFavourite?.map((item , index)=>{
                                                return(
                                                    <div className="col-sm-6 col-md-4 col-6 mt-3">
                                                        <Link to="/countryhouse" className="text-decoration-none"
                                                            // onClick={()=>props.topTan.splice(0,1,item)}>
                                                              onClick={()=>props.topTan.splice(0,1,item)}
                                                        >
                                                            <div className="card">
                                                                <div className="cardimgg">
                                                                    <div className="cardimgg2"></div>
                                                                    {/*<img src="./images/image1.jpg" className="card-img-top"/>*/}
                                                                    <img src={item.images? BASE_URL + item.images[0]?.image_path : ""} className="card-img-top"/>
                                                                </div>
                                                                <div className="card-img-overlay">
                                                                    <div className="summm">
                                                                        {/*<img src="./images/Vector (18).png"/>*/}
                                                                        {/*<span className="summ">{item.cost} {getText("sum")}</span>*/}
                                                                    </div>
                                                                </div>
                                                                <div className="card-body">
                                                                    {/*<h3>{getLanguage() === "ru" ? item.name_ru : item.name_uz}</h3>*/}
                                                                    <h3>{item.name}</h3>
                                                                    <div>
                                                                        <img src="./images/newImagesTwo/Vector (14).png"/>
                                                                        <span>{item.room_count} {getText("komnat")}</span>
                                                                        {/*<span>sasas</span>*/}
                                                                    </div>
                                                                    <div>
                                                                        <img src="./images/newImagesTwo/Vector (15).png"/>
                                                                        <span>{item.bathroom_count} {getText("danniy")}</span>
                                                                        {/*<span>sasasas</span>*/}
                                                                    </div>
                                                                    <div>
                                                                        <img src="./images/newImagesTwo/Vector (16).png"/>
                                                                        <span>{item.capacity} {getText("gost")}</span>
                                                                        {/*<span>saacasc</span>*/}
                                                                    </div>
                                                                    <div>
                                                                        <img src="./images/newImagesTwo/Vector (17).png"/>
                                                                        <span>{item.cost} {getText("sum")}</span>
                                                                        {/*<span>saasxasxas</span>*/}
                                                                    </div>
                                                                    <div className="mt-2">
                                                                        <Link to="/countryhouse" className="text-secondary text-decoration-none">{getText("podrobni")}</Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )
                                            })}


                                        </div>
                                    </TabPanel>
                                </TabContext>
                            </Box>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
const mapStateToProps = (state) =>{
    return{
        user : state.login.user,
        dacha :state.dacha.dacha,
        topTan: state.dacha.topTan
    }
}
export default connect(mapStateToProps,{getIzbrannoe,updateState})(Profil);

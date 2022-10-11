import React, {useEffect, useState} from 'react';
import Header from "../Header";
import {Link, useNavigate} from "react-router-dom";
import Izbronnoe from "../Izbronnoe";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {connect} from "react-redux";
import {getIzbrannoe} from "../../redux/action/dachaAction";
import {updateState} from "../../images/loginAction";
// import {updateState} from "../../redux/action/dachaAction";
import axios from "axios";
import {API_PATH, BASE_URL, TOKEN_NAME_LOGIN} from "../../tools/constants";
import "bootstrap/dist/css/bootstrap-grid.css";
import {getLanguage, getText} from "../../locales";
import {Modal} from "reactstrap";
import Click from "../../images/clickog.png";
import Payme from "../../images/ass.jpg";
import Apelsin from "../../images/Apelsin_02.png";
import {toast} from "react-toastify";

const Profil = (props) => {
    const navigate = useNavigate()

    const [userDacha, setUserDacha] = useState([]);
    useEffect(() => {
        axios.get(API_PATH + "user/dacha", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_NAME_LOGIN)}`
            }
        })
            .then((res) => {
                // console.log("userDacha " , res.data.data.data)
                setUserDacha(res.data?.data.data)
            })
    }, []);

    // const [user ,  setUser] = useState([]);
    useEffect(() => {
        if (localStorage.getItem(TOKEN_NAME_LOGIN)) {
            axios.get(API_PATH + "user", {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(TOKEN_NAME_LOGIN)}`
                }
            })
                .then(res => {
                    console.log(res)
                    props.updateState({user: res.data})
                    // setUser(res.data)
                })
                .catch(err => {
                    // console.log(err)
                })
        }
    }, []);

    // edit function
    const userDachaEdit = (item) => {
        // props.updateState({userDachaEdit:item});
        // props.userDachaEdit.push(item);
        props.userDachaEdit.splice(0, 1, item)

        navigate("/add_dacha")
    }
// edit function

    // delete function
    const [pay, setPay] = useState(false);
    const [dachaId, setDachaId] = useState(null);
    const deleteModal = (item) => {
        setPay(!pay);
        setDachaId(item.id);
    }

    const deleteDacha = () => {
        console.log(dachaId);
        axios.post(API_PATH + `user/dacha/delete/${dachaId}`, {_method: 'delete'}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_NAME_LOGIN)}`
            }
        })
            .then((res) => {
                toast.success("Удалено !");
                setPay(!pay);
                axios.get(API_PATH + "user/dacha", {
                    headers: {
                        'Authorization': `Bearer    ${localStorage.getItem(TOKEN_NAME_LOGIN)}`
                    }
                })
                    .then((res) => {
                        // console.log("userDacha " , res.data.data.data)
                        setUserDacha(res.data?.data.data)
                    })
            })
            .catch(err => {
                console.log(err);
                toast.error("Ошибка ?");
            })
    }
    // delete function

    const [userFavourite, setUserFavourite] = useState([]);

    useEffect(() => {
        axios.get(API_PATH + "favourite-list", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_NAME_LOGIN)}`
            }
        })
            .then((res) => {
                setUserFavourite(res.data?.dacha)
                console.log(res.data.dacha)
            })
    }, []);

    const [dacha, setDacha] = useState([]);
    useEffect(() => {
        axios.get(API_PATH + "dacha")
            .then((res) => {
                console.log(res.data.data.data)
            })
    }, [])

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    useEffect(() => {
        axios.get(API_PATH + "category")
            .then((res) => {
                // setLocation(res?.data.data);
                props.loca.splice(0,1,res.data.data[0]);
            })
    }, []);


    return (
        <div>
            <Header/>
            <div className="profil">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <img
                                // src="./images/newImg/profilll.png"
                                src={BASE_URL + props.user.photo}
                                 className="profImg"/>
                            <h1 className="">{props.user?.name}</h1>
                            <Link to="/profil_redactor" className="profLink">{getText("protitle")}</Link>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-12 mt-4">
                            <Box sx={{width: '100%', typography: 'body1'}}>
                                <TabContext value={value}>
                                    <Box sx={{}}>
                                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                                            <Tab className="label salom tabss" label={getText("profmoy")} value="1"/>
                                            <Tab className="label salom tabss" label={getText("profizb")} value="2"/>
                                        </TabList>
                                    </Box>
                                    <TabPanel value="1">
                                        <div className="row">
                                            {userDacha?.map((item, index) => {
                                                return (
                                                    <div className="col-sm-6 col-md-4 col-6 mt-3">
                                                        {/*<Link to="/countryhouse" className="text-decoration-none"*/}
                                                        {/*      onClick={()=>props.topTan.splice(0,1,item)}>*/}
                                                        <div className="card">
                                                            <div className="cardimgg">
                                                                <div className="cardimgg2"></div>
                                                                {/*<img src="./images/image1.jpg" className="card-img-top"/>*/}
                                                                <img src={BASE_URL + item.images[0]?.image_path}
                                                                     className="card-img-top"/>
                                                            </div>
                                                            <div className="card-img-overlayy">
                                                                <div className="summm">
                                                                    <button type="button" className=""
                                                                            onClick={() => userDachaEdit(item)}
                                                                    >{getText("dachaEdit")}</button>
                                                                    <button type="button" className=""
                                                                            onClick={() => deleteModal(item)}>{getText("dachaDelete")}</button>
                                                                </div>
                                                            </div>
                                                            <div className="card-body">
                                                                {/*<h3>{getLanguage() === "ru" ? item.name_ru : item.name_uz}</h3>*/}
                                                                <h3>{item.name}</h3>
                                                                <div className="d-flex align-items-center">
                                                                    <div className="icon_imgades">
                                                                        <img className="icon_imgage" src="./images/newImagesTwo/Vector (14).png"/>
                                                                    </div>
                                                                    <span>{item.room_count} {getText("komnat")}</span>
                                                                </div>
                                                                <div className="d-flex align-items-center">
                                                                    <div className="icon_imgades">
                                                                        <img className="icon_imgage" src="./images/newImagesTwo/Vector (15).png"/>
                                                                    </div>
                                                                    <span>{item.bathroom_count} {getText("danniy")}</span>
                                                                </div>
                                                                <div className="d-flex align-items-center">
                                                                    <div className="icon_imgades">
                                                                        <img className="icon_imgage" src="./images/newImagesTwo/Vector (16).png"/>
                                                                    </div>
                                                                    <span>{item.capacity} {getText("gost")}</span>
                                                                </div>
                                                                <div className="d-flex align-items-center">
                                                                    <div className="icon_imgades">
                                                                        <img className="icon_imgage" src="./images/newImagesTwo/Vector (17).png"/>
                                                                    </div>
                                                                    <span>{item.cost} {getText("sum")}</span>
                                                                </div>
                                                                <div className="mt-2">
                                                                    <Link
                                                                        to="/countryhouse"
                                                                        className="text-secondary text-decoration-none profilButtonLink"
                                                                        onClick={() => props.topTan.splice(0, 1, item)}
                                                                    >
                                                                        {getText("podrobni")}
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/*</Link>*/}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </TabPanel>
                                    <TabPanel value="2">
                                        <div className="row">
                                            {userFavourite?.map((item, index) => {
                                                return (
                                                    <div className="col-sm-6 col-md-4 col-6 mt-3">
                                                        <Link to="/countryhouse" className="text-decoration-none"
                                                            // onClick={()=>props.topTan.splice(0,1,item)}>
                                                              onClick={() => props.topTan.splice(0, 1, item)}
                                                        >
                                                            <div className="card">
                                                                <div className="cardimgg">
                                                                    <div className="cardimgg2"></div>
                                                                    {/*<img src="./images/image1.jpg" className="card-img-top"/>*/}
                                                                    <img
                                                                        src={item.images ? BASE_URL + item.images[0]?.image_path : ""}
                                                                        className="card-img-top"/>
                                                                </div>
                                                                <div className="card-img-overlay">
                                                                    <div className="summm">
                                                                        {/*<button type="button" className="btn">{getText("dachaEdit")}</button>*/}
                                                                        {/*<button type="button" className="btn" onClick={()=>deleteDachaFavourite(item.id)}>{getText("dachaDelete")}</button>*/}
                                                                        {/*<img src="./images/Vector (18).png"/>*/}
                                                                        {/*<span className="summ">{item.cost} {getText("sum")}</span>*/}
                                                                    </div>
                                                                </div>
                                                                <div className="card-body">
                                                                    {/*<h3>{getLanguage() === "ru" ? item.name_ru : item.name_uz}</h3>*/}
                                                                    <h3>{item.name}</h3>
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="icon_imgades">
                                                                            <img className="icon_imgage" src="./images/newImagesTwo/Vector (14).png"/>
                                                                        </div>
                                                                        <span>{item.room_count} {getText("komnat")}</span>
                                                                    </div>
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="icon_imgades">
                                                                            <img className="icon_imgage" src="./images/newImagesTwo/Vector (15).png"/>
                                                                        </div>
                                                                        <span>{item.bathroom_count} {getText("danniy")}</span>
                                                                    </div>
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="icon_imgades">
                                                                            <img className="icon_imgage" src="./images/newImagesTwo/Vector (16).png"/>
                                                                        </div>
                                                                        <span>{item.capacity} {getText("gost")}</span>
                                                                    </div>
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="icon_imgades">
                                                                            <img className="icon_imgage" src="./images/newImagesTwo/Vector (17).png"/>
                                                                        </div>
                                                                        <span>{item.cost} {getText("sum")}</span>
                                                                    </div>
                                                                    <div className="mt-2">
                                                                        <Link to="/countryhouse"
                                                                              className="text-secondary text-decoration-none">{getText("podrobni")}</Link>
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

                <Modal isOpen={pay} toggle={() => setPay(!pay)} className="payModal1">
                    <div className="payModal p-4" style={{borderRadius: "50px"}}>
                        <div className="title">
                            <h2 style={{fontFamily: "Manrope", color: "#F2931F"}}>{getText("dachaDelete")} ?</h2>
                        </div>
                        <div className="imgs d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center justify-content-center"
                                 style={{
                                     width: "100px",
                                     height: "60px",
                                     // border: "2px solid #E8E8E8",
                                     borderRadius: "10px"
                                 }}>
                                <button type="button" className="modalbuttonOk"
                                        onClick={deleteDacha}>{getText("xa")}</button>
                            </div>
                            <div className="d-flex align-items-center justify-content-center"
                                 style={{
                                     width: "100px",
                                     height: "60px",
                                     // border: "2px solid #E8E8E8",
                                     borderRadius: "10px"
                                 }}>
                                <button type="button" className="modalbuttonRed"
                                        onClick={() => setPay(!pay)}>{getText("yoq")}</button>
                            </div>
                        </div>
                    </div>
                </Modal>


            </div>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        user: state.login.user,
        dacha: state.dacha.dacha,
        topTan: state.dacha.topTan,
        userDachaEdit: state.dacha.userDachaEdit,
        loca: state.dacha.loca,

    }
}
export default connect(mapStateToProps, {getIzbrannoe, updateState})(Profil);

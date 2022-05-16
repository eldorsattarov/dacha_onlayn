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
import {updateState} from "../../redux/action/loginAction";
import axios from "axios";
import {API_PATH, TOKEN_NAME_LOGIN} from "../../tools/constants";

const Profil = (props) => {

    // const [user ,  setUser] = useState([]);
    useEffect(()=>{
        // props.getIzbrannoe();
        if (localStorage.getItem(TOKEN_NAME_LOGIN)) {
            axios.get(API_PATH + "user", {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem(TOKEN_NAME_LOGIN)}`
                }
            })
                .then(res => {
                    console.log(res)
                    props.updateState({user : res.data})
                    // setUser(res.data)
                })
                .catch(err => {
                    // console.log(err)
                })
        }
    },[]);

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
                            <Link to="/profil_redactor" className="profLink">Редактировать профиль</Link>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-12 mt-4">
                            <Box sx={{ width: '100%', typography: 'body1' }}>
                                <TabContext value={value}>
                                    <Box sx={{ }}>
                                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                                            <Tab className="label" label="Мои объявления" value="1" />
                                            <Tab className="label" label="Избранное" value="2" />
                                        </TabList>
                                    </Box>
                                    <TabPanel value="1">Мои объявления</TabPanel>
                                    <TabPanel value="2">
                                        Избранное
                                        {/*<Izbronnoe/>*/}
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
        user : state.login.user
    }
}
export default connect(mapStateToProps,{getIzbrannoe,updateState})(Profil);

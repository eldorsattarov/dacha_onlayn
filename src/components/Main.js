import React from 'react';
import Header from "./Header";
import HomePage1 from "./HomePage1";
import Footer from "./Footer";
import TopDacha from "./TopDacha";
import DrugiDacha from "./DrugiDacha";
import Klient from "./Klient";
import DachaBalance from "./DachaBalance";
import MobilIlovalari from "./MobilIlovalari";
const Main = () => {
    return (
        <div className="">
            <HomePage1/>
            <TopDacha/>
            <DachaBalance/>
            <DrugiDacha/>
<MobilIlovalari/>
            {/*<Klient/>*/}
            <Footer/>
        </div>
    );
};

export default Main;

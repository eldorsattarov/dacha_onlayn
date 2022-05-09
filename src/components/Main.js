import React from 'react';
import Header from "./Header";
import HomePage1 from "./HomePage1";
import Footer from "./Footer";
import TopDacha from "./TopDacha";
import DrugiDacha from "./DrugiDacha";
import Klient from "./Klient";
import DachaBalance from "./DachaBalance";

const Main = () => {
    return (
        <div className="">
            <HomePage1/>
            <TopDacha/>
            <DachaBalance/>
            <DrugiDacha/>
            <Klient/>
            <Footer/>
        </div>
    );
};

export default Main;

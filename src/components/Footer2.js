import React from 'react';
import {getText,getLanguage} from "../locales";

const Footer2 = () => {
    return (
        <div className="footer2">
            <div className="footerBottom text-center">
                <a href="#">{getText("footerBottom")}</a>
            </div>
        </div>
    );
};

export default Footer2;

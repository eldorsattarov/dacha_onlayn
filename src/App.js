
import React from "react";
import {Route,Routes} from "react-router-dom";
import Main from "./components/Main";
import Onas from "./components/Onas";
import Izbronnoe from "./components/Izbronnoe";
import Dacha from "./components/Dacha";
import ExampleCarousel from "./components/ExampleCarousel";
import Usloviya from "./components/Usloviya";
import Stat from "./components/Stat";
import DrugiDacha from "./components/DrugiDacha";
import DrugiDachaAll from "./components/DrugiDachaAll";
import VnutriStranitsa from "./components/VnutriStranitsa";
import CategoryAll from "./components/CategoryAll";
import Dovabit from "./components/Dovabit";
import RoyxatdanOtish from "./components/LoginParol/RoyxatdanOtish";
import Kirish from "./components/LoginParol/Kirish";
import Profil from "./components/LoginParol/Profil";
import ProfilRedaktor from "./components/LoginParol/ProfilRedaktor";
import DachaFilterNewPage from "./components/DachaFilterNewPage";

function App(props) {
    return (
        <div className="">
            <Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/about" element={<Onas/>}/>
                <Route path="/conditions" element={<Usloviya/>}/>
                <Route path="/partner" element={<Stat/>}/>
                <Route path="/favorite" element={<Izbronnoe/>}/>
                <Route path="/countryhouse" element={<Dacha/>}/>
                <Route path="/examp" element={<ExampleCarousel/>}/>
                <Route path="/dachaall" element={<DrugiDachaAll/>}/>
                <Route path="/inner_page" element={<VnutriStranitsa/>}/>
                <Route path="/category_all" element={<CategoryAll/>}/>

                {/*newwssss*/}

                <Route path="/add_dacha" element={<Dovabit/>}/>
                <Route path="/register" element={<RoyxatdanOtish/>}/>
                <Route path="/login" element={<Kirish/>}/>
                <Route path="/profil" element={<Profil/>}/>
                <Route path="/profil_redactor" element={<ProfilRedaktor/>}/>


                <Route path="/filter_dacha" element={<DachaFilterNewPage/>}/>
            </Routes>
            </div>
    )
}
export default App;

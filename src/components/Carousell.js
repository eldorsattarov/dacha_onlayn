import React, {useEffect} from 'react'
import styled from 'styled-components'
import Slider from "react-slick"
import {connect} from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {Link} from "react-router-dom";
import {BASE_URL} from "../tools/constants";
import {getText} from "../locales";
import {getTopdacha, updateState} from "../redux/action/dachaAction";

function SimpleSlider(props) {
    useEffect(() => {

    }, []);
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "#BDBDBD", borderRadius: "50%", position: "absolute", top: "-31px", right: "0" }}
                onClick={onClick}
            />
        );
    }
    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "#BDBDBD", borderRadius: "50%", position: "absolute", top: "-31px", left: "1000px" }}
                onClick={onClick}
            />
        );
    }
    function Responsive(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "none"}}
                onClick={onClick}
            />
        );
    }
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    nextArrow: <Responsive/>,
                    prevArrow: <Responsive/>
                }
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                    nextArrow: <Responsive/>,
                    prevArrow: <Responsive/>
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    nextArrow: <Responsive/>,
                    prevArrow: <Responsive/>
                }
            }
        ]
    };

    console.log(props.topDacha1);

    return (
        <div className="container">
            <StyledCarousel>
                <Slider {...settings}>

                    {props.topDacha1.map((item, index) => {
                        return(
                            <div className="p-3 mt-3" key={item.id}>
                                <Link to="/countryhouse" className="text-decoration-none px-2"
                                      onClick={() => props.topTan.splice(0, 1, item)}>
                                    {/*onClick={()=>{props.updateState({topTan:item})}}>*/}
                                    <div className="card">
                                        <div className="cardimgg">
                                            {/*<div className="cardimgg2"></div>*/}
                                            <img src={BASE_URL + item.images[0].image_path}
                                                 className="card-img-top"/>
                                        </div>

                                        <div className="card-img-overlay">
                                            <div className="summm">
                                                {
                                                    item?.top_rated == 1 ?
                                                        <button type="button" className="bbb">Top</button>
                                                        : ""
                                                }
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            {/*<h3>{getLanguage() === "ru" ? item.name_ru : item.name_uz}</h3>*/}
                                            <h3>{item.name}</h3>
                                            <div className="d-flex align-items-center">
                                                <div><img src="./images/newImagesTwo/Vector (14).png"/></div>
                                                <span className="ml-3">{item.room_count} {getText("komnat")}</span>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <img src="./images/newImagesTwo/Vector (15).png"/>
                                                <span className="ml-3">{item.bathroom_count} {getText("danniy")}</span>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <img src="./images/newImagesTwo/Vector (16).png"/>
                                                <span>{item.capacity} {getText("gost")}</span>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <img src="./images/newImagesTwo/Vector (17).png"/>
                                                <span className="ml-3">{item.cost} {getText("sum")}</span>
                                            </div>
                                            <div className="mt-2">
                                                <Link to="/countryhouse"
                                                      className="text-secondary text-decoration-none">
                                                    {getText("podrobni")}</Link>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}

                </Slider>
            </StyledCarousel>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        topDacha: state.dacha.topDacha,
        topTan: state.dacha.topTan,
        locale: state.dacha.locale
    }
};

export default connect(mapStateToProps, {updateState, getTopdacha})(SimpleSlider);



const StyledCarousel = styled.div`
    
.item {
  background-color: #f7f3ea;
  border-radius: 30px;
  height: 450px;
  margin: 50px 10px;
  padding: 16px 10px;

  .top {
    display: flex;
    align-items: center;
    gap: 10px;

    h3 {
      font-weight: 900;
      font-size: 14px;
      line-height: 13px;
      color: #333333;
    }

    .image {
      width: 50px;
      height: 50px;

      img {
        width: 100%;
        border-radius: 50%;
      }
    }
  }

  .bottom {
    h3 {
      font-weight: 700;
      font-size: 18px;
      line-height: 20px;
      color: #b08c2b;
      margin-top: 16px;
    }

    p {
      font-size: 16px;
      line-height: 24px;
      margin-top: 20px;
    }
  }
}
`
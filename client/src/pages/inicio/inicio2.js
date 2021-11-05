import React, { Component } from 'react'
import './inicio2.scss' 
import Slider from "react-slick";
import { connect } from 'react-redux';
import axios from 'axios';
class Inicio2 extends Component {
    constructor(props){
        super(props)
        this.state = {
            sliders:[{
                alt: "Slider-5",
                id: 5
                ,imageDesk: "/images/863822411-istockphoto-1204610564-1024x1024.jpg"
                ,imageMobile: "/images/92000368-754606.jpg"
                ,title: "Slider-5"
                ,type: "slider-main"
            }],
            settings:{
                dots: true,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows:false,
                autoplay: false,
                speed: 400,
                autoplaySpeed: 4000,
                cssEase: "linear"
            },
        }
    }
    componentDidMount(){
        axios.get('/api/get-slider-main').then(this.getSliderMain)
    }
    getSliderMain =(response)=>{
        console.log(response.data)
        this.setState({sliders:response.data})
    }
    render() {
        return (
            <section className='inicio2'>
                <div className='content-categories-landing container'>
                    <div className='all-categories d-flex flex-column'>
                        <div className='btn-category b-primary c-white d-flex align-center btn-padding'>
                            Categorias
                        </div>
                        <div className='content-btn-category'>
                            <div className='btn-category  d-flex align-center btn-padding'>
                                Video juegos
                            </div>
                        </div>
                    </div>
                    <div className='content-slider-inicio d-grid '>
                        {
                            this.state.sliders.map((item,index)=>{
                                return(
                                <div className='content-img' >
                                    <img className='img' src={item.imageDesk} ></img>
                                </div>
                                )
                            })
                        }
                       
                        
                        {/* <Slider {...this.state.settings}>
                            {
                                this.props.value.slider.map((item,index)=>{
                                    return(
                                        <div className='content-img' key={'sliderMain-'+index}>
                                            <img className='' src={item.img} ></img>
                                        </div>
                                    )
                                })
                            }
                        </Slider> */}
                    </div>
                </div>
            </section>
        )
    }
}
const mapStateProps = (state)=>{
    return({
        value: state.sliderMain,
    })
}
export default connect(mapStateProps,null)(Inicio2)
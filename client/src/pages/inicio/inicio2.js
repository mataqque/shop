import React, { Component } from 'react'
import './inicio2.scss' 
import Slider from "react-slick";
import { connect } from 'react-redux';
import { increment } from '../../data/components/counter';
class Inicio2 extends Component {
    constructor(props){
        super(props)
        console.log(this.props)
        this.state = {
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
                        <div className='content-img'>
                            <img className='img' src={require('../../assets/images/inicio/slider/slider-1.png').default} ></img>
                        </div>
                        <div className='content-img'>
                            <img className='img' src={require('../../assets/images/inicio/slider/slider-1.png').default} ></img>
                        </div>
                        <div className='content-img'>
                            <img className='img' src={require('../../assets/images/inicio/slider/slider-1.png').default} ></img>
                        </div>
                        <div className='content-img'>
                            <img className='img' src={require('../../assets/images/inicio/slider/slider-1.png').default} ></img>
                        </div>
                        
                        
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
                <div className='--load d-flex'>
                    <div className='radius b-primary c-white px-1 pointer' onClick={()=>{this.props.increment()}}>
                        CHANGE AGE
                    </div>
                    <div className='radius b-primary c-white px-1 '>
                        EDAD {this.props.user.age}
                    </div>
                    <div className='radius b-primary c-white px-1 '>
                        COUNT {this.props.count.count}
                    </div>
                </div>
            </section>
        )
    }
}
const mapStateProps = (state)=>{
    return({
        value: state.sliderMain,
        user:state.user,
        count:state.counter
    })
}
export default connect(mapStateProps,{increment})(Inicio2)
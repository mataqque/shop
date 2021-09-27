import React, { Component } from 'react'
import './inicio.scss'
import Slider from "react-slick";
import Footer from '../../component/footer/footer';
import Card from '../../component/card/card';
import CardSlider from '../../component/card/cardSlider';
export default class Inicio extends Component {
    constructor(props){
        super(props)
        this.activeSearch = this.activeSearch.bind(this)
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
            category:"",
        }
    }
    activeSearch(category){
        console.log(category)
        this.setState({category:category})
    }
    render() {
        return (
            <main className="inicio">
                <div className="slider-main">
                    <div className="container">
                        <div className="card-slider">
                            <h2 className="title-card">
                                AMD - procesador
                            </h2>
                            <div className="contain-description">
                                <span className="description-card">
                                    nuevo y Original, CPU Ryzen 3 5 7 9 3100 3200G 3300X 3400G 3500X 3600 3600X 3700x 3800x 3900x 3950X, desbloqueado
                                </span>
                            </div>
                            <button className="btn-card-dark">
                                Quiero saber más
                            </button>
                        </div>
                        <div className="container-slider">
                            <Slider {...this.state.settings}>
                                {
                                    this.props.data.cardsPc.map((item,index)=>{
                                        return(
                                            <CardSlider item={item} key={'card-slider'+index}></CardSlider>
                                        )
                                    })
                                }
                            </Slider>
                        </div>
                    </div>
                </div>
                <div className="contain-product container">
                    <div className="w-100">
                        <div className="categoria">
                            {
                                this.props.data.categoriasPC.map((item,index)=>{
                                    return(
                                        <div className={`item_categoria ${this.state.category == index ? "active" : ""}`} onClick={(e)=>{this.activeSearch(index)}} key={'category-'+index}>
                                            <div className={`icon-mask ${item.icon}`}></div>
                                            <span className="title GalanoGrotesque-Medium">{item.title}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="show_product">
                        {
                            this.props.data.cardsPc.map((item,index)=>{
                                return(
                                    <Card key={'card-product-'+index}></Card>
                                )
                            })
                        }
                    </div>
                </div>
                <section className="section-most-seller">
                    
                </section>
                <section className="section-review">

                </section>
                <section className="section-contact">

                </section>
                <section className="download-app">

                </section>
                <Footer></Footer>
            </main>
        )
    }
}

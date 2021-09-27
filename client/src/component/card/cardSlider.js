import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export default class CardSlider extends Component {
    constructor(props){
        super(props)
        this.limitText = this.limitText.bind(this) 
        this.state = {
            title:""
        }
    }
    limitText = (text) =>{
        let limit = text.substr(0,60) + "..."   
        return limit
    }
    render() {
        return (
            <div className="slide card">
                <div className="slider-img">
                    <div className="content-icon">
                        <div className="item item-1"><div className="icon-heart icon-mask"></div></div>
                        <div className="item item-2"><div className="icon-add-cart icon-mask"></div></div>
                        <Link to={"/product/game"} className="item item-3"><div className="icon-view icon-mask"></div></Link>
                    </div>
                    <img className="img" src={this.props.item.img.default}></img>
                </div>
                <h3 className="title-slider">{this.limitText(this.props.item.title)}</h3>
                <div className="content-star">
                    <div className="icon-star icon-mask"></div>
                    <div className="icon-star icon-mask"></div>
                    <div className="icon-star icon-mask"></div>
                    <div className="icon-star icon-mask"></div>
                </div>
                <span className="product-price">Precio: 100 <span className="tachado">{this.props.item.price}</span> </span>
                <div className="btn-card">
                    More about
                </div>
            </div>
        )
    }
}

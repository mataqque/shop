import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

export default function Card(props){
    const count = useSelector((state) => state)
    const dispatch = useDispatch()
    return (
        <div className="slide card">
            <div className="slider-img">
                <div className="content-icon">
                    <div className="item item-1"><div className="icon-heart icon-mask"></div></div>
                    <div className="item item-2"><div className="icon-add-cart icon-mask"></div></div>
                    <Link to={"/product/game"} className="item item-3"><div className="icon-view icon-mask"></div></Link>
                </div>
                <img className="img" src={require("../../assets/images/procesador/ryzen-9.jpg").default}></img>
            </div>
            <h3 className="title-slider">AMD-procesador de ordenador de escritorio, nuevo y Original,</h3>
            <div className="content-star">
                <div className="icon-star icon-mask"></div>
                <div className="icon-star icon-mask"></div>
                <div className="icon-star icon-mask"></div>
                <div className="icon-star icon-mask"></div>
            </div>
            <span className="product-price">{100}.00$<span className="tachado">4,500$</span> </span>
            <p className="paragraph">
                Los procesadores 3rd Gen AMD Ryzen son los más avanzados del mundo en el segmento de juegos de PC de escritorio
            </p>
            <div className='btn-card'>
                COMPRAR
            </div>
        </div>
    )
    
}

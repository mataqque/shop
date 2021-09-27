import React, { Component } from 'react'
import faker from 'faker'
import Icon from '../UI/Icon'
import _ from 'lodash'
import {data} from "./data"
import Search from '../UI/search/search'
import './navbar.scss'
import { connect } from 'react-redux'
import { activeLinks } from '../../data/routesStore'
import { Link } from 'react-router-dom'
const getResults = () =>
  _.times(5, () => ({
    title: faker.company.companyName(),
    description: faker.company.catchPhrase(),
    image: faker.internet.avatar(),
    price: faker.finance.amount(0, 100, 2, '$'),
}))

const Nothing = function(){
    return(
        <div className="nothing">
            no hay resultados
        </div>
    )
}
class Navbar extends Component {
    constructor(props){
        super(props)
        this.animationLine = this.animationLine.bind(this)
        this.handleSearchChange = this.handleSearchChange.bind(this)
        this.leaveSearch = this.leaveSearch.bind(this)
        this.selectItem = this.selectItem.bind(this)
        this.focusSearch = this.focusSearch.bind(this)
        this.click = this.click.bind(this)
        this.state = {
            activeLine:1,
            data:data,
            value:"",
            results:[],
            active:false,
        }
    }
    componentDidMount(){
        let location = this.props.value.links.filter((item,index)=>{
            let dataLocation
            if( window.location.href.includes(item.link)){
                this.props.activeLinks(item.index)
            }
            return dataLocation
        })
        
    }
    resetComponent = () => this.setState({ isLoading: false, results: [], value: '',active:false})

    animationLine(e,position,func){
        this.setState({activeLine:position})
    
    }
    alert(){
        console.log("alert")
    }
    addItem(){
        this.setState({isPaused:false,isStopped:false})
        let time = setInterval(() => {
            this.setState({isPaused:true,isStopped:true})
            clearInterval(time)
        }, 1000);
    }
    handleSearchChange(e){
        this.setState({value:e.value})
        if(e.value.length < 1) return this.resetComponent()
        if(e.value.length > 1) this.setState({active:true})
        let item = this.state.data.filter((item)=>{
            if(item.title.search(new RegExp(e.value,"i")) == 0) return item
        })
        this.setState({results:item})
    }
    focusSearch(){
        this.setState({active: true})
    }
    selectItem(item){
        this.setState({results: [item], value: item.title ,active:false})
    }
    leaveSearch(item){
        console.log("this leave")
        this.setState({active: false})
    }
    click(e){
        e.addItem()
    }
    render() {
        return (
            <nav className="navbar">
                <div className="container">
                    <a className="brand" onClick={(e)=>{this.click(this.iconCarrito)}}>
                        <img src={require("../../assets/images/pc-gaming.svg").default}></img>
                    </a>
                    <div className="container-link center">
                        <Search 
                            class={"search-ui"}
                            handleSearchChange={this.handleSearchChange}
                            leaveSearch = {this.leaveSearch}
                            focusSearch = {this.focusSearch}
                            value = {this.state.value}
                            active = {this.state.active}
                        >
                        <div className={`content-result ${this.state.active ? "active" : ""}`}>
                            {
                            this.state.results.length == 0 ? <Nothing></Nothing>: this.state.results.map((item,index)=>{
                                return(
                                    <div className="contain-result" onClick={(e)=>{this.selectItem(item)}} key={'result'+index}>
                                        <div className="content-detail">
                                            <div className="result_title">{item.title}</div>
                                            <span className="result_description">{item.description}</span>
                                            <span className="result_price">Precio:{item.price}</span>
                                        </div>
                                        <div className="content-img">
                                            <img src={item.image}></img>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        </Search>
                    </div>
                    <div className="container-link">
                        {
                            this.props.value.links.map((item,index)=>{
                                if(item.show != false){
                                    return(
                                    <Link to={item.link} key={"link-"+index}>
                                        <div className={`link ${item.index == this.props.value.activeLink ? "active" : ""}`}
                                            onClick={()=>{this.props.activeLinks(item.index)}}
                                        >
                                            <span className="text-link">{item.title}</span>
                                            <span className="line"></span>
                                        </div>
                                    </Link>
                                    )
                                }
                            })
                        }
                        {/* <div className={`link ${this.state.activeLine == 2 ? "active" : ""}`}
                            onClick={(e)=>{this.animationLine(e,2)}}>
                            <div className="content-text cart">
                                <Icon icon={animationData} ref={element => {this.iconCarrito = element;}}></Icon>
                                <span className="text-link cart">Mi carrito</span>
                            </div>
                            <span className="line"></span>
                        </div>
                        <div className={`link ${this.state.activeLine == 3 ? "active" : ""}`}
                            onClick={(e)=>{this.animationLine(e,3)}}>
                            <span className="text-link">Categorias</span>
                            <span className="line"></span>
                        </div>
                        <div className={`link ${this.state.activeLine == 4 ? "active" : ""}`}
                            onClick={(e)=>{this.animationLine(e,4)}}
                            onMouseEnter={(e)=>{this.click(this.iconUser)}}
                            >
                            <div className="content-text cart">
                                <Icon icon={baran} ref={element => {this.iconUser = element;}}></Icon>
                                <span className="text-link cart">Mi cuenta</span>
                            </div>
                            <span className="line"></span>
                        </div>   */}
                    </div>
                </div>
            </nav>
        )
    }
}
function mapStateProps(state){
    return{
        value:state.routesFeatures
    }
}
export default connect(mapStateProps,{ activeLinks})(Navbar)
import React, { Component } from 'react'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import 'font-awesome/css/font-awesome.min.css';
import { Helmet } from 'react-helmet';
import './dashboard.scss'
import Galeria from './galeria';
import axios from 'axios';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getToken,deleteToken, setToken } from '../../data/userStore';
class Dashboard extends Component {
    constructor(props){
        super(props)
        this.logOut = this.logOut.bind(this)
        this.state = {
            expanded:'',
            activeSection:this.props.activeSection,
            closeSidebar:false,
            component: <Galeria></Galeria>,
        }
    }
    componentDidMount(){
        document.querySelector('.navbar').classList.add('none');
        // axios.post("/valid-login",{token:localStorage.getItem('token')}).then(this.response);
    }
    response = (response) =>{
        console.log('response',response.data)
        if(response.data.token != true){
            // this.props.history.push("/login")
        }
    }
    handleChange = (panel) => (event, newExpanded) => {
        this.setState({expanded: newExpanded ? panel : false, activeSection: panel})
    }
    changeSection = (active) =>{
        this.setState({expanded:active,activeSection:active})
    }
    logOut(){
        localStorage.removeItem('token')
        this.props.history.push("/login")
    }
    render() {
        return (
            <main className="dashboard">
                <Helmet>
                    <script src="https://kit.fontawesome.com/6611670d58.js" crossorigin="anonymous"></script>
                </Helmet>
                <div className='content-dashboard'>
                    <div className={`envolves ${this.state.closeSidebar ? 'close' : ''}`}>
                        <div className='content-sidebar'>
                            <div className='brand-dashboard c-white'>
                                FORMULADASH
                            </div>
                            <div className='user'>
                                <div className='content-img'>
                                    <img className='profile' src={require('../../assets/images/icons/profile.jpg').default} ></img>
                                </div>
                                <div className='user-role'>
                                    <span className='role c-white'>Administrador</span>
                                    <span className='name c-white'>Flavio Mataqque Pinares</span>
                                </div>
                            </div>
                            <div className={`c-sidebar-nav-title sidebar-title ${this.state.activeSection == 1 ? 'active' : ''}`} onClick={()=>{this.changeSection(1)}}>
                                <i className="fas fa-tachometer-alt"></i>
                                <span className='span-title'>Escritorio</span>
                            </div>
                            <div className='sidebar'>
                                {
                                    this.props.sectionBoton.map((body,index)=>{
                                        return(
                                            <SectionSidebar 
                                                key={'Sidebar'+index}
                                                expanded={this.state.expanded} 
                                                handleChange={this.handleChange} 
                                                body={body}
                                                changeSection={this.changeSection}
                                                key={'sidebar-'+index}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className='wrapper'>
                        <div className='nav-wrapper'>
                            <div className='toggle' onClick={()=>{this.setState({closeSidebar:!this.state.closeSidebar})}}>
                                <img className='icon' src={require('../../assets/images/icons/menu.svg').default} ></img>
                            </div>
                            <div className='content-links'>
                                <div className='link'>
                                    <span className='top-font'>Configuración</span>
                                </div>
                            </div>
                            <div className='toggle left' onClick={()=>{this.logOut()}}>
                                <i class="fas fa-sign-out-alt"></i>
                            </div>
                        </div>
                        <div className='content-wrapper'>
                            {
                                this.state.component
                            }
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}


class SectionSidebar extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className='section-sidebar'>
                <div className='c-sidebar-nav-title sidebar-sub-title'>
                    {this.props.body.header}
                </div>
                <div className='c-sidebar-nav-item'>
                    {
                        this.props.body.sections.map((section)=>{
                            if(section.subSection == 0 ){
                                return(
                                    <div className={`c-sidebar-nav-title ${this.props.expanded == section.index ? 'active' : ''}`} onClick={()=>{this.props.changeSection(section.index)}}>
                                        <i className={section.icon}></i>
                                        <span className='span-title'>{section.title}</span>
                                        <i className="fas fa-chevron-right"></i>
                                    </div>
                                )
                            }else{
                                return(
                                <Accordion expanded={this.props.expanded === section.index} square onChange={this.props.handleChange(section.index)}>
                                    <AccordionSummary aria-controls="panel-content">
                                        <Typography>
                                            <label className={`c-sidebar-nav-title ${this.props.expanded == section.index ? 'active-nav' : ''}`}>
                                                <i className={section.icon}></i>
                                                <span className='span-title'>{section.title}</span>
                                                <i className="fas fa-chevron-right"></i>
                                            </label>
                                        </Typography>
                                    </AccordionSummary>
                                    {
                                        section.subSection.map((item)=>{
                                            return(
                                            <AccordionDetails>
                                                <Typography>
                                                    <label className='c-sidebar-nav-title subsidebar'>
                                                        <i className={item.icon}></i>
                                                        <span className='span-title'>{item.title}</span>
                                                    </label>
                                                </Typography>
                                            </AccordionDetails>
                                            )
                                        })
                                    }
                                </Accordion>
                                )
                            }
                        })
                    }
                    
                </div>
            </div>
        )
    }
}
const MapStateProps = (state) =>{
    return({
        user:state.userStore,
        sectionBoton:state.dashboardStore.sectionBoton
    })
}
export default withRouter( connect(MapStateProps,{setToken,getToken,deleteToken})(Dashboard))
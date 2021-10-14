import { Component } from "react"
import { connect } from "react-redux"
import { Route } from "react-router"
import Protected from "../../pages/protected/protected"
import {curremtUser} from "../../data/userStore"
import { Redirect } from "react-router"
import Icon from "../UI/Icon"
import './protected.scss'
import axios from "axios"
import { hideNav } from "../../data/routesStore"
const iconLoader = require("../../assets/icons/lottie/loader-points.json");
class PrivateRoute extends Component{
    constructor(props){
        super(props)
        this.state = {
            check_user:this.props.user,
            shoWcomponent:null,
            properties:{
                loop:true,
                autoplay: true,
                animationData: iconLoader,
                speed: 0.7,
                rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice"
                },
            }
        }
    }
    componentDidMount(){
        // console.log({props:this.props})
        this.props.hideNav()
        axios.post("/api/checkUser",{token:localStorage.getItem('token')}).then((res)=>{
            let time = setInterval(() => {
                if(res.data.token == false){
                    this.setState({check_user:res.data.token})
                }else{
                    this.setState({shoWcomponent:this.props.children})
                }
                clearInterval(time)
            }, 3000);
        }); 

    }
    render(){
        return(
            <Route exact path={this.props.path} render={()=>{
                return ( 
                    // 
                    <div className='protected-route'>
                        {
                            this.state.shoWcomponent == null ? 
                            <div className='loader'>
                                <div className='content-loader'>
                                    <Icon properties={this.state.properties} class="loader-protected-icon"></Icon>   
                                </div>
                            </div> : null
                        }
                        {
                            this.state.check_user == true  ? this.state.shoWcomponent : <Redirect to="/login"></Redirect>
                        }
                    </div>
                   
                )
            }}/>
        )
    }
}
function mapStateProps(state){
    return {
        user:state.userStore.currentUser,
    }
}
export default connect(mapStateProps,{curremtUser, hideNav})(PrivateRoute)

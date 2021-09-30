import { Component } from "react"
import { connect } from "react-redux"
import { Route } from "react-router"
import Protected from "../../pages/protected/protected"
import {curremtUser} from "../../data/userStore"
class PrivateRoute extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.props.curremtUser()
    }
    render(){
        return(
            <Route exact path={this.props.path} render={()=>{
                return ( 
                    // 
                    <Protected/>
                    // this.props.user ? : <Redirect to="/login"/>
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
export default connect(mapStateProps,{curremtUser})(PrivateRoute)

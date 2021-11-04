import React, { Children, Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Navbar from './component/navbar/navbar'
import { connect } from 'react-redux'

import Modal from './component/modal/modal'
import PoliticaPrivacidad from './pages/politicas/politicas-de-privacidad'
import Protected from './pages/protected/protected'
import {curremtUser} from './data/userStore'
import PrivatedRoute from './component/helpers/PrivatedRoute'
import Dashboard from './pages/dashboard/dashboard'
import { showNav } from './data/routesStore'
import PublicRoutes from './component/helpers/PublicRoutes'
import { Helmet } from 'react-helmet'

class Title extends React.PureComponent{
    render (){
        return (
        <>
            <Helmet>
                <title>{this.props.title}</title>
            </Helmet>
        </>
        )
    }
}

class Routes extends Component {
    constructor(props){
        super(props)
    }
    render() {
    return (
        <div className="Main-pages">
            <Router>
                <Navbar></Navbar>
                <Modal>
                    <PoliticaPrivacidad></PoliticaPrivacidad>
                </Modal>
                <Switch>
                    {
                        this.props.value.links.map((item,index)=>{
                            return(
                                <Route exact path={item.link} key={index-'route'}>
                                    <PublicRoutes item={item}>
                                        {item.component}    
                                    </PublicRoutes>
                                    
                                    {/* <Title title={"PC GAMING | "+item.title}></Title>
                                    {item.component} */}
                                </Route>
                            )
                        })
                    }
                    <PrivatedRoute exact path='/protected' key='dasboard'>
                        <Protected></Protected>
                    </PrivatedRoute>
                    <PrivatedRoute exact path='/dashboard' key='dasboard'>
                        <Dashboard/>
                    </PrivatedRoute>
                    {/* <Redirect to="/"/> */}
                </Switch>                
            </Router>
        </div>
        )
    }
}
function mapStateProps(state){
    return {
        value:state.routesFeatures,
        user:state.userStore.currentUser,
    }
}
export default connect(mapStateProps,{curremtUser,showNav})(Routes)


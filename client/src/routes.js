import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Navbar from './component/navbar/navbar'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import Modal from './component/modal/modal'
import PoliticaPrivacidad from './pages/politicas/politicas-de-privacidad'

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
                            <Route exact path={item.link} key={'route-'+index}>
                                <Title title={"PC GAMING | "+item.title}></Title>
                                {item.component}
                            </Route>
                            )
                        })
                    }
                    <Redirect to="/"/>
                </Switch>                
            </Router>
        </div>
        )
    }
}
function mapStateProps(state){
    return {
        value:state.routesFeatures
    }
}
export default connect(mapStateProps,null)(Routes)

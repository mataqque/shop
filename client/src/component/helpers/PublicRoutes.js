import React, { Component } from 'react'
import { BrowserRouter as  Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { showNav } from '../../data/routesStore'
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
class PublicRoutes extends Component {
    componentDidMount(){
        this.props.showNav()
    }
    render() {
        return (
            <div>
                <Title title={"PC GAMING | "+this.props.item.title}></Title>
                {this.props.item.component}
            </div>
        )
    }
}
export default connect(null,{showNav})(PublicRoutes)

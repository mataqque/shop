import React, { Children, Component } from 'react';
import { connect } from 'react-redux';
import { active, close} from '../../data/modalStore';
import './modal.scss'
class Modal extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div className={`modal ${this.props.value.active ? "active" : ""}`} onClick={(e)=>{this.props.close(e)}} data-type="modal">
                <div className='content-modal'>
                    <div className='content-data-modal'>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
const MapStateProps = (state)=>{
    return({
        value:state.modalFeatures
    })
}
export default connect(MapStateProps,{active, close})(Modal)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { RegisterValidatonSchema } from '../../component/common/constraints/ValidationSchema';
import { FormContainer } from '../../component/common/formik';
import { checkableBoolProps, setInputProps } from '../../component/common/markups/Form';
import { active } from '../../data/modalStore';
import Icon from '../../component/UI/Icon';
import './login.scss'
import axios from 'axios';
const iconForm = require("../../assets/icons/lottie/lottie-user-profile.json");
class LoginRegister extends Component {
    constructor(props){
        super(props)
        this.state = {
            properties:{
                loop:true,
                autoplay: true,
                animationData: iconForm,
                rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice"
                },
            }
        }
    }
    componentDidMount(){
        console.log("register:",this.props)
        
    }
    initValues = {
        username:"",
        phone:"",
        email:"",
        password:"",
        repassword:""
    }
    submitForm(values){
        axios.post("http://localhost:3000/registro",values).then(function (response) {
            console.log(JSON.parse(response.data.data))
        });
    }
    render() {
    return (
        <main className="login">
            <div className='content-form'>
                <div className='content-img'>
                    <Icon properties={this.state.properties} class={"icon-content-formulario"}></Icon>
                </div>
                <FormContainer initialValues={this.initValues} validationSchema={RegisterValidatonSchema} onSubmit={this.submitForm}>
                    {
                        form => {const {errors, handleSubmit, isSubmiting } = form;
                        console.log(errors)
                            return(
                                <form className="formulario-register" onSubmit={handleSubmit}>
                                    <h2>REGISTRO</h2>
                                    <div className='content-inputs'>
                                        <input {...setInputProps("username","column column-1",form)} placeholder="Nombre"></input>
                                        <input {...setInputProps("phone","column",form)} placeholder="Número celular"></input>
                                        <input {...setInputProps("email","",form)} placeholder="example@gmail.com"></input>
                                        <input {...setInputProps("password","",form)} placeholder="password" type="password"></input>
                                        <input {...setInputProps("repassword","",form)} placeholder="repeat password" type="password"></input>
                                        <div className='remember'>
                                            <div className='content-check'>
                                                <input type="checkbox" {...checkableBoolProps("remember","",form)}></input>
                                                <span className='forget' onClick={()=>{this.props.active()}}>Politicas de privacidad</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="btn-submit" type="submit">
                                        Registrar
                                    </button>
                                    <Link to={"/login"}>
                                        <span className="forget">Logear tu cuenta</span>
                                    </Link>
                                </form>
                            )
                        }
                    }
                </FormContainer>
                
            </div>
        </main>
    );
  }
}
const MapStateProps = (state)=>{
    return({
        value:state.modalFeatures
    })
}
export default connect(null,{active})(LoginRegister)
import React, { Component } from 'react';
import { useHistory, withRouter } from 'react-router';
import axios from 'axios'
import { Link } from 'react-router-dom';
import Icon from '../../component/UI/Icon';
import './login.scss'
import { FormContainer } from '../../component/common/formik';
import { FAQContactValidatonSchema } from '../../component/common/constraints/ValidationSchema';
import { setInputProps ,checkableBoolProps } from '../../component/common/markups/Form';
import { connect } from 'react-redux';
const iconForm = require("../../assets/icons/lottie/lottie-user-profile.json");
const iconLoader = require("../../assets/icons/lottie/loader.json");

class Login extends Component {
    constructor(props){
        super(props)
        // this.submitForm = this.submitForm.bind(this)
        this.state = {
            
            sendForm:"Enviar",
            sendIndex:1,
            properties:{
                loop:true,
                autoplay: true,
                animationData: iconForm,
                rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice"
                },
            }
            ,propertiesLoader:{
                loop:true,
                autoplay: true,
                animationData: iconLoader,
                rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice"
                },
            }
        }
        console.log('witdh:',this.props)
    }
    initialValues = {
        email: "",
        password:"",
        remember: true,
    }
    componentDidMount(){
        axios.post("http://localhost:3000/valid-login",{token:localStorage.getItem('token')}).then(this.response);
    }
    submitForm = (values, { setSubmitting, resetForm }) =>{
        axios.post("http://localhost:3000/login",values).then(this.response);
    }
    response = (response) =>{
        if(response.data.type == 'token'){
            localStorage.setItem("token",response.data.token)
            this.props.history.push("/dashboard")
        }
        if(response.data.token == true){
            this.props.history.push("/dashboard")
        }
    }
    
    render() {
    return (
        <main className="login">
            <div className='content-form'>
                <div className='content-img'>
                    <Icon properties={this.state.properties} class={"icon-content-formulario"}></Icon>
                </div>
                <FormContainer initialValues={this.initialValues} validationSchema={FAQContactValidatonSchema} onSubmit={this.submitForm}>
                    {
                        form => {const {errors,handleSubmit, isSubmitting} = form;
                        console.log(isSubmitting)
                        return(
                            
                        <form onSubmit={handleSubmit} className="formulario">
                            <h2>LOGIN</h2>
                            <input {...setInputProps("email","",form)} placeholder="example@gmail.com"></input>
                            <input {...setInputProps("password","",form)} placeholder="password" type="password"></input>
                            <div className='remember'>
                                <div className='content-check'>
                                    <input type="checkbox" {...checkableBoolProps("remember","",form)}></input>
                                    <span className='title-check'>Recordar</span>
                                </div>
                                <div className='forget'>
                                    <span>Olvidaste tu contraseña?</span>
                                </div>
                            </div>
                            <div className='content-response'>
                                <span className='c-red message-error'>{}</span>
                                {
                                    isSubmitting ? <Icon properties={this.state.propertiesLoader} class={'lottie_loader'}></Icon> : null
                                }
                                
                            </div>
                            <button type="submit" className={`btn-submit ${isSubmitting ? 'disabled':''}`} disabled={isSubmitting}>
                                {this.state.sendForm}
                            </button>
                            <Link to={"/registro"}>
                                <span className="forget">Crear una cuenta</span>
                            </Link>
                        </form>
                        )
                    }}
                </FormContainer>
            </div>
        </main>
    );
  }
}

export default withRouter(Login)
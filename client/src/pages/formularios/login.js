import React, { Component } from 'react';

import axios from 'axios'
import { Link ,withRouter} from 'react-router-dom';
import Icon from '../../component/UI/Icon';
import './login.scss'
import { FormContainer } from '../../component/common/formik';
import { setInputProps ,checkableBoolProps } from '../../component/common/markups/Form';
import { FAQContactValidatonSchema } from '../../component/common/constraints/ValidationSchema';
const iconForm = require("../../assets/icons/lottie/lottie-user-profile.json");
const iconLoader = require("../../assets/icons/lottie/loader.json");

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            sendForm:"Enviar",
            sendIndex:1,
            sendAgain:false,
            messageError:null,
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
                speed:1.5,
                rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice"
                },
            }
        }
    }
    initialValues = {
        email: "",
        password:"",
        remember: true,
    }
    submitForm = (values) =>{
        this.sendAgain()
        axios.post("/auth/login",values).then(this.response);
    }
    response = (response) =>{
        console.log('data',response);
        if(response.data.type){
            localStorage.setItem("token",response.data.token);
            console.log(this.props)
            this.props.history.push("/dashboard")
        }
        if(response.data.status == 401){
            this.setState({messageError:'Email or password invalid'})
        }
        
    }
    sendAgain = () =>{
        this.setState({sendAgain:true})
        let returnTry = setInterval(() => {
            this.setState({sendAgain:false})
            clearInterval(returnTry)
        }, 2000);
    }
    componentDidMount(){

    }
    render() {
    return (
        <main className="login">
            <div className='content-form'>
                <div className='content-img'>
                    <Icon properties={this.state.properties} className={"icon-content-formulario"}></Icon>
                </div>
                <FormContainer initialValues={this.initialValues} validationSchema={FAQContactValidatonSchema} onSubmit={this.submitForm}>
                    {
                        (form) => {const {errors,handleSubmit, isSubmitting} = form;
                        
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
                                <span className='c-red message-error'>{this.state.messageError ? this.state.messageError : ''}</span>
                            </div>
                            <button type="submit" className={`btn-submit ${this.state.sendAgain ? 'disabled':''}`} disabled={this.state.sendAgain} >
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
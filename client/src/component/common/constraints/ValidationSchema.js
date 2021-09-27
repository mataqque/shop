import * as Yup from 'yup'

export const ConstrainsRegister = {
    username: Yup.string()
        .required(),
    phone:Yup.string().matches(/[\+?\-?0-9]{7,}/).required(),
    email: Yup.string().email().required(),
    password:Yup.string().required().min(8,'Password is too short - should be 8 chars minimum.').matches(/[a-zA-Z]/,'Your password justo contain Latin letters'),
    repassword:Yup.string().required().min(8,'Password is too short - should be 8 chars minimum.').matches(/[a-zA-Z]/,'Your password justo contain Latin letters'),
}
export const ConstrainsLogin = {
    email: Yup.string()
        .email()
        .required(),
    password:Yup.string().required().min(6,'Password is too short - should be 6 chars minimum.'),
}

export const FAQContactValidatonSchema = (values) => Yup.object()
    .shape({
        ...ConstrainsLogin,
        
    })

export const RegisterValidatonSchema = (values) => Yup.object()
    .shape({
        ...ConstrainsRegister,
        
    })
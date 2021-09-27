import React from 'react'
const { Formik } =  require('formik');

export const FormContainer = ({ initialValues, validationSchema, onSubmit, children}) =>(
    <Formik 
    enableReinitialize
    initialValues={initialValues}
    validate={validate(validationSchema)}
    onSubmit={onSubmit}
    >
        {children}
    </Formik>
    )

export default function validate(getValidationSchema){
    return(values)=>{
        const validationSchema = getValidationSchema(values)
        try{
            validationSchema.validateSync(values,{abortEarly:false})
            return {}
        }catch(err){
            return getErrorsFromValidationError(err)   
        }
    }
}

function getErrorsFromValidationError(validationError) {
    const FIRST_ERROR = 0
    return validationError.inner.reduce((errors, error) => {
      return {
        ...errors,
        [error.path]: error.errors[FIRST_ERROR],
      }
    }, {})
}
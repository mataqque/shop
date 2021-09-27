export const setInputProps =(name, classes = "", {errors, touched, handleChange, handleBlur}) => ({
    name: name,
    className: `${classes} ${errors[name] && touched[name] && "invalid"}`,
    onChange: handleChange,
    onBlur: handleBlur
})
export const checkableBoolProps = (name, classes = "", {errors, touched, handleChange, handleBlur, setFieldValue}) => ({
    name: name,
    className: `${classes} ${errors[name] && touched[name] && "invalid"}`,
    onChange: ({target}) => setFieldValue(name, target.checked),
    onBlur: handleBlur
})
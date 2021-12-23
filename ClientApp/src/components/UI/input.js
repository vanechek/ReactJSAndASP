import React from 'react'
function isInvalid({ valid, touched, shouldValidate }) {
    return !valid && shouldValidate && touched
}

const Input = (props) => {
    const inputType = props.inputType
    const className = props.className
    return (
        <div className={props.className}>
            <input
                type={props.inputType}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
            />

            {
                isInvalid(props)
                    ? <span>{props.errorMessage || 'Введите верное значение'}</span> : null
            }
        </div>
    )
}
export default Input

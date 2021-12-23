import React, { Component } from 'react'
import './authorization.css'
import { withRouter } from 'react-router-dom'
import Input from '../../components/UI/input.js'
import { connect } from 'react-redux'
import { auth, authSuccess } from '../../redux/actions/auth.js'
import {CheckAuth} from '../../components/Helpers/CheckAuth'

class AuthPage extends Component {

    state = {
        isFormValid: false,
        formControls: {
            Login: {
                value: '',
                type: 'login',
                placeholder: 'Login',
                errorMessage: 'Введите корректный login',
                valid: false,
                touched: false,
                validation: {
                    required: true
                }
            },
            password: {
                value: '',
                type: 'password',
                placeholder: 'Пароль',
                errorMessage: 'Введите корректный пароль (от 4 символов)',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 4
                }
            }
        }
    }


    onChangeHandler = (event, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }
        // убираем русские символы из введённого инпута
        var reg = /[а-яА-ЯёЁ]/g;
        if (event.target.value.search(reg) != -1) {
            event.target.value = event.target.value.replace(reg, '');
        }
        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })
        this.setState({
            formControls, isFormValid
        })
    }

    validateControl(value, validation) {
        if (!validation) {
            return true
        }
        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== ' ' && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid || value == ""
        }
        return isValid
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    placeholder={control.placeholder}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event => this.onChangeHandler(event, controlName)}
                    className={control.type == "login" ? "authorizationLogin" : "authorizationPassword"}
                />
            )
        })
    }

    render() {
        return (
            <React.Fragment>
                {
                    CheckAuth(this.props) ? this.props.history.push("/myAccount") : (
                        <div className="authorization" >
                            <div className="authorizationForm">
                                {this.renderInputs()}
                                <div>
                                    <div className="authorizationButton" >
                                        <button disabled={!this.state.isFormValid} onClick={() => {
                                            this.props.auth(
                                                this.state.formControls.Login.value,
                                                this.state.formControls.password.value
                                            )
                                        }}>Авторизоваться</button>
                                    </div>
                                </div>
                            </div>
                        </div >
                    )
                }

            </React.Fragment >
        )
    }

}
function mapStateToProps(state) {
    return {
        token: state.auth.token
    }
}
function mapDispatchToProps(dispatch) {
    return {
        auth: (login, password) => dispatch(auth(login, password))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthPage)
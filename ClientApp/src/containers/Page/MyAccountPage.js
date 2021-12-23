import React from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import { CheckAuth } from "../../components/Helpers/CheckAuth.js";
import { logout } from '../../redux/actions/auth.js'

const MyAccountPage = props => {
    return (
        <React.Fragment>
            {
                CheckAuth(props) ? (
                    <React.Fragment>
                        <h1 style={{ textAlign: 'center' }}>Личный кабинет</h1>
                        <span>{props.username || localStorage.getItem("username")}</span>
                        <button onClick={() => {
                            props.logout()
                            props.history.push("/")
                        }}>Выход</button>
                    </React.Fragment>
                ) : props.history.push("/")
            }
        </React.Fragment>
    );
}
function mapStateToProps(state) {
    return {
        token: state.auth.token,
        username: state.auth.username
    }
}
function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout())
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyAccountPage))
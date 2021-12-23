import AccountClient from '../../components/AccountClient/accountClient.js'
import ErrorBoundary from '../../components/Helpers/ErrorBoundary.js';
import React, { useContext } from 'react';
import '../AccountClient.css'
import { withRouter } from 'react-router-dom'
import BasePage from '../BasePage.js'
import Loader from '../../UI/Loader/Loader.js';
import { connect } from 'react-redux';
import { getRequestWithoutParams, postRequestWithParams } from '../../redux/actions/request.js'
import { CheckAuth } from '../../components/Helpers/CheckAuth.js';

class AccountClientPage extends React.Component {

	state = {
		accountClients: null,
		fullName: "",
		phoneNumber: 0,
		adress: "",
		isLoading: true,
		isUpdate: false,
		selectedColumn: "ФИО"

	}
	componentDidMount() {
		this.loadData();
	}
	loadData() {
		this.props.request("api/accountClient/GetAccounClients");
	}
	updateData() {
		this.loadData();
		this.setState({ isUpdate: false });
	}
	onChangeAttribute(e) {
		switch (e.target.id) {
			case "fio":
				this.setState({ fio: e.target.value });
				break;
			case "phoneNumber":
				this.setState({ phoneNumber: e.target.value });
				break;
			case "adress":
				this.setState({ adress: e.target.value });
				break;
			default:
		}
	}
	render() {
		return (
			<React.Fragment>
				{
					!CheckAuth(this.props) ? this.props.history.push('/') : null
				}
				{
					this.state.isUpdate ? this.updateData() : null
				}
				{
					this.props.items && this.state.isLoading ? this.setState({
						isLoading: false
					}) : null
				}
				{
					<BasePage
						title="Клиенты"
						nameClass="accountClient"
						childrenColumn={
							(<div className="accountClient">
								<div className="column fio">
									ФИО
								</div>
								<div className="column phone">
									Номер телефона
								</div>
								<div className="column adress">
									Адрес
								</div>
							</div>)
						}
						childrenItem=
						{
							!this.state.isLoading && this.props.items != null ? (this.props.items !== null && this.props.items.length > 0 ?
								this.props.items.map(function (account, index) {
									return <ErrorBoundary key={account.id} name="accountClient error">
										<AccountClient index={index} accountClient={account} />
									</ErrorBoundary>

								}) : null) : <Loader />
						}
						childrenModal={
							(<div className="accountClientInfo form">
								<p>
									Полное имя(ФИО):
									<input type="text" value={this.state.fullName} onChange={this.onChangeAttribute.bind(this)} id="fio" />
								</p>
								<p>
									Номер телефона:
									<input type="number" value={this.state.phoneNumber} onChange={this.onChangeAttribute.bind(this)} id="phoneNumber" />
								</p>
								<p>
									Адрес:
									<input type="text" value={this.state.adress} onChange={this.onChangeAttribute.bind(this)} id="adress" />
								</p>
								<button id="addNewAccountClient" onClick={(event) => {
									let xhr = new XMLHttpRequest();
									let accountClient = {
										"fio": this.statefullName,
										"phoneNumber": Number(this.state.phoneNumber),
										"adress": this.state.adress
									};
									var json = JSON.stringify(accountClient);
									xhr.open('POST', "api/accountClient/AddAccounClient");
									xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
									xhr.onload = function () {
										if (xhr.readyState === 4 && xhr.status === 200) {
											this.setState({ fullName: "", phoneNumber: 0, adress: "", isUpdate: true })
										}
										if (xhr.status === 404 && xhr.readyState === 4) {
											alert(xhr.responseText);
											console.log(xhr.responseText);
										}
									}.bind(this);
									xhr.send(json);
								}}>Добавить</button>
							</div>)
						}
						options={(
							<React.Fragment>
								<option>ФИО</option>
								<option>Номер телефона</option>
								<option>Адрес</option>
							</React.Fragment>
						)}
						onFindItem={(event) => {
							if (event.key === "Enter") {
								this.props.requestWithBody("api/accountClient/GetAccounClientsWithParams", this.state.selectedColumn, event.target.value);
							}
						}}
						onChange={(e) => {
							this.setState({ selectedColumn: e.target.value });
						}}>
					</BasePage>
				}
			</React.Fragment>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		request: (url) => dispatch(getRequestWithoutParams(url)),
		requestWithBody: (url, key, value) => dispatch(postRequestWithParams(url, key, value))
	}
}

function mapStateToProps(state) {
	return {
		token: state.auth.token,
		items: state.request.items
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountClientPage))
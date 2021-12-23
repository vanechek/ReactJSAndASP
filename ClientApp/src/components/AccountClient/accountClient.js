import React from 'react'
import { withRouter } from 'react-router-dom'
class AccountClient extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			accountClient: props.accountClient
		};
		this.divRef = React.createRef();
	}
	componentDidMount() {
		if (this.props.index == 0) {
			this.divRef.current.focus();
		}
	}
	render() {
		let divName = `accountClient ${this.state.accountClient.id}-info`
		return <div className={divName} ref={this.divRef} tabIndex={this.props.index} onDoubleClick={(event) => {
			this.props.history.push("/accounts/account/" + this.state.accountClient.id)
		}}>
			<div className="fioContainer">
				{this.state.accountClient.fio}
			</div>
			<div className="phoneContainer">
				{this.state.accountClient.phoneNumber}
			</div>
			<div className="adressContainer">
				{this.state.accountClient.address}
			</div>
			<div className="ButtonsContainer">
				<button onClick={() => {
					let xhr = new XMLHttpRequest();
					xhr.open('DELETE', "api/accountClient/DeleteAccounClients/" + this.state.accountClient.id);

					xhr.onload = function () {
						if (xhr.status === 404 && xhr.readyState === 4) {
							alert(xhr.responseText);
							console.log(xhr.responseText);
						}
					}.bind(this);
					xhr.send();
				}}>Удалить
				</button>
			</div>
		</div>
	}
}
export default withRouter(AccountClient)
import React from "react";
import Booking from "../Booking/Booking";
import accountClient from "./accountClient";
import FastFoodSelectModal from "../Fastfood/fastFoodSelectModal.js";
import OrderInfo from "../Booking/orderInfo";
import {withRouter} from 'react-router-dom'

class AccountClientDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountClient: null,
            notificationTitle: "",
            oldAccountClientData: {
                fio: "",
                phoneNumber: 0,
                address: "",
            },
            bookings: [],
            active: false,
            orders: []
        };
        this.onChange = this.onChange.bind(this);
        this.onClickOnDelete = this.onClickOnDelete.bind(this);
        this.onClickOnChange = this.onClickOnChange.bind(this);
    }
    setActive(value) {
        this.setState({ active: value });
    }
    componentDidMount() {
        this.loadData();
    }
    loadData() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "api/accountClient/GetAccounClient/" + this.props.match.params.id);
        xhr.onload = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                this.setState({ accountClient: JSON.parse(xhr.responseText) });
                this.state.oldAccountClientData = {
                    fio: this.state.accountClient.fio,
                    phoneNumber: this.state.accountClient.phoneNumber,
                    address: this.state.accountClient.address
                };
                this.getBooking(this.state.accountClient.id)
            }
        }.bind(this);
        xhr.send();
    }
    getBooking(id) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "api/booking/GetAllOrdersAccountClient/" + id);
        xhr.onload = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                this.setState({ orders: JSON.parse(xhr.responseText) });
            }
        }.bind(this);
        xhr.send();
    }

    onChange(e) {
        let newAccountClient = this.state.accountClient;
        switch (e.target.id) {
            case "fio":
                newAccountClient.fio = e.target.value;
                this.setState({
                    accountClient: newAccountClient,
                    notificationTitle: newAccountClient.fio !== this.state.oldAccountClientData.fio ? "Сохраните изменения" : ""
                });
                break;
            case "phoneNumber":
                newAccountClient.phoneNumber = e.target.value;
                this.setState({
                    accountClient: newAccountClient,
                    notificationTitle: newAccountClient.phoneNumber !== this.state.oldAccountClientData.phoneNumber ? "Сохраните изменения" : ""
                });
                break;
            case "adress":
                newAccountClient.address = e.target.value;
                this.setState({
                    accountClient: newAccountClient,
                    notificationTitle: newAccountClient.address !== this.state.oldAccountClientData.address ? "Сохраните изменения" : ""
                });
                break;
            default:
        }
    }
    onClickOnDelete(e) {
        let xhr = new XMLHttpRequest();
        xhr.open('DELETE', "api/accountClient/DeleteAccounClients/" + this.state.accountClient.id);

        xhr.onload = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                this.loadData();
                this.props.history.push("/accounts");
            }
            if (xhr.status === 404 && xhr.readyState === 4) {
                alert(xhr.responseText);
                console.log(xhr.responseText);
            }
        }.bind(this);
        xhr.send();
    }
    onClickOnChange(e) {
        if (typeof (this.state.accountClient.phoneNumber) !== Number) {
            this.state.accountClient.phoneNumber = Number(this.state.accountClient.phoneNumber);
        }
        let json = JSON.stringify(this.state.accountClient);
        let xhr = new XMLHttpRequest();
        xhr.open('POST', "api/accountClient/ChangeValuesAccounClient", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onload = function () {
            debugger;
            if (xhr.readyState === 4 && xhr.status === 200) {
                this.loadData();
                this.setState({ notificationTitle: "" });
            }
            if (xhr.status === 404 && xhr.readyState === 4) {
                alert(xhr.responseText);
                console.log(xhr.responseText);
            }
        }.bind(this);
        xhr.send(json);
    }

    render() {
        let isLoaded = this.state.accountClient === null ? false : true;
        return (
            <React.Fragment>
                {
                    isLoaded ?
                        <React.Fragment>
                            <div className='titleConainer'>
                                <h4>Клиент</h4>
                            </div>
                            <div className="accountClietmainContainer">
                                <div className="mainInfoAccountClient">
                                    <h4>Основная информация</h4>
                                    <div className="adressContainer">
                                        ФИО:
                                        <input type="text" id="fio" className="accountClientInput" value={this.state.accountClient.fio} onChange={this.onChange} />
                                    </div>
                                    <div className="phoneContainer">
                                        Номер телефона:
                                        <input type="number" id="phoneNumber" className="accountClientInput" value={this.state.accountClient.phoneNumber} onChange={this.onChange} />
                                    </div>
                                    <div className="adressContainer">
                                        Адрес:
                                        <input type="text" id="adress" className="accountClientInput" value={this.state.accountClient.address} onChange={this.onChange} />
                                    </div>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    flexWrap: 'nowrap',
                                }}>
                                    {
                                        this.state.orders.length > 0 ? this.state.orders.map(function (order, key) {
                                            return <OrderInfo keyOrder={order.key} key={key} count={order.count} accountClientId={this.state.accountClient.id}/>
                                        }, this) : null
                                    }
                                    <button onClick={() =>
                                        this.setState({ active: true })
                                    }>
                                        Добавить еду
                                    </button>
                                </div>

                                <div className="accountClient-panel">
                                    <div className="accountClient-manager delete" onClick={this.onClickOnDelete}>
                                        <label id="accountClient-delete">Удалить</label>
                                    </div>
                                    <div className="accountClient-manager rename" onClick={this.onClickOnChange}>
                                        <label id="accountClient-rename">Изменить</label>
                                    </div>
                                </div>
                                <div className={this.state.notificationTitle === "" ? "notification hidden" : "notification show"}>
                                    {this.state.notificationTitle}
                                </div>
                            </div>
                            <FastFoodSelectModal active={this.state.active} setActive={this.setActive.bind(this)} accountClientId={this.state.accountClient.id} />
                        </React.Fragment>
                        : null
                }
            </React.Fragment>
        )
    }
}

export default withRouter(AccountClientDetail)
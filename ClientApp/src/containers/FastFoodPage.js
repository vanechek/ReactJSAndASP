import React from "react";
import BasePage from "./BasePage";
import FastFood from "../components/Fastfood/fastFood";
import Loader from "../UI/Loader/Loader.js"
import ErrorBoundary from "../components/Helpers/ErrorBoundary.js"
import { connect } from "react-redux";
import { getRequestWithoutParams, postRequestWithParams } from "../redux/actions/request";
import { CheckAuth } from "../components/Helpers/CheckAuth";
class FastFoodPage extends React.Component {
    state = {
        fastFoods: null,
        nameFastFood: "",
        price: 0,
        cookingTime: 0,
        isLoading: true,
        isUpdate: false,
        selectedColumn: ""
    }
    componentDidMount() {
        this.loadData();
    }
    updateData() {
        this.loadData();
        this.setState({ isUpdate: false });
    }
    loadData() {
        this.props.request("api/fastFood/GetAllFoods");
    }
    onChangeAttribute(e) {
        switch (e.target.id) {
            case "nameFastFood":
                this.setState({ nameFastFood: e.target.value });
                break;
            case "price":
                this.setState({ price: e.target.value });
                break;
            case "cookingTime":
                this.setState({ cookingTime: e.target.value });
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
                <BasePage
                    title="Фаст фуд"
                    className="fastFood"
                    childrenItem={
                        !this.state.isLoading && this.props.items != null ? (this.props.items !== null && this.props.items.length > 0 ?
                            this.props.items.map(function (fastFood, index) {
                                return <ErrorBoundary key={index} name="fastFood error">
                                    <FastFood className={`fastFood ${index}`}
                                        fastFood={fastFood.nameFastFood}
                                        price={fastFood.price}
                                        cookingTime={fastFood.cookingTime}
                                        isOnlyContent={true} />
                                </ErrorBoundary>
                            }) : null) : <Loader />
                    }
                    childrenModal={
                        (
                            <div className="fastFoodInfo form">
                                <p>
                                    Название еды:
                                    <input type="text" value={this.state.nameFastFood} onChange={this.onChangeAttribute.bind(this)} id="nameFastFood" />
                                </p>
                                <p>
                                    Цена:
                                    <input type="number" value={this.state.price} onChange={this.onChangeAttribute.bind(this)} id="price" />
                                </p>
                                <p>
                                    Время готовки в минутах:
                                    <input type="text" value={this.state.cookingTime} onChange={this.onChangeAttribute.bind(this)} id="cookingTime" />
                                </p>
                                <button id="addNewFastFood" onClick={(event) => {
                                    let xhr = new XMLHttpRequest();
                                    let fastFood = {
                                        "nameFastFood": this.state.nameFastFood,
                                        "price": Number(this.state.price),
                                        "cookingTime": this.state.cookingTime
                                    };
                                    var json = JSON.stringify(fastFood);
                                    xhr.open('POST', "api/fastFood/AddFastFood");
                                    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                                    xhr.onload = function () {
                                        if (xhr.readyState === 4 && xhr.status === 200) {
                                            this.setState({ nameFastFood: "", price: 0, cookingTime: 0 })
                                        }
                                        if (xhr.status === 404 && xhr.readyState === 4) {
                                            alert(xhr.responseText);
                                            console.log(xhr.responseText);
                                        }
                                    }.bind(this);
                                    xhr.send(json);
                                }}>Добавить</button>
                            </div>
                        )
                    }
                    options={(
                        <React.Fragment>
                            <option>Название</option>
                            <option>Цена</option>
                            <option>Время готовки</option>
                        </React.Fragment>
                    )}
                    onFindItem={(event) => {
                        if (event.key === "Enter") {
                            this.props.requestWithBody("api/accountClient/GetAccounClientsWithParams", this.state.selectCol, event.target.value);
                        }
                    }}
                    onChange={(e) => {
                        this.setState({ selectedColumn: e.target.value });
                    }}
                />

            </React.Fragment>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(FastFoodPage)
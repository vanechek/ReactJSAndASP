import React, { Component, useState } from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect, Router } from 'react-router-dom';
import Layout from './components/Layout/Layout.js'
import MenuItems from './components/MenuItem/menuItem.js'
import AccountClientDetail from './components/AccountClient/accountClientDetail.js';
import AuthPage from './containers/Page/AuthPage.js'
import MainShop from './containers/mainShop.js';
import FastFoodPage from './containers/FastFoodPage.js';
import MyAccountPage from './containers/Page/MyAccountPage.js'
import AccountClientPage from './containers/Page/AccountClientPage.js';
import { Alert } from './components/alert/Alert.js';
import { AlertState } from './components/alert/AlertState.js'

const App = () => {
    return (
        <AlertState>
            <Layout>
                <div className="menuItems">
                    <MenuItems />
                </div>
                <div className="main" style={{ float: 'right' }}>
                <Alert alert={{text: "фывфв"}} />
                    <Switch>
                        <Route path="/" exact component={AuthPage} />
                        <Route path="/accounts/account/:id" component={AccountClientDetail} />
                        <Route path="/accounts" component={AccountClientPage} />
                        <Route path="/shop" component={MainShop} />
                        <Route path="/fastFood" component={FastFoodPage} />
                        <Route path="/myAccount" component={MyAccountPage} />
                        <Route render={() => <div className='url-error' style={{
                            color: 'red',
                            fontWeight: 2,
                            textAlign: 'center',
                            display: 'flex',
                            width: '100vh',
                            height: '100vh',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}><h1>Неверный url адрес</h1></div>} />
                    </Switch>
                </div>
            </Layout>
        </AlertState>
    )
}

export default App

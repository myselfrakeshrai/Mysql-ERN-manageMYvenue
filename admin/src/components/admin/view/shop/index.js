import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Allshop from './All-Shop';
import Createshop from './Add-Shop';
import View from './view';
import ShopProduct from './shop-product';
import Edit from './edit';

export default class Shop extends Component {
    render() {
        const { match } = this.props;
        return (
            <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        <Route path={[`${match.path}/list`]} component={Allshop} />
                        <Route path={[`${match.path}/create`]} component={Createshop} />
                        <Route path={[`${match.path}/view`]} component={View} />
                        <Route path={[`${match.path}/shop-product`]} component={ShopProduct} />
                        <Route path={[`${match.path}/edit`]} component={Edit} />
                    </Switch>
                </main>
            </div>
        );
    }
}
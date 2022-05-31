import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import List from './list';

export default class Product extends Component {
    render() {
        const { match } = this.props;
        return (
            <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        <Route path={[`${match.path}/product/list`]} component={List} />
                    </Switch>
                </main>
            </div>
        );
    }
}
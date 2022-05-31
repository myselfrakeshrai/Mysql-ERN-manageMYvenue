import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import View from './view';
import Edit from './edit';

export default class Customer extends Component {
    render() {
        const { match } = this.props;
        return (
            <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        <Route path={[`${match.path}/list`]} component={View} />
                        <Route path={[`${match.path}/edit/:id`]} component={Edit} />
                    </Switch>
                </main>
            </div>
        );
    }
}
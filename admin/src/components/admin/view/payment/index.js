import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import View from './view';

export default class Payment extends Component {
    render() {
        const { match } = this.props;
        return (
            <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        <Route path={[`${match.path}/list`]} component={View} />
                    </Switch>
                </main>
            </div>
        );
    }
}
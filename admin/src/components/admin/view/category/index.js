import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import List from './list';
import MainCategory from './create';
import SubCategory from './create/sub-category';
import SubChildCategory from './create/child-category';


export default class Category extends Component {
    render() {
        const { match } = this.props;
        return (
            <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        <Route path={[`${match.path}/list`]} component={List} />
                        <Route path={[`${match.path}/create`]} component={MainCategory} />
                        <Route path={[`${match.path}/sub-create`]} component={SubCategory} />
                        <Route path={[`${match.path}/sub-child-create`]} component={SubChildCategory} />
                    </Switch>
                </main>
            </div>
        );
    }
}
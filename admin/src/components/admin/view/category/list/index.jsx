import React, { Component } from 'react'
import {
    Button, Typography
} from "@material-ui/core";
import { GetCategoryDetails } from '../../../../services';
import swal from 'sweetalert';

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = { getdata: [] }
    }

    handleBack() {
        this.props.history.goBack();
    }
    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [year, month, day].join('-');
    }
    async getChildCategory() {
        let list = await GetCategoryDetails.getChildCategoryList();
        this.setState({ getdata: list.data })
    }
    async componentDidMount() {
        this.getChildCategory();
    }
    async handlDeleteById(id) {
        swal({
            title: "Are you sure?",
            text: "You want to delete Category from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let value = await GetCategoryDetails.getChildDeleteById(id);
                    if (value) {
                        this.getChildCategory();
                    }
                }
            });
    }
    render() {
        const { getdata } = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5 col-md-9 col-lg-6">
                        <h2 className="mt-30 page-title">Categories</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}><i class="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                    <li className="breadcrumb-item active">Categories</li>
                </ol>
                <div className="row justify-content-between">
                    <div className="col-lg-12">
                        <a href="add_category.html" className="add-btn hover-btn">Add New</a>
                    </div>
                    <div className="col-lg-3 col-md-4">
                        <div className="bulk-section mt-30">
                            <div className="input-group">
                                <select id="action" name="action" className="form-control">
                                    <option selected>Bulk Actions</option>
                                    <option value={1}>Active</option>
                                    <option value={2}>Inactive</option>
                                    <option value={3}>Delete</option>
                                </select>
                                <div className="input-group-append">
                                    <button className="status-btn hover-btn" type="submit">Apply</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-6">
                        <div className="bulk-section mt-30">
                            <div className="search-by-name-input">
                                <input type="text" className="form-control" placeholder="Search" />
                            </div>
                            <div className="input-group">
                                <select id="categeory" name="categeory" className="form-control">
                                    <option selected>Active</option>
                                    <option value={1}>Inactive</option>
                                </select>
                                <div className="input-group-append">
                                    <button className="status-btn hover-btn" type="submit">Search Category</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                        <div className="card card-static-2 mt-30 mb-30">
                            <div className="card-title-2">
                                <h4>All Categories</h4>
                            </div>
                            <div className="card-body-table">
                                <div className="table-responsive">
                                    <table className="table ucp-table table-hover">
                                        <thead>
                                            <tr>
                                                <th style={{ width: 60 }}><input type="checkbox" className="check-all" /></th>
                                                <th scope="col">Category    </th>
                                                <th scope="col">Sub Category</th>
                                                <th scope="col">Item Name</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                getdata.map((row, index) => (
                                                    <tr key={index}>
                                                        <td><input type="checkbox" className="check-item" name="ids[]" defaultValue={5} /></td>
                                                        <td>{row.SubCategory ? row.SubCategory.category.name : ''}</td>
                                                        <td>{row.SubCategory ? row.SubCategory.sub_name : ''}</td>
                                                        <td>{row.name}</td>
                                                        <td>
                                                            <span className="delivery-time">{this.formatDate(row.createdAt)}</span>
                                                        </td>
                                                        <td className="action-btns">
                                                            {/* <SubEdit state={row} /> */}
                                                            <Typography className="delete-btn" onClick={(e) => this.handlDeleteById(row.id)} ><i className="fas fa-trash-alt" /></Typography>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

import React, { Component } from 'react'
import { GetLocationDetails } from '../../../../services';
import {
    Typography,Button
} from "@material-ui/core";
import Edit from '../edit';
import swal from 'sweetalert';
export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getList: [],
        }
    }
    handleBack() {
        this.props.history.goBack();
    }
    async componentDidMount() {
        this.getLocation();
    }
    async getLocation() {
        let list = await GetLocationDetails.getAreaList();
        this.setState({ getList: list.data })
    }
    async handlDeleteById(id) {
        swal({
            title: "Are you sure?",
            text: "You want to delete area from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let value = await GetLocationDetails.getAreaDeleteById(id);
                    if (value) {
                        this.getLocation();
                    }
                }
            });
    }
    render() {
        let self = this.state.getList;
        return (
            <div className="container-fluid">
               <div className="row">
                    <div className="col-lg-5 col-md-9 col-lg-6">
                        <h2 className="mt-30 page-title">Areas</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}><i class="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                    <li className="breadcrumb-item active">Areas</li>
                </ol>
                <div className="row justify-content-between">
                    <div className="col-lg-12">
                        <a href="/admin/area/create" className="add-btn hover-btn">Add New</a>
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
                                    <button className="status-btn hover-btn" type="submit">Search Area</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                        <div className="card card-static-2 mt-30 mb-30">
                            <div className="card-title-2">
                                <h4>All Areas</h4>
                            </div>
                            <div className="card-body-table">
                                <div className="table-responsive">
                                    <table className="table ucp-table table-hover">
                                        <thead>
                                            <tr>
                                                <th style={{ width: 60 }}><input type="checkbox" className="check-all" /></th>
                                                <th style={{ width: 60 }}>ID</th>
                                                <th>Name</th>
                                                <th>Location</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                self.map((row, index) => (
                                                    <tr key={index}>
                                                        <td><input type="checkbox" className="check-item" name="ids[]" defaultValue={7} /></td>
                                                        <td>{++index}</td>
                                                        <td>{row.name}</td>
                                                        <td>{row.location ? row.location.name : ''}</td>
                                                        <td>
                                                            {row.status === 'active' ? <span className="badge-item badge-status-success">{row.status}</span> :
                                                                <span className="badge-item badge-status">{row.status}</span>
                                                            }
                                                        </td>
                                                        <td className="action-btns">
                                                            <Edit state={row} />
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

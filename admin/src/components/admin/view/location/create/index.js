import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { GetLocationDetails } from '../../../../services';
import swal from 'sweetalert';

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '', status: 1
        }
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleBack() {
        this.props.history.goBack();
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { name, status } = this.state;

        swal({
            title: "Are you sure?",
            text: "You want to Add New Location",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetLocationDetails.getLocation(name, status);
                    if (list) {
                        this.setState({ getList: list.data })
                        window.location.href = "/admin/location/list"
                    }
                }
            });
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5 col-md-9 col-lg-6">
                        <h2 className="mt-30 page-title">Locations</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}><i class="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                    <li className="breadcrumb-item">Locations</li>
                    <li className="breadcrumb-item active">Add Location</li>
                </ol>
                <div className="row">
                    <div className="col-lg-5 col-md-6">
                        <div className="card card-static-2 mb-30">
                            <div className="card-title-2">
                                <h4>Add New Location</h4>
                            </div>
                            <div className="card-body-table">
                                <div className="news-content-right pd-20">
                                    <div className="form-group">
                                        <label className="form-label">Name*</label>
                                        <input type="text" className="form-control" placeholder="Location Name" name="name" onChange={(e) => this.handleChange(e)} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Status*</label>
                                        <select id="status" name="status" className="form-control" value={this.state.status} onChange={(e) => this.handleChange(e)}>
                                            <option value={1}>Active</option>
                                            <option value={0}>Inactive</option>
                                        </select>
                                    </div>
                                    <button className="save-btn hover-btn" type="submit" onClick={this.handleSubmit}>Add New</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

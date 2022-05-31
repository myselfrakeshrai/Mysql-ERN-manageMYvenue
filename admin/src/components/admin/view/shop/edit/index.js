import React, { Component } from 'react';
import {
    Button
} from "@material-ui/core";
import { GetSupplierDetails } from '../../../../services';
import swal from 'sweetalert';

export default class Edit extends Component {
    constructor(props) {
        super(props);
        let self = this.props.location.state.row;
        let value = self.status==="active"?1:0;
        this.state = {
            selectedArea: '', getList: [],
            id:self.id,storename: self.storename, status: value, shopaddress: self.shopaddress, shopdesc: self.shopdesc, ownername: self.ownername, email: self.email, phone: self.phone, owneraddress: self.owneraddress
        }
    }
    handleBack() {
        this.props.history.goBack();
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit = async event => {
        event.preventDefault();
        const { id,storename, status, shopaddress, shopdesc, ownername, owneraddress, email, phone } = this.state;
        let data = { id:id, storename: storename, status: status, shopaddress: shopaddress, shopdesc: shopdesc, ownername: ownername, owneraddress: owneraddress, email: email, phone: phone }
        swal({
            title: "Are you sure?",
            text: "You want to Add New Location",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetSupplierDetails.getUpdateSellerList(data);
                    if (list) {
                        window.location.href = "/admin/shop/list"
                    }
                }
            });
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5 col-md-9 col-lg-6">
                        <h2 className="mt-30 page-title">Shops</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}><i className="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                    <li className="breadcrumb-item"><a href="shops.html">Shops</a></li>
                    <li className="breadcrumb-item active">Update Shop</li>
                </ol>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="add-new-shop">
                            <div className="card card-static-2 mb-30">
                                <div className="row no-gutters">
                                    <div className="col-lg-6 col-md-6">
                                        <div className="card-title-2">
                                            <h4>Update Shop</h4>
                                        </div>
                                        <div className="card-body-table">
                                            <div className="add-shop-content pd-20">
                                                <div className="form-group">
                                                    <label className="form-label">Name*</label>
                                                    <input type="text" className="form-control" placeholder="store name" name="storename" value={this.state.storename} onChange={(e) => this.handleChange(e)} />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label"> Status*</label>
                                                    <select id="status" className="form-control" name="status" value={this.state.status} onChange={(e) => this.handleChange(e)}>
                                                        <option selected >--Select Status--</option>
                                                        <option value={1}>active</option>
                                                        <option value={0}>inactive</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Shop Address*</label>
                                                    <div className="card card-editor">
                                                        <div className="content-editor">
                                                            <textarea className="text-control" placeholder="Enter Address" name="shopaddress" value={this.state.shopaddress} onChange={(e) => this.handleChange(e)} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Shop Description*</label>
                                                    <div className="card card-editor">
                                                        <div className="content-editor">
                                                            <textarea className="text-control" placeholder="Enter Description" name="shopdesc" value={this.state.shopdesc} onChange={(e) => this.handleChange(e)} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <button className="save-btn hover-btn" type="submit" onClick={this.handleSubmit}>Update</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="card-title-2">
                                            <h4>Update Shop</h4>
                                        </div>
                                        <div className="card-title-2">
                                            <h4>Shop Owner</h4>
                                        </div>
                                        <div className="card-body-table">
                                            <div className="add-shop-content pd-20">
                                                <div className="form-group">
                                                    <label className="form-label">Full Name*</label>
                                                    <input className="form-control" type="text" placeholder="Enter Full Name" name="ownername" value={this.state.ownername} onChange={(e) => this.handleChange(e)} />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Email Address*</label>
                                                    <input className="form-control" type="email" placeholder="Enter Email Address" name="email" value={this.state.email} onChange={(e) => this.handleChange(e)} />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Phone Number*</label>
                                                    <input className="form-control" type="text" placeholder="Enter Phone Number" name="phone" value={this.state.phone} onChange={(e) => this.handleChange(e)} />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Owner Address*</label>
                                                    <div className="card card-editor">
                                                        <div className="content-editor">
                                                            <textarea className="text-control" placeholder="Enter Address" name="owneraddress" value={this.state.owneraddress} onChange={(e) => this.handleChange(e)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

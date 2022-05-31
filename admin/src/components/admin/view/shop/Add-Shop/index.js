import React, { Component } from 'react';
import {
    Button, Grid, Paper,
} from "@material-ui/core";
import Searchlocationlist from '../../../../common/searchLocation';
import Arealist from '../../../../common/searchArea';
import { GetLocationDetails, GetSupplierDetails } from '../../../../services';
import swal from 'sweetalert';

export default class Createshop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedArea: '', getAreaList: [],
            storename: '', status: '', shopaddress: "", shopdesc: '', ownername: '', email: '', password: '', phone: '', owneraddress: '',
            bankName: '', accountHolderName: '', IFSC: '', accountNo:'', branchName: '', adharCardNo: '', panCardNo:'', GSTNo: ''
        }
    }
    handleBack() {
        this.props.history.goBack();
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleChangeLocation = async (value) => {
        let locationId = value;
        let list = await GetLocationDetails.getAllAreaByLocation(locationId);
        this.setState({ getAreaList: list.data })
    }
    handleChangeArea = (value) => {
        this.setState({ selectedArea: value });
    }
    handleSubmit = async event => {
        event.preventDefault();
        const { storename, status, shopaddress, shopdesc, ownername, owneraddress, email, password, phone, selectedArea, accountNo, IFSC, bankName, accountHolderName, branchName, adharCardNo, panCardNo, GSTNo } = this.state;
        let data = { storename: storename, status: status, shopaddress: shopaddress, shopdesc: shopdesc, ownername: ownername, owneraddress: owneraddress, email: email, password: password, phone: phone, areaId: selectedArea, accountNo: accountNo, IFSC: IFSC, bankName: bankName, accountHolderName: accountHolderName, branchName: branchName, adharCardNo: adharCardNo, panCardNo: panCardNo, GSTNo: GSTNo }
        swal({
            title: "Are you sure?",
            text: "You want to Add New Vendor",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetSupplierDetails.createSupplierList(data);
                    if (list) {
                        window.location.href = "/admin/shop/list"
                    }
                }
            });
    }
   
    render() {
        const { getAreaList } = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5 col-md-9 col-lg-6">
                        <h2 className="mt-30 page-title">Vendors</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}><i className="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                    <li className="breadcrumb-item">Vendor</li>
                    <li className="breadcrumb-item active">Add Vendor</li>
                </ol>
                {/* vendor details */}
                <Paper>
                    <Grid container spacing={4} style={{ padding: '1rem', marginBottom: '2rem' }}>
                        <div className="card-title-2">
                            <h4><b>Vendor Details</b></h4>
                        </div>
                        <Grid item xs={4}>
                            <div className="form-group">
                                <label className="form-label">Full Name*</label>
                                <input className="form-control" type="text" placeholder="Enter Full Name" name="ownername" value={this.state.ownername} onChange={(e) => this.handleChange(e)} />
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className="form-group">
                                <label className="form-label">Email Address*</label>
                                <input className="form-control" type="email" placeholder="Enter Email Address" name="email" value={this.state.email} onChange={(e) => this.handleChange(e)} />
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className="form-group">
                                <label className="form-label">password*</label>
                                <input className="form-control" type="password" placeholder="Enter password" name="password" value={this.state.password} onChange={(e) => this.handleChange(e)} />
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className="form-group">
                                <label className="form-label">Phone Number*</label>
                                <input className="form-control" type="text" placeholder="Enter Phone Number" name="phone" value={this.state.phone} onChange={(e) => this.handleChange(e)} />
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className="form-group">
                                <label className="form-label">Address*</label>
                                <div className="card card-editor">
                                    <div className="content-editor">
                                        <textarea className="text-control" placeholder="Enter Address" name="owneraddress" value={this.state.owneraddress} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>

                {/* Shop details with product */}
                <Paper>
                    <Grid container spacing={4} style={{ padding: '1rem', marginBottom: '2rem' }}>
                        <div className="card-title-2">
                            <h4><b>Vendor Store Details</b></h4>
                        </div>
                        <Grid item xs={4}>
                            <div className="form-group">
                                <label className="form-label">Name*</label>
                                <input type="text" className="form-control" placeholder="store name" name="storename" value={this.state.storename} onChange={(e) => this.handleChange(e)} />
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className="form-group">
                                <label className="form-label">Location*</label>
                                <Searchlocationlist onSelectCategory={this.handleChangeLocation} />
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className="form-group">
                                <label className="form-label">Area*</label>
                                <Arealist state={getAreaList} onSelectArea={this.handleChangeArea} />
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className="form-group">
                                <label className="form-label"> Status*</label>
                                <select id="status" className="form-control" name="status" value={this.state.status} onChange={(e) => this.handleChange(e)}>
                                    <option selected >--Select Status--</option>
                                    <option value={1}>Yes</option>
                                    <option value={0}>No</option>
                                </select>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className="form-group">
                                <label className="form-label">Shop Address*</label>
                                <div className="card card-editor">
                                    <div className="content-editor">
                                        <textarea className="text-control" placeholder="Enter Address" name="shopaddress" value={this.state.shopaddress} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className="form-group">
                                <label className="form-label">Shop Description*</label>
                                <div className="card card-editor">
                                    <div className="content-editor">
                                        <textarea className="text-control" placeholder="Enter Description" name="shopdesc" value={this.state.shopdesc} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={4}></Grid>

                    </Grid>
                </Paper>

                {/* bank Details  */}

                <Paper style={{ padding: '1rem', marginBottom: '2rem' }}>
                    <Grid container spacing={4} >
                        <div className="card-title-2">
                            <h4><b>Bank Details(Optional)</b></h4>
                        </div>
                        <Grid item xs={4}>
                            <div className="form-group">
                                <label className="form-label">Account No*</label>
                                <div className="card card-editor">
                                    <div className="content-editor">
                                        <input className="form-control" type="text" placeholder="Enter accountNo" name="accountNo" value={this.state.accountNo} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className="form-group">
                                <label className="form-label">IFSC Code*</label>
                                <div className="card card-editor">
                                    <div className="content-editor">
                                        <input className="form-control" type="text" placeholder="Enter IFSC Code" name="IFSC" value={this.state.IFSC} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className="form-group">
                                <label className="form-label">Bank Name *</label>
                                <div className="card card-editor">
                                    <div className="content-editor">
                                        <input className="form-control" type="text" placeholder="Enter Bank Name" name="bankName" value={this.state.bankName} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className="form-group">
                                <label className="form-label">AccountHolder Name *</label>
                                <div className="card card-editor">
                                    <div className="content-editor">
                                        <input className="form-control" type="text" placeholder="Enter accountholder " name="accountHolderName" value={this.state.accountHolderName} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className="form-group">
                                <label className="form-label">Branch Name *</label>
                                <div className="card card-editor">
                                    <div className="content-editor">
                                        <input className="form-control" type="text" placeholder="Enter Bank " name="branchName" value={this.state.branchName} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className="form-group">
                                <label className="form-label">Adhar Card *</label>
                                <div className="card card-editor">
                                    <div className="content-editor">
                                        <input className="form-control" type="text" placeholder="Enter adharcard " name="adharCardNo" value={this.state.adharCardNo} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className="form-group">
                                <label className="form-label">PAN No *</label>
                                <div className="card card-editor">
                                    <div className="content-editor">
                                        <input className="form-control" type="text" placeholder="Enter pancard " name="panCardNo" value={this.state.panCardNo} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className="form-group">
                                <label className="form-label">GST No*</label>
                                <div className="card card-editor">
                                    <div className="content-editor">
                                        <input className="form-control" type="text" placeholder="Enter GSTNo" name="GSTNo" value={this.state.GSTNo} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                </div>
                            </div>
                        </Grid>

                    </Grid>
                    <button className="save-btn hover-btn" type="submit" onClick={this.handleSubmit}>Save Vendors</button>

                </Paper>
                {/* end */}

            </div>

        )
    }
}

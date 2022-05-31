import React, { Component } from 'react'
import {
    Button, Paper
} from "@material-ui/core";
import { GetUserLogin } from '../../../../services';
import { NotificationManager } from 'react-notifications';
import Loader from '../../../../loader';

export default class Edit extends Component {
    constructor(props) {
        super(props);
        let userdata = this.props.location.state;
        this.state = {
            isLoaded: false, id: userdata.id, email: userdata.email, firstName: userdata.firstName, lastName: userdata.lastName, address: userdata.address,
            password: null, confirmPassword: null, status: userdata.verify === true ? 1 : 0, role: userdata.role
        }

    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleBack(e) {
        this.props.history.goBack();
    }
    handleSubmit = async () => {
        this.setState({ isLoaded: true })

        const { password, confirmPassword } = this.state;
        // perform all neccassary validations
        if (password !== confirmPassword) {
            alert("Passwords don't match");
        } else {
            let { id, email, firstName, lastName, address, password, status, role } = this.state;
            let data = { id: id, firstName: firstName, lastName, address: address, password: password, email: email, verify: status, role: role }
            console.log(data)
            // make API call
            let user = await GetUserLogin.getUserUpdate(data);
            if (user) {
                this.setState({ isLoaded: false })
                this.props.history.goBack();
                NotificationManager.success("Update success", 'Message');
            } else {
                NotificationManager.error("Check field", 'Input');
            }

        }
    }
    render() {
        let { isLoaded, firstName, lastName, email, role, confirmPassword, password, status, address } = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5 col-md-9 col-lg-6">
                        <h2 className="mt-30 page-title">Update User</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}><i className="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item">Dashboard</li>
                    <li className="breadcrumb-item">User</li>
                </ol>
                <Paper className="user-management" style={{ padding: "1rem" }}>
                    {
                        isLoaded ? <Loader /> : null
                    }
                    <div className="row">
                        <div className="col-md-6 form-group">
                            <label>First Name</label>
                            <input type="text" className="form-control " name="firstName" value={firstName} onChange={(e) => this.handleChange(e)} />
                        </div>

                        <div className="col-md-6 form-group">
                            <label>Last Name</label>
                            <input type="text" className="form-control " name="lastName" value={lastName} onChange={(e) => this.handleChange(e)} />
                        </div>

                        <div className="col-md-6 form-group">
                            <label>Address</label>
                            <input type="text" className="form-control " name="address" value={address} onChange={(e) => this.handleChange(e)} />
                        </div>

                        <div className="col-md-6 form-group">
                            <label>Status</label>
                            <select className="form-control" name="status" defaultValue={status} onChange={(e) => this.handleChange(e)} >
                                <option >Select Status</option>
                                <option value="1">Active</option>
                                <option value="0">inActive</option>

                            </select>
                        </div>

                        <div className="col-md-6 form-group">
                            <label>Email</label>
                            <input type="text" className="form-control " name="email" value={email} disabled />
                        </div>

                        <div className="col-md-6 form-group">
                            <label>Role</label>
                            <select id="role" className="form-control" name="role" defaultValue={role} onChange={(e) => this.handleChange(e)} >
                                <option >Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="HR">HR</option>
                                <option value="customercare">Customer Care</option>
                                <option value="operation">Operation</option>
                                <option value="emp">Emp</option>

                            </select>
                        </div>
                        <div className="col-md-6 form-group">
                            <label>Password</label>
                            <input type="password" className="form-control " name="password" value={password} onChange={(e) => this.handleChange(e)} />
                        </div>
                        <div className="col-md-6 form-group">
                            <label>Confirm Password</label>
                            <input type="password" className="form-control " name="confirmPassword" value={confirmPassword} onChange={(e) => this.handleChange(e)} />
                        </div>
                    </div>
                    <button className="btn btn-success col-sm-3 mt-3 py-2" onClick={this.handleSubmit}>Update</button>
                </Paper>

            </div>
        )
    }
}

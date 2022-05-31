import React, { Component } from 'react';
import {
    Button
} from "@material-ui/core";
export default class View extends Component {
    handleBack() {
        this.props.history.goBack();
    }
    render() {
        let self = this.props.location.state;
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
                    <li className="breadcrumb-item active">Shop view</li>
                </ol>
                <div className="row">
                    <div className="col-lg-4 col-md-5">
                        <div className="card card-static-2 mb-30">
                            <div className="card-body-table">
                                <div className="shop-content-left pd-20">
                                    <div className="shop_img">
                                        <img src="/images/shop.svg" alt="shop-name" />
                                    </div>
                                    <div className="shop-dt-left">
                                        <h4>{self.row.storename}</h4>
                                        <span>{self.row.area?(self.row.area.name+','+self.row.area.location.name):''}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card card-static-2 mb-30">
                            <div className="card-body-table">
                                <div className="shopowner-content-left pd-20">
                                    <div className="shopowner-dt-left">
                                        <h4>{self.row.ownername}</h4>
                                        <span>Shop Owner</span>
                                    </div>
                                    <div className="shopowner-dts">
                                        <div className="shopowner-dt-list">
                                            <span className="left-dt">Username</span>
                                            <span className="right-dt">{self.row.ownername}</span>
                                        </div>
                                        <div className="shopowner-dt-list">
                                            <span className="left-dt">Phone</span>
                                            <span className="right-dt">{self.row.phone}</span>
                                        </div>
                                        <div className="shopowner-dt-list">
                                            <span className="left-dt">Email</span>
                                            <span className="right-dt">{self.row.email}</span>
                                        </div>
                                        <div className="shopowner-dt-list">
                                            <span className="left-dt">Address</span>
                                            <span className="right-dt">{self.row.owneraddress}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-7">
                        <div className="card card-static-2 mb-30">
                            <div className="card-body-table">
                                <div className="shopowner-content-left pd-20">
                                    <div className="shopowner-dts mt-0">
                                        <div className="shopowner-dt-list">
                                            <span className="left-dt">Name :</span>
                                            <span className="right-dt">{self.row.storename}</span>
                                        </div>
                                        <div className="shopowner-dt-list">
                                            <span className="left-dt">Area</span>
                                            <span className="right-dt">{self.row.area?self.row.area.name:''}</span>
                                        </div>
                                        <div className="shopowner-dt-list">
                                            <span className="left-dt">Location</span>
                                            <span className="right-dt">{self.row.area? self.row.area.location.name:''}</span>
                                        </div>
                                        <div className="shopowner-dt-list">
                                            <span className="left-dt">Status</span>
                                            <span className="right-dt">{self.row.status}</span>
                                        </div>
                                        <div className="shopowner-dt-list">
                                            <span className="left-dt">Address</span>
                                            <span className="right-dt">{self.row.shopaddress}</span>
                                        </div>
                                        <div className="shopowner-dt-list">
                                            <span className="left-dt">Description</span>
                                            <span className="right-dt">{self.row.shopdesc}.</span>
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

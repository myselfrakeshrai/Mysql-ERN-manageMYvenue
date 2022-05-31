import React, { Component } from 'react';
import {
    Button
} from "@material-ui/core";
export default class ShopProduct extends Component {
    handleBack() {
        this.props.history.goBack();
    }
    render() {
        // let self = this.props.location.state;
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
                    <li className="breadcrumb-item active">Shop Products</li>
                </ol>
                <div className="row">
                    <div className="col-lg-4 col-md-5">
                        <div className="card card-static-2 mb-30">
                            <div className="card-title-2">
                                <h4>Add New Product</h4>
                            </div>
                            <div className="card-body-table">
                                <div className="news-content-right pd-20">
                                    <div className="form-group">
                                        <label className="form-label">Product*</label>
                                        <select id="categeory" name="categeory" className="form-control">
                                            <option selected>--Please Product--</option>
                                            <option value={1}>Product Name 1</option>
                                            <option value={2}>Product Name 2</option>
                                            <option value={3}>Product Name 3</option>
                                            <option value={4}>Product Name 4</option>
                                            <option value={5}>Product Name 5</option>
                                            <option value={6}>Product Name 6</option>
                                            <option value={7}>Product Name 7</option>
                                            <option value={8}>Product Name 8</option>
                                            <option value={9}>Product Name 9</option>
                                            <option value={10}>Product Name 10</option>
                                            <option value={11}>Product Name 11</option>
                                            <option value={12}>Product Name 12</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Price*</label>
                                        <input type="text" className="form-control" placeholder="$0" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Quantity*</label>
                                        <input type="number" className="form-control" placeholder={0} />
                                    </div>
                                    <div className="form-group mb-0">
                                        <label className="form-label">Status*</label>
                                        <select id="status" name="status" className="form-control">
                                            <option selected>Active</option>
                                            <option value={1}>Inactive</option>
                                        </select>
                                    </div>
                                    <button className="save-btn hover-btn" type="submit">Add New Product</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-7">
                        <div className="all-cate-tags">
                            <div className="row justify-content-between">
                                <div className="col-lg-4 col-md-5">
                                    <div className="bulk-section mb-30">
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
                                <div className="col-lg-5 col-md-7">
                                    <div className="bulk-section text-left mb-30">
                                        <div className="search-by-name-input mr-0">
                                            <input type="text" className="form-control" placeholder="Search" />
                                        </div>
                                        <button className="status-btn hover-btn" type="submit">Search Product</button>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                    <div className="card card-static-2 mb-30">
                                        <div className="card-title-2">
                                            <h4>All Shop Products</h4>
                                        </div>
                                        <div className="card-body-table">
                                            <div className="table-responsive">
                                                <table className="table ucp-table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th style={{ width: 60 }}><input type="checkbox" className="check-all" /></th>
                                                            <th style={{ width: 60 }}>ID</th>
                                                            <th>Name</th>
                                                            <th>Quantity</th>
                                                            <th>Status</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td><input type="checkbox" className="check-item" name="ids[]" defaultValue={5} /></td>
                                                            <td>1</td>
                                                            <td>Product Name Here</td>
                                                            <td>250</td>
                                                            <td><span className="badge-item badge-status">Active</span></td>
                                                            <td className="action-btns">
                                                                <a href="#" className="edit-btn" title="Edit"><i className="fas fa-edit" /></a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><input type="checkbox" className="check-item" name="ids[]" defaultValue={4} /></td>
                                                            <td>2</td>
                                                            <td>Product Name Here</td>
                                                            <td>100</td>
                                                            <td><span className="badge-item badge-status">Active</span></td>
                                                            <td className="action-btns">
                                                                <a href="#" className="edit-btn" title="Edit"><i className="fas fa-edit" /></a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><input type="checkbox" className="check-item" name="ids[]" defaultValue={3} /></td>
                                                            <td>3</td>
                                                            <td>Product Name Here</td>
                                                            <td>300</td>
                                                            <td><span className="badge-item badge-status">Active</span></td>
                                                            <td className="action-btns">
                                                                <a href="#" className="edit-btn" title="Edit"><i className="fas fa-edit" /></a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><input type="checkbox" className="check-item" name="ids[]" defaultValue={2} /></td>
                                                            <td>4</td>
                                                            <td>Product Name Here</td>
                                                            <td>500</td>
                                                            <td><span className="badge-item badge-status">Active</span></td>
                                                            <td className="action-btns">
                                                                <a href="#" className="edit-btn" title="Edit"><i className="fas fa-edit" /></a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><input type="checkbox" className="check-item" name="ids[]" defaultValue={1} /></td>
                                                            <td>5</td>
                                                            <td>Product Name Here</td>
                                                            <td>200</td>
                                                            <td><span className="badge-item badge-status">Active</span></td>
                                                            <td className="action-btns">
                                                                <a href="#" className="edit-btn" title="Edit"><i className="fas fa-edit" /></a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
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

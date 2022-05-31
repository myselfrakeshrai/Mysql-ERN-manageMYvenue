import React, { Component } from 'react';
import {
    Button, Typography
} from "@material-ui/core";
import { GetProductDetails } from '../../../../services';
import AutoSelect from "../../../../common/autoselect";
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import swal from 'sweetalert';

const Arrays = (data, fieldName, fieldValue) => {
    let arrayItem = [];
    if (data && Array.isArray(data)) {
        data.map((item, key) => {
            arrayItem.push({ label: ++key + '--' + item[fieldName], value: item[fieldValue] });
            return null;
        });
    }
    return arrayItem;
};
export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getList: [], selectedProduct: '', isloaded: false, limit: 20,
            offset: 0,
            perPage: 30,
            orgtableData: [],
            currentPage: 0
        }
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
    async getProductList() {
        this.setState({ isloaded: false })
        let list = await GetProductDetails.getAllProductList();
        if (list) {
            var tdata = list.product;
            var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(tdata.length / this.state.perPage),
                orgtableData: tdata,
                getList: slice,
                isloaded: true
            })
        }
    }
    async componentDidMount() {
        this.getProductList();
    }
    handleSelectedProduct = async (name, selected) => {
        if (name === "product_id") {
            this.setState({
                list: {
                    ...this.state.list,
                    [name]: selected.value,
                },
                selectedProduct: selected,
            });
            this.setState({ changed: true });
        }
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
                    let value = await GetProductDetails.getDeleteProduct(id);
                    if (value) {
                        this.getProductList();
                    }
                }
            });
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({ loading: false })
        let list = await GetProductDetails.getProductById(this.state.selectedProduct.value);
        if (list) {
            this.setState({ getList: list.data, isloaded: true })
        }

    }
    //pagination 
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });

    };

    loadMoreData() {
        const data = this.state.orgtableData;

        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            getList: slice
        })

    }
    //end pagination 
    render() {
        const { getList, selectedProduct, isloaded } = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5 col-md-9 col-lg-6">
                        <h2 className="mt-30 page-title">Products</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}><i className="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                    <li className="breadcrumb-item active">Products</li>
                </ol>
                <div className="row justify-content-between">
                    <div className="col-lg-12">
                        <a href="/admin/product/create" className="add-btn hover-btn">Add New</a>
                    </div>

                    <div className="col-lg-12">
                        <div className="row">
                            <div className="col-lg-8 col-md-8">
                                {/* <label className="form-label"><b>Select Product*</b></label> */}
                                <br />
                                <AutoSelect
                                    className="basic-single"
                                    value={selectedProduct}
                                    onChange={this.handleSelectedProduct}
                                    isSearchable={true}
                                    name="product_id"
                                    options={Arrays(getList, "name", "id")}
                                />
                            </div>
                            <div className="col-lg-2 col-md-2">
                                <button className="save-btn hover-btn" type="submit" onClick={this.handleSubmit}>Search</button>
                            </div>
                        </div>
                    </div>



                    <div className="col-lg-12 col-md-12">
                        <div className="card card-static-2 mt-30 mb-30">
                            <div className="card-title-2">
                                <h4>All Products</h4>
                            </div>
                            <div className="card-body-table">
                                <div className="table-responsive">
                                    <table className="table ucp-table table-hover">
                                        <thead>
                                            <tr>
                                                <th style={{ width: 60 }}>Id</th>
                                                <th style={{ width: 100 }}>Image</th>
                                                <th>Name</th>
                                                <th>Category</th>
                                                <th>Brand</th>
                                                <th>Unit</th>
                                                <th>BuyerPrice</th>
                                                <th>Seller Price</th>
                                                {/* <th>Qty</th>
                                                <th>Discount(%)</th> */}
                                                <th>Discount</th>
                                                <th>Total</th>
                                                <th>Net Price</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {isloaded ?
                                                getList.map((row, index) => (
                                                    <tr key={index}>
                                                        <td>{row.id}</td>
                                                        <td>
                                                            <div className="cate-img-5">
                                                                <img src={row.photo} alt="product-name" />
                                                            </div>
                                                        </td>
                                                        <td>{row.name}</td>
                                                        <td>{row.SubCategory ? row.SubCategory.category.name : '..'}</td>
                                                        <td>{row.brand}</td>
                                                        <td>{row.unitSize}</td>
                                                        <td>&#x20B9;{row.buyerPrice}</td>
                                                        <td>&#x20B9;{row.price}</td>
                                                        {/* <td>&#x20B9;{row.qty}</td>
                                                        <td>{row.discountPer}%</td> */}
                                                        <td>&#x20B9;{row.discount}</td>
                                                        <td>&#x20B9;{row.total}</td>
                                                        <td>&#x20B9;{row.netPrice}</td>
                                                        <td>
                                                            {row.status === 'active' ? <span className="badge-item badge-status-success">{row.status}</span> :
                                                                <span className="badge-item badge-status">{row.status}</span>
                                                            }
                                                        </td>
                                                        <td className="action-btns">
                                                            <Link to={{
                                                                pathname: `/admin/product/edit`,
                                                                state: { row }
                                                            }}>
                                                                <Typography className="edit-btn"><i className="fas fa-edit" /></Typography>
                                                            </Link>
                                                            <Typography className="delete-btn" onClick={(e) => this.handlDeleteById(row.id)} ><i className="fas fa-trash-alt" /></Typography>
                                                        </td>
                                                    </tr>
                                                ))
                                                : 'Loading...'

                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <ReactPaginate
                                    previousLabel={"prev"}
                                    nextLabel={"next"}
                                    breakLabel={"..."}
                                    breakClassName={"break-me"}
                                    pageCount={this.state.pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={this.handlePageClick}
                                    containerClassName={"pagination"}
                                    subContainerClassName={"pages pagination"}
                                    activeClassName={"active"} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}

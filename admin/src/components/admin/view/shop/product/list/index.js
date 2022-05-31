import React, { Component } from 'react';
import {
    Button, Grid, Paper,
} from "@material-ui/core";
import AutoSelect from "../../../../../common/autoselect";
import { GetProductDetails } from '../../../../../services';
import Modal_box from '../modal';
import ReactPaginate from 'react-paginate';

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
    // product add 
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
     handleSearch = async (event) => {
        event.preventDefault();
        this.setState({ loading: false })
        let list = await GetProductDetails.getProductById(this.state.selectedProduct.value);
        if (list) {
            this.setState({ getList: list.data, isloaded: true })
        }

    }
    //end pagination 
    render() {
        const { getList, selectedProduct, isloaded } = this.state;

        return (
            <Paper style={{ margin: '1rem', paddingBottom: '2rem' }}>
                <Grid className="container-fluid" spacing={4} >
                    <div className="card-title-2">
                        <h4><b>Vendor Add product*</b></h4>
                    </div>
                    <Grid item xs={12}>
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
                                <button className="save-btn hover-btn" type="submit" onClick={this.handleSearch}>Search</button>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
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
                                                    {/* <th style={{ width: 60 }}><input type="checkbox" className="check-all" /></th> */}
                                                    <th style={{ width: 60 }}>Id</th>
                                                    <th style={{ width: 100 }}>Image</th>
                                                    <th>Name</th>
                                                    <th>Category</th>
                                                    <th>Brand</th>
                                                    <th>Unit</th>
                                                    <th>Price</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {isloaded ?
                                                    getList.map((row, index) => (
                                                        <tr key={index}>
                                                            {/* <td><input type="checkbox" className="check-item" name="ids[]" defaultValue={5} /></td> */}
                                                            <td>{++index}</td>
                                                            <td>
                                                                <div className="cate-img-5">
                                                                    <img src={row.photo} alt="product-name" />
                                                                </div>
                                                            </td>
                                                            <td>{row.name}</td>
                                                            <td>{row.SubCategory ? row.SubCategory.category.name : '..'}</td>
                                                            <td>{row.brand}</td>
                                                            <td><input type="text" value={row.unitSize} disabled /></td>
                                                            <td><input type="text" value={row.buyerPrice} disabled /></td>
                                                            <td><Modal_box state={row}/></td>

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
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}

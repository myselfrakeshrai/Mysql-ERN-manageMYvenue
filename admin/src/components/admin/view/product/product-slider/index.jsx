import React, { Component } from 'react'
import {
    Button
} from "@material-ui/core";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AutoSelect from "../../../../common/autoselect";
import { GetProductDetails } from '../../../../services';
import Loader from '../../../../loader';
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


export default class Uploadphoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getList: [], files: '', selectedProduct: '',selectedSearchProduct:'', imagelist: [], loading: false, isLoaded: false,
            getdata: [],
            offset: 0,
            perPage: 20,
            orgtableData: [],
            currentPage: 0
        }
    }
    fileSelectedHandler = (e) => {
        this.setState({ files: e.target.files });
    }
    handleSelectedProduct = (name, selected) => {
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
    // pagination 
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
            getdata: slice
        })

    }
    //end pagination 
    async getProductList() {
        this.setState({ isLoaded: true })
        let list = await GetProductDetails.getAllProductList();
        let imagelist = await GetProductDetails.getAllProductPhoto();
        if (imagelist) {
            var tdata = imagelist.data;
            var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(tdata.length / this.state.perPage),
                orgtableData: tdata,
                getdata: slice,
                isLoaded: false
            })
            this.setState({ getList: list.product })
        }
    }
    async componentDidMount() {
        this.getProductList();
    }
    handleSearchProduct = async (event) => {
        event.preventDefault();
        this.setState({ isLoaded: true })
        let list = await GetProductDetails.getProductById(this.state.selectedSearchProduct.value);
        if (list) {
            this.setState({ getdata: list.data, isLoaded: false })
        }
    }
    handleSelectedSearchProduct = (name, selected) => {
        if (name === "product_id") {
            this.setState({
                list: {
                    ...this.state.list,
                    [name]: selected.value,
                },
                selectedSearchProduct: selected,
            });
            this.setState({ changed: true });
        }
    }
    handleSubmit = event => {
        event.preventDefault();
        this.setState({ isLoaded: true })
        const formData = new FormData();
        formData.append('productId', this.state.selectedProduct.value);
        for (const file of this.state.files) {
            formData.append('file', file)
        }
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        swal({
            title: "Are you sure?",
            text: "You want to add Images",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetProductDetails.getUploadProductImage(formData, config);
                    if (list) {
                        toast.success("successfully added");
                        this.getProductList();
                        this.setState({ isLoaded: false })
                        window.location.href = "/admin/product/more-photo"
                    } else {
                        toast.error("error");
                    }
                }
            });

    }
    async handlDeleteById(data) {
        this.setState({ isLoaded: true })
        let list = { id: data.id, imgUrl: data.imgUrl }
        swal({
            title: "Are you sure?",
            text: "You want to delete Image from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let value = await GetProductDetails.getProductPhotoDeleteById(list);
                    if (value) {
                        this.getProductList();
                        toast.success("successfully Deleted");
                        this.setState({ isLoaded: false })
                        
                    } else { toast.error("error"); }
                }
            });
    }
    render() {
        const { getList, selectedProduct, selectedSearchProduct, getdata, loading, isLoaded } = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5 col-md-9 col-lg-6">
                        <h2 className="mt-30 page-title">Products</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}><i class="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                    <li className="breadcrumb-item"><a href="/admin/product/create">Products</a></li>
                    <li className="breadcrumb-item active">more image</li>
                </ol>
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                    {
                        isLoaded? <Loader />:''
                    }
                        <div className="card card-static-2 mb-30">
                            <div className="card-title-2">
                                <h4>Upload Product Images</h4>
                            </div>
                            <div className="card-body-table">
                                <div className="news-content-right pd-20">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6">
                                            <div className="form-group">
                                                <label className="form-label">Category*</label>
                                                <AutoSelect
                                                    className="basic-single"
                                                    value={selectedProduct}
                                                    onChange={this.handleSelectedProduct}
                                                    isSearchable={true}
                                                    name="product_id"
                                                    options={Arrays(getList, "name", "id")}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4">
                                            <div className="form-group">
                                                <label className="form-label">Slider Image*</label>
                                                <input className="form-control" type="file" multiple name="files" onChange={this.fileSelectedHandler} />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-md-2">
                                            <div className="form-group">
                                                <button className="save-btn hover-btn" type="submit" onClick={this.handleSubmit} disabled={loading}>
                                                    {loading && <i className="fa fa-refresh fa-spin" />}
                                                    {loading && <span>Upload</span>}
                                                    {!loading && <span>Upload</span>}
                                                </button>
                                                <ToastContainer autoClose={1500} />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-12 col-md-12">
                        {
                            isLoaded ? <Loader /> : ''
                        }
                        <div className="card card-static-2 mt-30 mb-30">
                            <div className="col-lg-12">
                                <div className="row">
                                    <div className="col-lg-8 col-md-8">
                                        {/* <label className="form-label"><b>Select Product*</b></label> */}
                                        <br />
                                        <AutoSelect
                                            className="basic-single"
                                            value={selectedSearchProduct}
                                            onChange={this.handleSelectedSearchProduct}
                                            isSearchable={true}
                                            name="product_id"
                                            options={Arrays(getList, "name", "id")}
                                        />
                                    </div>
                                    <div className="col-lg-2 col-md-2">
                                        <button className="save-btn hover-btn" type="submit" onClick={this.handleSearchProduct}>Search</button>
                                    </div>
                                </div>
                            </div>

                            <div className="card-title-2">
                                <h4>All Products</h4>
                            </div>
                            <div className="card-body-table">
                                <div className="table-responsive">
                                    <table className="table ucp-table table-hover">
                                        <thead>
                                            <tr>
                                                <th style={{ width: 160 }}>S.N</th>
                                                <th style={{ width: '350px' }}>Product Name</th>
                                                <th style={{ width: '100px' }} >Brand</th>
                                                <th className="center"> Images</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                getdata.map((row, index) => (
                                                    row.productphotos.length ?
                                                        <tr key={index}>
                                                            <td>{row.id}</td>
                                                            <td style={{ width: '350px' }}>{row.name}</td>
                                                            <td style={{ width: '100px' }}>{row.brand}</td>
                                                            <td>
                                                                <table>
                                                                    <thead>
                                                                        <tr>
                                                                            <th style={{ width: '350px' }}>Photo</th>
                                                                            <th style={{ width: '100px' }} >Action</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {row.productphotos.map((data, index) => (
                                                                            <tr key={index}>
                                                                                <td><img src={data.imgUrl} alt="product-name" height="65px" /></td>
                                                                                <td>
                                                                                    <span className="delete-btn" style={{ cursor: 'pointer' }} onClick={(e) => this.handlDeleteById(data)} ><i className="fas fa-trash-alt" /></span>
                                                                                </td>

                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>

                                                            </td>
                                                        </tr> : ''
                                                ))
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

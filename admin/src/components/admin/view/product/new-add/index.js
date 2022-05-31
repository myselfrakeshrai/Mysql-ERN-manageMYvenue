import React, { Component } from 'react';
import {
    Button
} from "@material-ui/core";
import MainCategorylist from '../../../../common/category/main-category';
import { GetCategoryDetails } from '../../../../services';
import SubCategorylist from '../../../../common/category/sub-category';
import ChildCategorylist from '../../../../common/category/child-category';
import { GetProductDetails } from '../../../../services';
import RichTextEditor from '../../../../RichTextEditor';
import Loader from '../../../../loader';
import { NotificationManager } from 'react-notifications';
import swal from 'sweetalert';
export default class Newproduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getList: [], getsublist: [], selectedCategory: '', selectedSubCategory: '', selectedChildCategory: '', blockhide: false,toggle: false, isLoaded: false,
            name: '', slug: '', brand: '', status: 1, unit: '', image: '', content: ``,sortDesc:null, buyerPrice:0, price: 0, qty: 1, discount: 0, discountPer: 0, total: 0, grand_total: 0
        }
    }
    handleBack() {
        this.props.history.goBack();
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onFileChange = event => {
        this.setState({ image: event.target.files[0] });
    };
    handleContentChange = contentHtml => {
        this.setState({
            content: contentHtml
        });
    };
    handleCategory = async (value) => {
        this.setState({ selectedCategory: value });
        let categoryId = value;
        let list = await GetCategoryDetails.getSelectSubCategory(categoryId);
        this.setState({ getList: list.data })
    }
    handleSubCategory = async (value) => {
        this.setState({ selectedSubCategory: value });
        let list = await GetCategoryDetails.getAllSubChildCategory(value);
        this.setState({ getsublist: list.data, blockhide: true })
    }
    handleChildCategory = async (value) => {
        this.setState({ selectedChildCategory: value });
    }
    caculationTable = () => {
        let price = this.state.price;
        let qty = this.state.qty;
        let discountPer = this.state.discountPer;
        if (price > 0 && qty > 0 && discountPer >= 0) {
            let discount = (Math.round(((price * qty) * discountPer) / 100));
            let total = (Math.round(price * qty));
            let grand_total = (Math.round((price * qty) - discount));

            this.setState({ total: total, grand_total: grand_total, discount: discount })
        } else {
            NotificationManager.error("Negative value & Zero Price not allowed", "Input Field");
        }
    }
    handleCheckPrice() {
        this.caculationTable();
        this.setState({ toggle: !this.state.toggle })
    }
    handleSubmit = event => {
        event.preventDefault();
        this.setState({ isLoaded: true })
        const { selectedCategory, selectedSubCategory, selectedChildCategory, image, name, slug, brand, status, unit, content, sortDesc, buyerPrice, price, qty, discount, discountPer, total, grand_total } = this.state;
        const formData = new FormData();
        formData.append('categoryId', selectedCategory);
        formData.append('subCategoryId', selectedSubCategory);
        formData.append('childCategoryId', selectedChildCategory);
        formData.append('name', name);
        formData.append('slug', slug);
        formData.append('brand', brand);
        formData.append('status', status);
        formData.append('unitSize', unit);
        formData.append('desc', content);
        formData.append('sortDesc', sortDesc);
        formData.append('photo', image);
        formData.append('buyerPrice', buyerPrice);
        formData.append('price', price);
        formData.append('qty', qty);
        formData.append('discountPer', discountPer);
        formData.append('discount', discount);
        formData.append('total', total);
        formData.append('netPrice', grand_total);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        swal({
            title: "Are you sure?",
            text: "You want to Add New Product",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetProductDetails.addProductList(formData, config);
                    if (list) {
                        this.setState({ isLoaded: false })
                        this.props.history.push("/admin/product/list")
                    } else {
                        NotificationManager.error("Please! Check input field", "Input Field");
                    }
                }
            });

    }
    render() {
        const { getList, getsublist, isLoaded } = this.state;
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
                    <li className="breadcrumb-item active">Add Product</li>
                </ol>

                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="card card-static-2 mb-30">
                            <div className="card-body-table">
                                <div className="news-content-right pd-20">
                                    <div className="form-group">
                                        <label className="form-label">Category*</label>
                                        <MainCategorylist onSelectCategory={this.handleCategory} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="card card-static-2 mb-30">
                            <div className="card-body-table">
                                <div className="news-content-right pd-20">
                                    <div className="form-group">
                                        <label className="form-label">Sub Category*</label>
                                        <SubCategorylist state={getList} onSelectSubCategory={this.handleSubCategory} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row" style={this.state.blockhide ? { display: 'block' } : { display: 'none' }}>
                    {
                        isLoaded ? <Loader /> : ''
                    }
                    <div className="col-lg-12 col-md-12">
                        <div className="card card-static-2 mb-30">
                            <div className="card-title-2">
                                <h4>Add New Product</h4>
                            </div>
                            <div className="card-body-table">
                                <div className="news-content-right pd-20">
                                    <div className="row">
                                        <div className="col-lg-2 col-md-2">
                                            <div className="form-group">
                                                <label className="form-label">Product Name*</label>
                                                <input type="text" className="form-control" placeholder="Product Name" name="name" value={this.state.name} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-md-2">
                                            <div className="form-group">
                                                <label className="form-label">Category*</label>
                                                <ChildCategorylist state={getsublist} onSelectchildCategory={this.handleChildCategory} />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-md-2">
                                            <div className="form-group">
                                                <label className="form-label">Slug*</label>
                                                <input type="text" className="form-control" placeholder="Product Name" name="slug" value={this.state.slug} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-md-2">
                                            <div className="form-group">
                                                <label className="form-label">Brand*</label>
                                                <input type="text" className="form-control" placeholder="Brand Name" name="brand" value={this.state.brand} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-md-2">
                                            <div className="form-group">
                                                <label className="form-label">Unit Size*</label>
                                                <input type="text" className="form-control" placeholder="size" name="unit" value={this.state.unit} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-md-2">
                                            <div className="form-group">
                                                <label className="form-label">Category Image*</label>
                                                <input type="file" className="form-control" name="image" onChange={this.onFileChange} />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row" style={{ paddingTop: '2rem' }}>
                                        <div className="col-lg-2 col-md-2">
                                            <div className="form-group">
                                                <label className="form-label">Status*</label>
                                                <select id="status" name="status" className="form-control" value={this.state.status} onChange={(e) => this.handleChange(e)}>
                                                    <option value={1}>Active</option>
                                                    <option value={0}>Inactive</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-md-2">
                                            <div className="form-group">
                                                <label className="form-label">Buyer Price*</label>
                                                <input type="number" className="form-control" name="buyerPrice" value={this.state.buyerPrice} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-md-2">
                                            <div className="form-group">
                                                <label className="form-label">Seller Price*</label>
                                                <input type="number" className="form-control" name="price" value={this.state.price} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>
                                        <div className="col-lg-1 col-md-1">
                                            <div className="form-group">
                                                <label className="form-label">Quantity*</label>
                                                <input type="number" className="form-control" name="qty" value={this.state.qty} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>
                                        <div className="col-lg-1 col-md-1">
                                            <div className="form-group">
                                                <label className="form-label">Discount(%)*</label>
                                                <input type="number" className="form-control" name="discountPer" value={this.state.discountPer} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>
                                        <div className="col-lg-1 col-md-1">
                                            <div className="form-group">
                                                <label className="form-label">Discount Price*</label>
                                                <input type="number" className="form-control" disabled name="discount" value={this.state.discount} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>
                                        <div className="col-lg-1 col-md-1">
                                            <div className="form-group">
                                                <label className="form-label">Total *</label>
                                                <input type="number" className="form-control" disabled name="total" value={this.state.total} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>
                                        <div className="col-lg-2 col-md-2">
                                            <div className="form-group">
                                                <label className="form-label">Grand Total *</label>
                                                <input type="number" className="form-control" disabled name="grand_total" value={this.state.grand_total} onChange={(e) => this.handleChange(e)} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row" style={{ paddingTop: '2rem' }}>
                                        <div className="form-group">
                                            <label className="form-label">Sort Description*</label>
                                                <textarea rows="4" cols="100" className="form-control" name="sortDesc" value={this.state.sortDesc} onChange={(e) => this.handleChange(e)} />
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group">
                                                <label className="form-label">Description*</label>
                                                <RichTextEditor
                                                    content={this.state.content}
                                                    handleContentChange={this.handleContentChange}
                                                    placeholder="insert text here..."
                                                />

                                            </div>
                                        </div>
                                    </div>
                                    <div className="button_price">
                                        <div className="form-group">
                                            <Button className="checkprice" variant="contained" onClick={() => this.handleCheckPrice()} >Checkprice</Button>
                                        </div>
                                        <div className="form-group" style={this.state.toggle ? { display: 'block' } : { display: 'none' }}>
                                            <button className="save-btn hover-btn" type="submit" onClick={this.handleSubmit}>Add New Product</button>
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

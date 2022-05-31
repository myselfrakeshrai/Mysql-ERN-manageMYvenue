import React, { Component } from 'react';
import {
    Button
} from "@material-ui/core";
import AutoSelect from "../../../../common/autoselect";
import { GetLocationDetails } from '../../../../services';
import swal from 'sweetalert';

const Arrays = (data, fieldName, fieldValue) => {
    let arrayItem = [];
    if (data && Array.isArray(data)) {
        data.map((item, key) => {
            arrayItem.push({ label: item[fieldName], value: item[fieldValue] });
            return null;
        });
    }
    return arrayItem;
};
export default class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getList: [], selectLocation:'', area:'',status:1,
        }
    }
    handleBack() {
        this.props.history.goBack();
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    async componentDidMount() {
        this.getLocation();
    }
    async getLocation() {
        let list = await GetLocationDetails.getLocationList();
        this.setState({ getList: list.data })
    }
    handleSelectChange = (name, selected) => {
        if (name === "location_id") {
            this.setState({
                list: {
                    ...this.state.list,
                    [name]: selected.value,
                },
                selectLocation: selected,
            });
            this.setState({ changed: true });
        }
    };

    handleSubmit = async event => {
        event.preventDefault();
        const { area, selectLocation, status } = this.state;
        let data = { name: area, locationId: selectLocation.value, status: status}
        swal({
            title: "Are you sure?",
            text: "You want to Add New Area",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetLocationDetails.createAreaList(data);
                    if (list) {
                        this.setState({ getList: list.data })
                        window.location.href = "/admin/area/list"
                    }
                }
            });
    }

    render() {
        const{ getList, selectLocation} = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5 col-md-9 col-lg-6">
                        <h2 className="mt-30 page-title">Areas</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}><i class="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                    <li className="breadcrumb-item"><a href="areas.html">Areas</a></li>
                    <li className="breadcrumb-item active">Add Area</li>
                </ol>
                <div className="row">
                    <div className="col-lg-5 col-md-6">
                        <div className="card card-static-2 mb-30">
                            <div className="card-title-2">
                                <h4>Add New Area</h4>
                            </div>
                            <div className="card-body-table">
                                <div className="news-content-right pd-20">
                                    <div className="form-group">
                                        <label className="form-label">Name*</label>
                                        <input type="text" className="form-control" placeholder="Area Name" name="area" value={this.state.area} onChange={(e) => this.handleChange(e)}/>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Location*</label>
                                        <AutoSelect
                                            className="basic-single"
                                            value={selectLocation}
                                            onChange={this.handleSelectChange}
                                            isSearchable={true}
                                            name="location_id"
                                            options={Arrays(getList, "name", "id")}
                                        />

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

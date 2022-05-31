import React, { Component } from 'react';
import { Modal } from '@material-ui/core';
import { GetLocationDetails } from '../../../../services';
import Searchlocationlist from '../../../../common/searchLocation';
export default class Edit extends Component {
    constructor(props) {
        super(props);
        const { name } = this.props.state;
        let value = this.props.state.status === 'active' ? 1 : 0
        this.state = {
            name: name, status: value, selectLocation:''
        }
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleOpen() {
        this.setState({ open: !this.state.open, loading: true })
    }

    handleClose() {
        this.setState({ open: !this.state.open })
    }
    handleChangeLocation = (value) => {
        this.setState({ selectLocation: value });
    }

    async handleSubmit(e) {
        let data = { id: this.props.state.id, name: this.state.name, locationId: this.state.selectLocation,status: this.state.status }
        let list = await GetLocationDetails.getareaUpdate(data);
        if (list) {
            window.location.reload();
        }
    }
    render() {
        return (
            <div >
                <a className="edit-btn" onClick={(e) => this.handleOpen()}><i className="fas fa-edit" /></a>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Update Location</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.handleClose()}>
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label className="form-label">Name*</label>
                                    <input type="text" className="form-control" name="name" value={this.state.name} onChange={(e) => this.handleChange(e)} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Location*</label>
                                    <Searchlocationlist onSelectCategory={this.handleChangeLocation} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Status*</label>
                                    <select id="status" name="status" className="form-control" value={this.state.status} onChange={(e) => this.handleChange(e)}>
                                        <option value={1}>Active</option>
                                        <option value={0}>Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => this.handleClose()}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={() => this.handleSubmit()}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}


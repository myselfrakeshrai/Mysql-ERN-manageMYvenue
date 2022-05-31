import React, { Component } from 'react';
import { Modal } from '@material-ui/core';
import { GetCategoryDetails } from '../../../../../services';

export default class Edit extends Component {
    constructor(props) {
        super(props);
        const { name, slug } = this.props.state;
        this.state = {
            name: name, slug: slug
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
    async handleSubmit(e) {
        let data = { id: this.props.state.id, name: this.state.name, slug: this.state.slug}
        let list = await GetCategoryDetails.getUpdateCategoryList(data);
        if(list){
            // window.location.reload();
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
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>this.handleClose()}>
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label className="form-label">Name*</label>
                                    <input type="text" className="form-control" name="name"value={this.state.name} onChange={(e) => this.handleChange(e)} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Slug*</label>
                                    <input type="text" className="form-control" name="slug"value={this.state.slug} onChange={(e) => this.handleChange(e)} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=>this.handleClose()}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={()=>this.handleSubmit()}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}


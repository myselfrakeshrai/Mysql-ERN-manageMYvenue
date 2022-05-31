import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GetSupplierDetails } from '../../../../../services';

import {
    Button, Modal,
} from "@material-ui/core";

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}
const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 650,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const Modal_box = (props) => {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [buyerPrice, setBuyerPrice] = useState(props.state.buyerPrice);
    const [unitSize, setUnit] = useState(props.state.unitSize);
    const [vendorList, setVendorData] = useState([]);
    const [selectedVendor, setVendorList] = useState([]);



    const handleOpen = () => {
        setOpen(true);
    };

    const handlePriceChange = (e) =>{
        setBuyerPrice(e.target.value)
    }
    const handleUnitChange = (e) =>{
        setUnit(e.target.value)
    }
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(async() => {
        let list = await GetSupplierDetails.getAllSellerList();
         if (list) {
            setVendorData({ vendorList: list.data})
        }
    }, []);
    
    const handleSelectedVendor = (e) => {

        setVendorList({ selectedVendor: e.target.value})
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        let data = { supplierId: selectedVendor.selectedVendor, productId: props.state.id, buyerPrice: buyerPrice, unitSize: unitSize}
        console.log(data)
        if(data){
            let success = await GetSupplierDetails.createSupplierProductList(data);
            if(success){
                handleClose();
            }
        }
    }
    console.log(props)
    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleOpen}>ADD</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>
                    <h4>Product Details</h4>
                    <div className="form-group">
                        <label className="form-label">Vendor List*</label>
                            {
                                vendorList.vendorList ? 
                                    <select  className="form-control" value={selectedVendor.selectedVendor} onChange={handleSelectedVendor}>
                                    <option selected>Selected Vendor</option>
                                    {
                                        vendorList.vendorList.map((row,index)=>(
                                            <option key={index} value={row.id}>{row.storename}</option>
                                        ))
                                    }
                            }
                            </select>
                                :''
                            }
                             
                    </div>
                    <div className="form-group">
                        <label className="form-label">Unit Size*</label>
                        <div className="card card-editor">
                            <div className="content-editor">
                                <input className="form-control" type="text" value={unitSize} onChange={handleUnitChange} />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Price*</label>
                        <div className="card card-editor">
                            <div className="content-editor">
                                <input className="form-control" type="text" value={buyerPrice} onChange={handlePriceChange} />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
                    </div>

                </div>
            </Modal>
        </div>
    );
}

export default Modal_box;
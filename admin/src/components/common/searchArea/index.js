import React, { Component } from 'react';
import AutoSelect from "../autoselect";

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

export default class Arealist extends Component {
    constructor(props) {
        super(props);
        this.state = {
             supplierList: this.props.state, selectedType: ''
        }
    }
    handleSelectChange = (name, selected) => {
        if (name === "supplier_id") {
            this.setState({
                supplierlist: {
                    ...this.state.supplierlist,
                    [name]: selected.value,
                },
                selectedType: selected,
            });
            this.props.onSelectArea(selected.value)

            this.setState({ changed: true });
        }
    };

    render() {
        const { selectedType } = this.state;
        return (
            <div>
                <AutoSelect
                    className="basic-single"
                    value={selectedType}
                    onChange={this.handleSelectChange}
                    isSearchable={true}
                    name="supplier_id"
                    options={Arrays(this.props.state, "name", "id")}
                />
            </div>


        )
    }
}

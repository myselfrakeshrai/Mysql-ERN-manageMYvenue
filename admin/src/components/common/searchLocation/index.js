import React, { Component } from 'react';
import GetLocationDetails  from '../../services/GetLocationDetails';
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

export default class Searchlocationlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
             getList:{}, selectLocation: ''
        }
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
            this.props.onSelectCategory(selected.value)
            this.setState({ changed: true });
        }
    };
    render() {
        const { getList, selectLocation } = this.state;
        return (
            <div>
                <AutoSelect
                    className="basic-single"
                    value={selectLocation}
                    onChange={this.handleSelectChange}
                    isSearchable={true}
                    name="location_id"
                    options={Arrays(getList, "name", "id")}
                />
            </div>


        )
    }
}

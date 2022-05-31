import React, { Component } from 'react';
import GetCategoryDetails  from '../../../services/GetCategoryDetails';
import AutoSelect from "../../autoselect";

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

export default class MainCategorylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
             getList:{}, selectCategory: ''
        }
    }
    async componentDidMount() {
        this.getLocation();
    }
    async getLocation() {
        let list = await GetCategoryDetails.getCategoryList();
        this.setState({ getList: list.data })
    }
    handleSelectChange = (name, selected) => {
        if (name === "category_id") {
            this.setState({
                list: {
                    ...this.state.list,
                    [name]: selected.value,
                },
                selectCategory: selected,
            });
            this.props.onSelectCategory(selected.value)
            this.setState({ changed: true });
        }
    };
    render() {
        const { getList, selectCategory } = this.state;
        return (
            <div>
                <AutoSelect
                    className="basic-single"
                    value={selectCategory}
                    onChange={this.handleSelectChange}
                    isSearchable={true}
                    name="category_id"
                    options={Arrays(getList, "name", "id")}
                />
            </div>


        )
    }
}

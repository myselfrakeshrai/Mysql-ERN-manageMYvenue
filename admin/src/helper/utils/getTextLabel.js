export const Arrays = (data, name) => {
    let arrayItem = [];
    if (data && Array.isArray(data)) {
      arrayItem = data.map((item, key) => {
        //arrayItem.push({ label: item.Text, value: item.Value });
        return { label: item.Text, value: item.Value };
      });
    }
    return arrayItem;
  };
  
  export const ArraysKey = (data, name) => {
    let arrayItem = [];
    if (data && Array.isArray(data)) {
      arrayItem = data.map((item, key) => {
        //arrayItem.push({ label: item.Value, value: item.Key });
        return { label: item.Value, value: item.Key };
      });
    }
    return arrayItem;
  };
  
  export const ArraysWithImage = (data, name) => {
    let arrayItem = [];
    if (data) {
      arrayItem = data.map((item, key) => {
        return {
          label: item && item.FullName,
          value: item && item.EmployeeId,
          img: item && item.Imagepath,
        };
      });
    }
    return arrayItem;
  };
  
  export const pieChartValue = (items) => {
    return items
      ? items.map((item) => {
          let ret = {};
          ret.name = item.Title;
          ret.value = item.Total;
          if (item.ValuePercentage) {
            ret.percantage = item.ValuePercentage;
          }
          return ret;
        })
      : [];
  };
  
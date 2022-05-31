import { Arrays, ArraysKey } from "../../helper/utils/getTextLabel";
import isEmpty from "../../helper/utils/isEmpty";
import React from "react";
import Select from "react-select";

const renderOptions = (props) => {
  const { options, isArray, isArrayKeys } = props;
  if (isArray) {
    if (!isEmpty(options)) {
      if (isArrayKeys) {
        return ArraysKey(options);
      }
      return Arrays(options);
    } else {
      return [];
    }
  } else {
    return options;
  }
};
export default function IntegrationReactSelect(props) {
  const {
    onChange,
    name,
    value,
    loading,
    disabled,
    classNames,
  } = props;

  return (
    <Select
      className={classNames}
      classNamePrefix="Project"
      isDisabled={disabled}
      isLoading={loading}
      value={value}
      isSearchable={true}
      name={name}
      options={renderOptions(props)}
      onChange={(value, action) => {
        onChange(action.name, value);
      }}
    />
  );
}

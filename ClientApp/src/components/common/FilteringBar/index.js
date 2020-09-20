import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Input,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";

import "./FilteringBar.css";

export const FilteringBar = ({
  gender,
  minAge,
  maxAge,
  setGender,
  setMinAge,
  setMaxAge,
}) => {
  const [genderDropdownOpen, setGenderDropDownOpen] = useState(false);

  const toggleGender = () => setGenderDropDownOpen((prevState) => !prevState);

  const renderGender = () => {
    return (
      <Dropdown size="sm" isOpen={genderDropdownOpen} toggle={toggleGender}>
        <DropdownToggle
          className="btn-primary filter-label"
          caret
        >{`Gender: ${gender}`}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setGender("male")}>Male</DropdownItem>
          <DropdownItem onClick={() => setGender("female")}>
            Female
          </DropdownItem>
          <DropdownItem onClick={() => setGender("both")}>Both</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  };
  const renderAge = () => {
    return (
      <div className="form-inline">
        <div className="d-flex w-50">
          <label className="pr-1" htmlFor="minAge">
            Min age
          </label>
          <input
            className="form-control w-50"
            type="text"
            name="minAge"
            value={minAge}
            onChange={(e) => setMinAge(e.target.value)}
          />
        </div>
        <div className="d-flex w-50">
          <label className="px-1" htmlFor="maxAge">
            Max age
          </label>
          <input
            className="form-control w-50"
            type="text"
            name="maxAge"
            value={maxAge}
            onChange={(e) => setMaxAge(e.target.value)}
          />
        </div>
      </div>
    );
  };

  return (
    <Row className="filtering-bar-wrapper">
      <Col sm={12} md={2}>
        {renderGender()}
      </Col>
      <Col sm={12} md={4}>
        {renderAge()}
      </Col>
    </Row>
  );
};

FilteringBar.propTypes = {
  gender: PropTypes.string.isRequired,
  setGender: PropTypes.func.isRequired,
};

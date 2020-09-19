import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";

import "./FilteringBar.css";

export const FilteringBar = ({ gender, setGender }) => {
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

  return (
    <Row>
      <Col sm={12} md={2}>
        {renderGender()}
      </Col>
    </Row>
  );
};

FilteringBar.propTypes = {
  gender: PropTypes.string.isRequired,
  setGender: PropTypes.func.isRequired,
};

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

export const FilteringBar = ({
  gender,
  minAge,
  maxAge,
  orderBy,
  setGender,
  setMinAge,
  setMaxAge,
  setOrderBy,
}) => {
  const [genderDropdownOpen, setGenderDropDownOpen] = useState(false);
  const [orderDropdownOpen, setOrderDropDownOpen] = useState(false);

  const toggleOrder = () => setOrderDropDownOpen((prevState) => !prevState);
  const toggleGender = () => setGenderDropDownOpen((prevState) => !prevState);

  const renderOrder = () => {
    return (
      <Dropdown size="sm" isOpen={orderDropdownOpen} toggle={toggleOrder}>
        <DropdownToggle
          className="btn-primary filter-label"
          caret
        >{`Order by: ${orderBy}`}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setOrderBy("created")}>
            Created
          </DropdownItem>
          <DropdownItem onClick={() => setOrderBy("activity")}>
            Last active
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  };

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
      <Col sm={12} md={2}>
        {renderOrder()}
      </Col>
    </Row>
  );
};

FilteringBar.propTypes = {
  gender: PropTypes.string.isRequired,
  minAge: PropTypes.number.isRequired,
  maxAge: PropTypes.number.isRequired,
  orderBy: PropTypes.string.isRequired,
  setGender: PropTypes.func.isRequired,
  setMinAge: PropTypes.func.isRequired,
  setMaxAge: PropTypes.func.isRequired,
  setOrderBy: PropTypes.func.isRequired,
};

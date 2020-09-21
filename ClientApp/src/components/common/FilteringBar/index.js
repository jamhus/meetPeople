import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Button,
  ButtonGroup,
} from "reactstrap";

import "./FilteringBar.css";

export const FilteringBar = ({
  likers,
  likees,
  gender,
  minAge,
  maxAge,
  orderBy,
  setGender,
  setMinAge,
  setMaxAge,
  setOrderBy,
  senders,
  handleToggleLikes,
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
  const renderLikeFilters = () => {
    return (
      <ButtonGroup className="d-flex">
        <Button
          disabled={likees}
          onClick={() => handleToggleLikes(senders.LIKEES)}
          className="btn-sm w-100 btn-primary"
        >
          My likes
        </Button>
        <Button
          disabled={likers}
          onClick={() => handleToggleLikes(senders.LIKERS)}
          className=" btn-sm w-100 btn-primary"
        >
          My likers
        </Button>
        <Button
          disabled={!likers && !likees}
          onClick={() => handleToggleLikes(senders.ALL)}
          className="btn-sm w-100 btn-primary btn-sm"
        >
          All
        </Button>
      </ButtonGroup>
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
      <Col sm={12} md={4}>
        {renderLikeFilters()}
      </Col>
    </Row>
  );
};

FilteringBar.propTypes = {
  likers: PropTypes.bool.isRequired,
  likees: PropTypes.bool.isRequired,
  gender: PropTypes.string.isRequired,
  minAge: PropTypes.number.isRequired,
  maxAge: PropTypes.number.isRequired,
  orderBy: PropTypes.string.isRequired,
  setGender: PropTypes.func.isRequired,
  setMinAge: PropTypes.func.isRequired,
  setMaxAge: PropTypes.func.isRequired,
  setOrderBy: PropTypes.func.isRequired,
  senders: PropTypes.shape({
    LIKERS: PropTypes.string,
    LIKEES: PropTypes.string,
    ALL: PropTypes.string,
  }),
  handleToggleLikes: PropTypes.func.isRequired,
};

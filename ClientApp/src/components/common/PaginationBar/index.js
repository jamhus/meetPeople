import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Dropdown,
  Pagination,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

import "./PaginationBar.css";

export const PaginationBar = ({
  setPage,
  pageSize,
  totalPages,
  currentPage,
  setPageSize,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const setPageNumber = (e, num) => {
    e.preventDefault();
    return setPage(num);
  };

  const renderPageSize = () => {
    return (
      <Dropdown size="sm" isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle
          className="btn-primary"
          caret
        >{`Page size: ${pageSize}`}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setPageSize(3)}>3</DropdownItem>
          <DropdownItem onClick={() => setPageSize(5)}>5</DropdownItem>
          <DropdownItem onClick={() => setPageSize(10)}>10</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  };

  const renderPages = () => {
    const items = [];
    if (totalPages > 0) {
      for (let i = 0; i < totalPages; i++) {
        let page = i + 1;
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              className={page === currentPage ? "btn-primary" : ""}
              href="#"
              onClick={(e) => setPageNumber(e, page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      items.push(
        <PaginationItem key="first">
          <PaginationLink href="#" onClick={(e) => setPageNumber(e, 1)}>
            1
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <Row>
      <Col className="w-100 d-flex justify-content-center" sm={10}>
        <Pagination aria-label="Page navigation example">
          <PaginationItem disabled={currentPage === 1}>
            <PaginationLink
              first
              href="#"
              onClick={(e) => setPageNumber(e, 1)}
            />
          </PaginationItem>
          <PaginationItem disabled={currentPage === 1}>
            <PaginationLink
              previous
              href="#"
              onClick={(e) => setPageNumber(e, currentPage - 1)}
            />
          </PaginationItem>
          {renderPages()}
          <PaginationItem disabled={currentPage === totalPages}>
            <PaginationLink
              next
              href="#"
              onClick={(e) => setPageNumber(e, currentPage + 1)}
            />
          </PaginationItem>
          <PaginationItem disabled={currentPage === totalPages}>
            <PaginationLink
              last
              href="#"
              onClick={(e) => setPageNumber(e, totalPages)}
            />
          </PaginationItem>
        </Pagination>
      </Col>
      <Col sm={2}>{renderPageSize()}</Col>
    </Row>
  );
};

PaginationBar.propTypes = {
  setPage: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  setPageSize: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};

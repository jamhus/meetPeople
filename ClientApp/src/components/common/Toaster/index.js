import React from "react";
import { connect } from "react-redux";
import { Toast, ToastBody, ToastHeader } from "reactstrap";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

import {
  closeToaster,
  TOASTER_TYPE_CONSTANTS,
} from "../../../actions/ToasterActions";

import "./Toaster.css";

const Toaster = ({
  headerMessage,
  bodyMessage,
  type,
  isOpen,
  closeToaster,
}) => {
  return (
    <div className="p-3 mt-5 position-absolute rounded toaster-wrapper">
      <Toast isOpen={isOpen}>
        <ToastHeader
          toggle={() => closeToaster()}
          icon={
            <FontAwesomeIcon
              size="1x"
              icon={
                type === TOASTER_TYPE_CONSTANTS.SUCCESS
                  ? faCheck
                  : faExclamationTriangle
              }
            />
          }
          className={
            type === TOASTER_TYPE_CONSTANTS.SUCCESS
              ? "text-success"
              : "text-danger"
          }
        >
          {headerMessage}
        </ToastHeader>
        <ToastBody>{bodyMessage} </ToastBody>
      </Toast>
    </div>
  );
};

const mapStateToProps = (state) => ({
  bodyMessage: state.toaster.bodyMessage,
  headerMessage: state.toaster.headerMessage,
  type: state.toaster.type,
  isOpen: state.toaster.isOpen,
});

const mapDispatchToProps = (dispatch) => ({
  closeToaster: () => dispatch(closeToaster()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Toaster);

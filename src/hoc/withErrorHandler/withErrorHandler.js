import React from "react";
import Modal from "../../components/UI/ModalDialogBox/ModalDialogBox";
import Aux from "../Aux";
import useHttpErrorHandler from "../../hooks/http-error-handler";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, closeHandler] = useHttpErrorHandler(axios);
    return (
      <Aux>
        <Modal show={error} onHide={closeHandler}>
          {error ? error.message : ""}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;

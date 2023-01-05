import React from "react";
import ChangePass from "../../components/HOC/PasswordForm/ChangePass";

const stateDefault = {
  Component: <p>Default</p>,
};

const ModalReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "CHANGE_PASS_MODAL": {
      let cloneState = { ...state };
      cloneState.Component = <ChangePass />;
      return { ...cloneState };
    }
    default:
      return { ...state };
  }
};

export default ModalReducer;

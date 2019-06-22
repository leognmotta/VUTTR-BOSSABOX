import React from 'react';

import Backdrop from '../Backdrop';
import StyledDiv from './style';

const Modal = ({ children, toggleShow, show, title }) => {
  const modal = (
    <>
      <Backdrop clicked={toggleShow} />
      <StyledDiv>
        <header>
          <h3>{title}</h3>
          <div onClick={toggleShow}>x</div>
        </header>

        {children}
      </StyledDiv>
    </>
  );
  return <>{show ? modal : null}</>;
};

export default Modal;

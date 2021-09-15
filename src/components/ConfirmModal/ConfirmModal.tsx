import React from 'react';

import './ConfirmModal.css';

interface ConfirmModalProps {
  content: string;
  show: boolean;
  close: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  close,
  content,
  show,
}) => {
  return (
    <>
      {show ? (
        <div className='modal'>
          <div className='modalContent'>
            <h2>You tried to reserve this space and ...</h2>
            <h3 className='modalText'>{content}</h3>
            <button onClick={close}>close</button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ConfirmModal;

import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

//Modal.setAppElement('#root');

function ModalCard( props ) 
{
  const [modalIsOpen, setIsOpen] = React.useState(props.isOpen);

  function closeModal() 
  {
    setIsOpen(false);
	
	props.closeModal();
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
         { props.children }
      </Modal>
    </div>
  );
}

export default ModalCard;
import React, { ReactNode, CSSProperties } from "react";

interface ModalBoxProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const ModalBox: React.FC<ModalBoxProps> = ({ isOpen, onClose, children }) => {
  if(!isOpen) {
    return null;
  }

  const modalStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  };

  const close: CSSProperties = {
    color: '#fff',
    float: 'right',
    fontSize: '28px',
    fontWeight: 'bold',
    cursor: 'pointer',
  };

  const containerStyle: CSSProperties = {
    backgroundColor: '#77acdd',
    borderRadius: '15px',
    padding: '6px',
    width: '400px',
    textAlign: 'center',
  };

  const styles = {  
    modal: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#4e7294',
    },
  }
  return (
    <div style={modalStyle}>
      <div style={containerStyle}>
        <span style={close} onClick={onClose}>&times;</span>
        {children}
      </div>
    </div>
  )
}

export default ModalBox;
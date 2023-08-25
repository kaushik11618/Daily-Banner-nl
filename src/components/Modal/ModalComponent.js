import { Button, Modal } from "antd";
import React from "react";

export const ModalComponent = ({ modalOpen, setModalOpen }) => {
  return (
    <Modal
      title="Basic Modal"
      open={modalOpen}
      onOk={() => {
        setModalOpen(false);
      }}
      onCancel={() => {
        setModalOpen(false);
      }}
      footer={[<Button>Add Festival</Button>]}
    >
      <div>
        <label>Categories Name </label>
      </div>
      <input placeholder="Categories Name" />
     
    
    </Modal>
  );
};

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
        <label>Name </label>
      </div>
      <input placeholder="Festival Name" />
      <div>
        <label>Date </label>
      </div>
      <input type="date" />
      <div>
        <label>Description</label>
      </div>
      <textarea style={{ resize: "none" }} placeholder="Desciption" rows={3} />
    </Modal>
  );
};

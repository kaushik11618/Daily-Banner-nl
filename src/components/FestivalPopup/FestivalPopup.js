import { Button, Modal } from "antd";
import React from "react";

export const FestivalPopup = ({ modalOpen1, setModalOpen1 }) => {
  return (
    <Modal
      title="Basic Modal"
      open={modalOpen1}
      onOk={() => {
        setModalOpen1(false);
      }}
      onCancel={() => {
        setModalOpen1(false);
      }}
      footer={[<Button>Add Festival</Button>]}
    ></Modal>
  );
};

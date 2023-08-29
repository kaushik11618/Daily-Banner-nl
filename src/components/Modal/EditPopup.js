import { Button, Modal } from "antd";
import React from "react";

export const EditPopup = ({editModal, setEditModal}) => {
  return (
    <>
      <Modal
        title="Add Category and Subcategory"
        open={editModal}
        onOk={()=>setEditModal(false)}
        onCancel={() => {
            setEditModal(false);
        }}
        footer={[
          <Button
            key="addCategoryAndSubcategory"
            type="primary"
          >
            Add Category and Subcategory
          </Button>,
        ]}
      ></Modal>
    </>
  );
};

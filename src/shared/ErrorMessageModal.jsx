import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@material-ui/core";
import styled from "styled-components";

const SimpleDialog = styled(Dialog)`
  && {
    width: 100%;
    height: 100%;
  }
`;

const MessageModal = ({confirmFunction}, ref) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  useImperativeHandle(ref, () => ({ handleOpen, handleClose }));

  return (
    <>
      <SimpleDialog open={openModal} onClose={handleClose}>
        <DialogTitle>오류</DialogTitle>
        <DialogContent>저장에 실패하였습니다.</DialogContent>
        <DialogActions>
          <Button autoFocus onClick={confirmFunction} variant="outlined">확인</Button>
        </DialogActions>
      </SimpleDialog>
    </>
  );
};

export default forwardRef(MessageModal);

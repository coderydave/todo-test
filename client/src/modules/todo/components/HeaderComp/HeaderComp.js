import React, { useState, useCallback } from "react";
import Moment from "react-moment";
import { Typography, Grid, Modal } from "@material-ui/core";
import { CreateModal } from './ModalComp/ModalComp'
import "./HeaderComp.css";


const date = new Date();

export default function HeaderComp({ open, setOpen, createData, count }) {
  const [modalData, setModalData] = useState({})

  const onChangeCallback = useCallback(
    event => {
      const { value, name } = event.target;
      const copy = { ...modalData, [name]: value };
      setModalData(copy);
    },
    [setModalData, modalData]
  );

  const onOkCallback = useCallback((values) => {
    createData(values)
  }, [createData]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="headercomp">
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={8}>
          <Grid style={{ padding: "10px" }} direction="column" container>
            <Typography variant="h4" color="primary">
              <Moment format="dddd, Do">{date}</Moment>
            </Typography>
            <Typography variant="h6" color="textSecondary">
              <Moment format="MMMM">{date}</Moment>
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container justify="flex-end" style={{ padding: "22px" }}>
            <Typography variant="subtitle1" color="textSecondary">
              {count} Task
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="flex-end"
        >
          <div className="buttondiv">
            <div className="btn" onClick={handleOpen}>+</div>
            <Modal style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(52, 52, 52, 0.8)' }}
              className="modal"
              open={open}
              onClose={handleClose}
              closeAfterTransition
            >
              <CreateModal onChange={onChangeCallback} onOkCallback={onOkCallback} handleClose={handleClose} />
            </Modal>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

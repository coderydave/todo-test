import React, { useState, useCallback } from 'react';
import { IconButton, Typography, Modal, Popover } from '@material-ui/core/';
import { EditModal } from '../../HeaderComp/ModalComp/ModalComp'
import MoreVertIcon from "@material-ui/icons/MoreVert";

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


export default function SimplePopover({ updateData, deleteData, item }) {

    const [anchorEl, setAnchorEl] = useState(null);

    const [openEditModal, setOpenEditModal] = useState(false);
    const [modalData, setModalData] = useState({})

    const deleteCallback = useCallback(() => {
        deleteData(item._id)
    }, [deleteData, item])

    const onChangeCallback = useCallback(
        event => {
            const { value, name } = event.target;
            const copy = { ...modalData, [name]: value };
            setModalData(copy);
        },
        [setModalData, modalData]
    );

    const onOkCallback = useCallback((values) => {
        updateData(values)
        setAnchorEl(null)
        setOpenEditModal(false);
    }, [setOpenEditModal, updateData]);

    const handleOpenEditModal = () => {
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setAnchorEl(null)
    };

    const handleClick = (event) => {
        console.log(event)
        setAnchorEl(event.nativeEvent.target);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <IconButton onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <IconButton>
                    <Modal style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(52, 52, 52, 0.8)' }}
                        className="modal"
                        open={openEditModal}
                        onClose={handleClose}
                        closeAfterTransition
                        disableBackdropClick={false}
                    >
                        <EditModal onChange={onChangeCallback} onOkCallback={onOkCallback} handleOpen={handleOpenEditModal} handleClose={handleCloseEditModal} item={item} />
                    </Modal>
                    <EditIcon style={{ color: "green", padding: "0px", margin: "0px" }} />
                    <Typography variant="body2" color="textSecondary" onClick={handleOpenEditModal}>
                        Edit
                    </Typography>
                </IconButton>
                <IconButton>
                    <DeleteIcon style={{ color: "red", padding: "0px", margin: "0px" }} />
                    <Typography variant="body2" color="textSecondary" onClick={deleteCallback}>
                        Delete
                    </Typography>
                </IconButton>
            </Popover>
        </>
    );
}
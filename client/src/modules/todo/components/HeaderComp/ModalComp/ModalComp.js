import React, { memo, useState, useCallback, useMemo } from "react";
import { TextField, Typography, Button, FormControl } from '@material-ui/core';

export const CreateModal = memo(({ handleClose, onOkCallback }) => {

  const [form, setForm] = useState()

  const onSubmit = useCallback(() => {
    onOkCallback(form)
  }, [form, onOkCallback])

  const isvalid = useMemo(() => {
    return form && form.tasktext && form.datetime && form.tasktext.length && form.datetime.length
  }, [form])

  const handleChange = useCallback(({ nativeEvent: { target } }) => {

    const { name, value } = target
    const data = { ...form }
    setForm({ ...data, [name]: value })
  }, [form, setForm])

  return (<div className="paper" style={{
    backgroundColor: "white",
    padding: "30px",
    width: "250px",
    height: "300px",
  }}>
    <Typography style={{ paddingBottom: "10px" }} variant="h5" color="primary" id="modal-title">Create Task</Typography>
    <FormControl required className="create-modal" >
      <TextField
        autoFocus
        required={true}
        onChange={handleChange}
        id="standard-basic"
        type="text"
        name="tasktext"
        label="Task Text"
        className="text-input"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        required={true}
        onChange={handleChange}
        id="datetime-local"
        name="datetime"
        label="Date + Time"
        type="datetime-local"
        className="time-input"
        InputLabelProps={{
          shrink: true,
        }}
      /><div className="button-div" style={{ marginTop: "72px", display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" disabled={!isvalid} color="primary" onClick={onSubmit}>
          Ok</Button>
        <Button variant="contained" onClick={handleClose}>Cancel</Button>
      </div>
    </FormControl>
  </div>
  )
});

export const EditModal = memo(({ item, handleClose, onOkCallback }) => {
  const [form, setForm] = useState(item)
  const handleChange = useCallback(({ nativeEvent: { target } }) => {

    const { name, value } = target
    const data = { ...form }
    setForm({ ...data, [name]: value })
  }, [form, setForm])

  const onSubmit = useCallback(() => {
    onOkCallback(form)
  }, [form, onOkCallback])

  const isvalid = useMemo(() => {
    return form && form.tasktext && form.datetime && form.tasktext.length && form.datetime.length
  }, [form])


  if (!form) {
    return null;
  }

  return (
    <div className="paper" style={{
      backgroundColor: "white",
      padding: "30px",
      width: "250px",
      height: "300px",
    }}>
      <Typography style={{ paddingBottom: "10px" }} variant="h5" color="primary" id="modal-title">Edit Task</Typography>
      <form className="edit-modal" >
        <TextField
          value={form.tasktext}
          required={true}
          onChange={handleChange}
          id="standard-basic"
          type="text"
          name="tasktext"
          label="Task Text"
          className="text-input"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          value={form.datetime}
          required={true}
          onChange={handleChange}
          id="datetime-local"
          name="datetime"
          label="Date + Time"
          type="datetime-local"
          className="time-input"

          InputLabelProps={{
            shrink: true,
          }}
        /><div className="button-div" style={{ marginTop: "72px", display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" color="primary" disabled={!isvalid} onClick={onSubmit}>
            Ok</Button>
          <Button variant="contained" onClick={handleClose}>Cancel</Button>
        </div>
      </form>
    </div>
  )
});
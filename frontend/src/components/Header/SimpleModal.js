import React, { useState } from 'react';
import { Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const SimpleModal = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const body = (
    <div className={classes.paper}>
      <h2 id='simple-modal-title'>Some text</h2>
      <p id='simple-modal-description'>Something else here</p>
    </div>
  )

  return (
    <div>
      <button type='button' onClick={handleOpen}>Open Modal</button>
      <Modal open={open} onClose={handleClose} aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'>
        {body}
      </Modal>
    </div>
  )
}

export default SimpleModal
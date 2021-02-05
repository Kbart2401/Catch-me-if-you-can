import React, { useState, useEffect } from "react";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	paper: {
		position: "absolute",
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: "4px solid #63B3ED",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif;',
		backgroundColor: "#3f51b5",
		color: "white",
	},
}));

const RivalModal = (props) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (props.modal === true) setOpen(true);
	}, [props]);

	const handleClose = () => {
		setOpen(false);
		props.setModal(false);
	};

	const body = (
		<div className={classes.paper}>
			<h2
				id="simple-modal-title"
				style={{ textAlign: "center", fontSize: "30px" }}
			>
				Already a rival!
			</h2>
		</div>
	);


	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{body}
			</Modal>
		</div>
	);
};

export default RivalModal;

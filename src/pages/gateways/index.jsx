import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import AddLocationIcon from "@material-ui/icons/AddLocation";

// shared
import REQUEST from "REQUEST/v0";
import PageContainer from "shared/PageContainer";
import PageCard from "shared/PageCard";
import MessageModal from "shared/MessageModal";
import ErrorMessageModal from "shared/ErrorMessageModal";

const Gateways = () => {
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const MessageModalRef = useRef();
  const ErrorMessageModalRef = useRef();

  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [gatewayList, setGatewayList] = useState([]);
  const [reload, setReload] = useState(false);

  const [registerForm, setRegisterForm] = useState({
    mac: "",
    name: "",
    latitude: "",
    longitude: "",
  });

  const [formError, setFormError] = useState({
    mac: {
      isError: false,
      errorMsg: "",
    },
    name: {
      isError: false,
      errorMsg: "",
    },
    latitude: {
      isError: false,
      errorMsg: "",
    },
    longitude: {
      isError: false,
      errorMsg: "",
    },
  });

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (value.length == 0) {
      let newFormError = {
        ...formError,
        [name]: { isError: true, errorMsg: "값을 입력해주십시오." },
      };
      setFormError(newFormError);
    } else if ((name == "latitude" || name == "longitude") && isNaN(value)) {
      let newFormError = {
        ...formError,
        [name]: { isError: true, errorMsg: "숫자를 입력해주십시오." },
      };
      setFormError(newFormError);
    } else {
      let newFormError = {
        ...formError,
        [name]: { isError: false, errorMsg: "" },
      };
      setFormError(newFormError);
    }
    let updateRegisterForm = { ...registerForm, [name]: value };
    setRegisterForm(updateRegisterForm);
  };

  const handleAddGateway = () => {
    if (
      formError.mac.isError ||
      formError.name.isError ||
      formError.latitude.isError ||
      formError.longitude.isError
    ) {
      ErrorMessageModalRef.current.handleOpen();
      return;
    }

    REQUEST.general
      .addGateway({
        name: registerForm.name,
        latitude: registerForm.latitude,
        longitude: registerForm.longitude,
      })
      .then((result) => {
        if (result.success) {
          MessageModalRef.current.handleOpen();
        } else {
          ErrorMessageModalRef.current.handleOpen();
        }
      });
    setOpenAddModal(false);
    setReload(!reload);
  };

  const closeMessageModal = () => {
    MessageModalRef.current.handleClose();
  };

  const closeErrorModal = () => {
    ErrorMessageModalRef.current.handleClose();
  };

  useEffect(() => {
    REQUEST.general.getGateways().then((result) => {
      if (result.success) {
        const updateGatewayList = result.gateways;
        setGatewayList(updateGatewayList);
      } else {
        console.log("Error");
      }
    });
  }, [reload]);

  return (
    <PageContainer>
      <PageCard>
        <Button variant="outlined" onClick={handleOpenAddModal}>
          <AddLocationIcon />
          Add
        </Button>
        <Table
          className="Gateways"
          aria-label="simple table"
          style={{ background: "rgb(0,0,0,0)" }}
        >
          <TableHead>
            <TableRow>
              {/* <TableCell>_id</TableCell> */}
              <TableCell align="center">MAC</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">latitude</TableCell>
              <TableCell align="center">longitude</TableCell>
              <TableCell align="center">Detect Count(Origin)</TableCell>
              <TableCell align="center">Detect Count(Charm)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gatewayList.map((gateway) => (
              <TableRow key={gateway._id}>
                {/* <TableCell component="th" scope="row">
                  {gateway._id}
                </TableCell> */}
                <TableCell align="center">{gateway.name}</TableCell>
                <TableCell align="center">{gateway.name}</TableCell>
                <TableCell align="center">{gateway.latitude}</TableCell>
                <TableCell align="center">{gateway.longitude}</TableCell>
                <TableCell align="center">{0}</TableCell>
                <TableCell align="center">{0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PageCard>
      <Dialog
        open={openAddModal}
        onClose={handleCloseAddModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Gateway</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="mac"
            label="MAC Address"
            onBlur={handleBlur}
            error={formError.mac.isError}
            helperText={formError.mac.errorMsg}
            // type="email"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            onBlur={handleBlur}
            error={formError.name.isError}
            helperText={formError.name.errorMsg}
            // type="email"
            fullWidth
          />
          <TextField
            autoFocus
            margin="normal"
            name="latitude"
            label="Latitude"
            onBlur={handleBlur}
            error={formError.latitude.isError}
            helperText={formError.latitude.errorMsg}
            // type="email"
          />
          <TextField
            autoFocus
            margin="normal"
            name="longitude"
            label="Longitude"
            onBlur={handleBlur}
            error={formError.longitude.isError}
            helperText={formError.longitude.errorMsg}
            // type="email"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddModal}>Cancel</Button>
          <Button onClick={handleAddGateway}>Save</Button>
        </DialogActions>
      </Dialog>
      <MessageModal ref={MessageModalRef} confirmFunction={closeMessageModal} />
      <ErrorMessageModal
        ref={ErrorMessageModalRef}
        confirmFunction={closeErrorModal}
      />
    </PageContainer>
  );
};

export default Gateways;

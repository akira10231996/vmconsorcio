import {
  Button,
  TextField,
  Modal,
  Fade,
  Tab,
  Tabs,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useSpring, easings } from "react-spring";
import { toast } from "react-toastify";
// import SaleFormB from '../../components/sale-form-b'
import { BASE_URL } from "../../env";

const ClienteComprandoModal = ({ data, open, handleClose }: any) => {
  const formik = useFormik({
    initialValues: {
      id: "",

      nome: "",

      email: "",

      tel1: "",

      tel2: "",

      obs: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      try {
        let res = await fetch(`${BASE_URL}/admin/cliente-comprando`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(values),
        });
        let data = await res.json();
        if (data["error"]) {
          // alert(data.error)
          toast.error(data.error);
        } else {
          toast.success("Operation successfull.");
          formik.resetForm();
          handleClose();
        }
      } catch (err) {
        toast.error("Operation failed.");
      }
    },
  });

  useEffect(() => {
    console.log("data", data);
    data && typeof data === "object" && formik.setValues(data);
  }, [data]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Modal
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Fade in={open}>
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
          <form
            className={` w-[50vw] h-[80vh] bg-white z-30  rounded-[16px] overflow-hidden`}
            onSubmit={formik.handleSubmit}
          >
            <div className="flex items-center py-2 pl-4">
              <span className="font-medium text-lg">Cadastrar</span>
              <Button
                variant="contained"
                style={{
                  background: " #080D3B",
                  margin: "0 16px 0 auto",
                }}
                type="submit"
              >
                salve
              </Button>
              <Button
                variant="contained"
                color="error"
                style={{
                  margin: "0 16px 0 0",
                }}
                onClick={() => handleClose()}
              >
                cancel
              </Button>
            </div>

            <div className="p-4 gap-4 flex flex-col">
              <div className="flex gap-4">
                <div className="flex flex-col w-1/2 gap-4 ">
                  <TextField
                    id="nome"
                    label="Nome"
                    variant="standard"
                    className="w-full"
                    value={formik.values.nome}
                    onChange={formik.handleChange}
                  />

                  <TextField
                    id="tel1"
                    label="TELEFONE 1"
                    variant="standard"
                    className="flex-1"
                    value={formik.values.tel1}
                    onChange={formik.handleChange}
                  />
                </div>

                <div className="w-1/2 flex flex-col h-full gap-4">
                  <TextField
                    id="email"
                    label="EMAIL"
                    variant="standard"
                    className="flex-1"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  <div className="flex items-center gap-4">
                    <TextField
                      id="tel2"
                      label="TELEFONE 2"
                      variant="standard"
                      className="flex-1"
                      value={formik.values.tel2}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>
              </div>
              <TextField
                id="obs"
                label="obs"
                variant="standard"
                multiline
                rows={4}
                value={formik.values.obs}
                onChange={formik.handleChange}
              />
            </div>
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;
  if (value !== index) return null;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
}
export default ClienteComprandoModal;
function setTab(newValue: number) {
  throw new Error("Function not implemented.");
}

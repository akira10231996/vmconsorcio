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

const AdminModal = ({ data, open, handleClose }: any) => {
  const [tab, setTab] = useState(1);
  const formik = useFormik({
    initialValues: {
      id: "",

      nome: "",

      code: "",

      razao_social: "",

      cnpj: "",

      website: "",

      endereco: "",

      numero: "",

      complemento: "",

      bairro: "",

      cidade: "",

      cep: "",

      estado: "",

      obs: "",

      email: "",

      tel1: "",

      tel2: "",

      ativo_modelo_resposta: false,

      modelo_resposta: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      try {
        let res = await fetch(`${BASE_URL}/admin/administrators`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
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
            className={` w-[80vw] h-[80vh] bg-white z-30  rounded-[16px] overflow-hidden`}
            onSubmit={formik.handleSubmit}
          >
            <div className="flex items-center">
              <Tabs
                value={tab}
                onChange={handleChange}
                aria-label="basic tabs example"
                style={{ borderBottom: "1px solid #ccc" }}
              >
                <Tab label="DADOS DA ADMINISTRADORA" />
                <Tab label="MODELO DE RESPOSTA PERSONOLIZADO" />
              </Tabs>
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

            <TabPanel value={tab} index={0} className="p-4 gap-4 flex flex-col">
              <TextField
                id="code"
                label="CÓD ADM"
                variant="standard"
                className="mb-4 self-start"
                value={formik.values.code}
                onChange={formik.handleChange}
              />
              <div className="flex gap-4">
                <div className="flex flex-col w-2/3 gap-4 ">
                  <TextField
                    id="nome"
                    label="NOME DE EXIBIÇÃO INTERNO "
                    variant="standard"
                    className="w-full"
                    value={formik.values.nome}
                    onChange={formik.handleChange}
                  />
                  <TextField
                    id="razao_social"
                    label="RAZÃO SOCIAL"
                    variant="standard"
                    className="w-full"
                    value={formik.values.razao_social}
                    onChange={formik.handleChange}
                  />
                  <div className="flex items-center gap-8">
                    <TextField
                      id="cnpj"
                      label="CNPJ"
                      variant="standard"
                      className="flex-1"
                      value={formik.values.cnpj}
                      onChange={formik.handleChange}
                    />
                    <TextField
                      id="website"
                      label="WEB SITE"
                      variant="standard"
                      className="flex-1"
                      value={formik.values.website}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="flex items-center gap-8">
                    <TextField
                      id="endereco"
                      label="ENDEREÇO"
                      variant="standard"
                      className="flex-1"
                      value={formik.values.endereco}
                      onChange={formik.handleChange}
                    />
                    <TextField
                      id="numero"
                      label="NUMERO"
                      variant="standard"
                      className="flex-1"
                      value={formik.values.numero}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <TextField
                      id="complemento"
                      label="COMPLEMENTO"
                      variant="standard"
                      className="flex-1"
                      value={formik.values.complemento}
                      onChange={formik.handleChange}
                    />
                    <TextField
                      id="bairro"
                      label="BAIRRO"
                      variant="standard"
                      className="flex-1"
                      value={formik.values.bairro}
                      onChange={formik.handleChange}
                    />
                    <TextField
                      id="cidade"
                      label="CIDADE"
                      variant="standard"
                      className="flex-1"
                      value={formik.values.cidade}
                      onChange={formik.handleChange}
                    />
                    <TextField
                      id="estado"
                      label="ESTADO"
                      variant="standard"
                      className="flex-1"
                      value={formik.values.estado}
                      onChange={formik.handleChange}
                    />
                    <TextField
                      id="cep"
                      label="CEP"
                      variant="standard"
                      className="flex-1"
                      value={formik.values.cep}
                      onChange={formik.handleChange}
                    />
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

                <div className="w-1/3 flex flex-col h-full gap-4">
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
                      id="tel1"
                      label="TELEFONE 1"
                      variant="standard"
                      className="flex-1"
                      value={formik.values.tel1}
                      onChange={formik.handleChange}
                    />
                    <TextField
                      id="tel2"
                      label="TELEFONE 2"
                      variant="standard"
                      className="flex-1"
                      value={formik.values.tel2}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <Button
                    variant="contained"
                    className="mt-12"
                    style={{
                      background: " #080D3B",
                      marginTop: 15,
                    }}
                    onClick={() => {}}
                  >
                    add
                  </Button>
                </div>
              </div>
            </TabPanel>
            <TabPanel value={tab} index={1} className="p-4 gap-4 flex flex-col">
              <span className="font-medium text-lg">
                Modelo de Resposta Personalizado
              </span>
              <FormControlLabel
                control={<Checkbox id="ativo_modelo_resposta" />}
                label="Ativar Modelo de Resposta Personalizado"
                value={formik.values.ativo_modelo_resposta}
                onChange={formik.handleChange}
              />
              <TextField
                id="modelo_resposta"
                label="Modelo de Resposta Personalizado"
                variant="outlined"
                multiline
                rows={20}
                value={formik.values.modelo_resposta}
                onChange={formik.handleChange}
              />
            </TabPanel>
            <TabPanel value={tab} index={2}>
              Item Three
            </TabPanel>
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
export default AdminModal;

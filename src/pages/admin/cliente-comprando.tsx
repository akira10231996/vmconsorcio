import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  FormControlLabel,
  Autocomplete,
} from "@mui/material";
import { Modal } from "antd";
import { BASE_URL } from "../../env";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import AdminModal from "./administrator-modal";
import Remove from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import Add from "@mui/icons-material/Add";
import Warning from "@mui/icons-material/Warning";
import ClienteComprandoModal from "./cliente-comprando-modal";
import useDarkMode from "../../hooks/use-dark-mode";

const ClienteComprando = () => {
  const [showModal, setShowModal] = useState(null) as any;
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    loadAdmins();
  }, []);

  const loadAdmins = async () => {
    let res = await fetch(`${BASE_URL}/admin/cliente-comprando`, {
      method: "GET",
    });
    let data = await res.json();
    setAdmins(data);
  };
  const dark = useDarkMode();
  const remove = async (id: any) => {
    Modal.confirm({
      title: "Do you Want to delete this item?",
      async onOk() {
        try {
          let res = await fetch(`${BASE_URL}/admin/cliente-comprando/${id}`, {
            method: "DELETE",
          });
          if (res.ok) {
            toast.success("Removed successfully!");
            loadAdmins();
          } else toast.error("Operation failed!");
        } catch (err) {
          toast.error("Operation failed!");
        }
      },
      okButtonProps: { color: "#080D3B" },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const filters = (
    <div className="flex w-full flex-col dark:bg-[#323b44] bg-white rounded-[4px]">
      <div className="flex w-full bg-primary-2 min-h-[50px] rounded-t-[4px] items-center pl-8">
        <span className="text-white text-lg font-medium ">
          Opções de filtro
        </span>
      </div>
      <div className="flex gap-4 p-4 pb-8">
        <div className="flex flex-1 flex-col gap-2">
          <TextField
            id="standard-basic"
            label="CÓD CLIENTE"
            variant="standard"
          />
          <FormControlLabel
            control={
              <Checkbox
                color={dark ? "info" : "error"}
                id="ativo_modelo_resposta"
              />
            }
            label="Não lidos"
          />

          <FormControlLabel
            control={
              <Checkbox
                color={dark ? "info" : "error"}
                id="ativo_modelo_resposta"
              />
            }
            label="Pendentes"
          />
        </div>
        <div className="h-full w-[1px] bg-gray-100" />
        <div className="flex flex-1 flex-col gap-4">
          <TextField
            id="standard-basic"
            label="CÓD COTA"
            variant="standard"
            className="flex-1"
          />
        </div>
        <div className="h-full w-[1px] bg-gray-100" />
        <div className="flex flex-1 flex-col gap-4">
          <TextField id="standard-basic" label="NOME" variant="standard" />
          <TextField id="standard-basic" label="EMAIL" variant="standard" />
          <span className="mb-[-20px]">VALOR DO BEM:</span>
          <div className="flex items-center gap-4">
            <TextField id="standard-basic" label="De" variant="standard" />
            <TextField id="standard-basic" label="à" variant="standard" />
          </div>
          <span className="mb-[-20px]">% Pago:</span>
          <div className="flex items-center gap-4">
            <TextField id="standard-basic" label="De" variant="standard" />
            <TextField id="standard-basic" label="à" variant="standard" />
          </div>
        </div>
        <div className="h-full w-[1px] bg-gray-100" />
        <div className="flex flex-1 flex-col gap-4">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={admins
              .filter((a: any) => a.nome!!)
              .map((a: any) => ({ label: a.nome }))}
            sx={{ width: 300 }}
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                label="*Administradora"
                variant="standard"
              />
            )}
          />

          <FormControl variant="standard">
            <InputLabel id="demo-simple-select-label">TIPO DE BEM</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="TIPO DE BEM"
              onChange={() => {}}
            >
              <MenuItem value={10}>IMÓVEL</MenuItem>
              <MenuItem value={20}>CARRO</MenuItem>
              <MenuItem value={30}>MOTO</MenuItem>
              <MenuItem value={30}>CAMINHÃO</MenuItem>
              <MenuItem value={30}>OUTRO</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="standard">
            <InputLabel id="demo-simple-select-label">
              SITUAÇÃO DA COTA
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="TIPO DE BEM"
              onChange={() => {}}
            >
              <MenuItem value={10}>IMÓVEL</MenuItem>
              <MenuItem value={20}>CARRO</MenuItem>
              <MenuItem value={30}>MOTO</MenuItem>
              <MenuItem value={30}>CAMINHÃO</MenuItem>
              <MenuItem value={30}>OUTRO</MenuItem>
            </Select>
          </FormControl>
          <span className="mb-[-11px]">Ultimo Contato:</span>
          <div className="flex items-center gap-4">
            <TextField id="standard-basic" label="De" variant="standard" />
            <TextField id="standard-basic" label="à" variant="standard" />
          </div>
          <span className="mb-[-11px]">Data do Cadastro:</span>
          <div className="flex items-center gap-4">
            <TextField id="standard-basic" label="De" variant="standard" />
            <TextField id="standard-basic" label="à" variant="standard" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col dark:text-white items-start w-full p-6">
      <span className="text-primary-3 font-medium text-2xl mb-8 dark:text-gray-100">
        Cliente Comprando
      </span>
      {filters}

      <div className="flex items-center mt-4">
        <Button
          variant="contained"
          style={{ background: " #080D3B" }}
          onClick={() => setShowModal(true)}
          endIcon={<Add />}
        >
          New
        </Button>
      </div>

      <TableContainer component={Paper} className="mt-8">
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Código </TableCell>
              <TableCell align="left">Data do Cadastro</TableCell>
              <TableCell align="right">Nome</TableCell>
              <TableCell align="right">Telefone</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Obs</TableCell>
              <TableCell align="right">Actions </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins.map((row: any) => (
              <TableRow key={row.cod}>
                <TableCell component="th" scope="row">
                  {row.cod}
                </TableCell>
                <TableCell component="th" scope="row"></TableCell>
                <TableCell align="left">{row.nome}</TableCell>
                <TableCell align="right">{row.tel1}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.obs}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="secondary"
                    onClick={() => setShowModal(row)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => remove(row.id)}>
                    <Remove />
                  </IconButton>
                  <Checkbox color={dark ? "info" : "error"} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ClienteComprandoModal
        open={showModal!!}
        handleClose={() => {
          setShowModal(false);
          loadAdmins();
        }}
        data={showModal}
      />
    </div>
  );
};

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default ClienteComprando;

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
import Filter from "@mui/icons-material/Filter";
import Warning from "@mui/icons-material/Warning";
import useDarkMode from "../../hooks/use-dark-mode";

const Admins = () => {
  const [showModal, setShowModal] = useState(null) as any;
  const [admins, setAdmins] = useState([]);

  const formikFilters = useFormik({
    initialValues: {
      nome: "",

      cnpj: "",
    },
    onSubmit: async (values) => {
      load();
    },
  });
  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    let res = await fetch(
      `${BASE_URL}/admin/administrators?${new URLSearchParams(
        formikFilters.values
      ).toString()}`,
      {
        method: "GET",
      }
    );
    let data = await res.json();
    setAdmins(data);
  };

  const remove = async (id: any) => {
    Modal.confirm({
      title: "Do you Want to delete this item?",
      async onOk() {
        try {
          let res = await fetch(`${BASE_URL}/admin/administrators/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
          if (res.ok) {
            toast.success("Removed successfully!");
            load();
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
  const dark = useDarkMode();

  const filters = (
    <form
      onSubmit={formikFilters.handleSubmit}
      className="flex w-full flex-col dark:bg-[#323b44] bg-white rounded-[4px] overflow-hidden"
    >
      <div className="flex w-full bg-primary-2 min-h-[50px]  items-center pl-8">
        <span className="text-white text-lg font-medium">Opções de filtro</span>
      </div>
      <div className="flex gap-4 p-4 pb-8">
        <div className="flex flex-1 flex-col gap-4">
          <TextField
            id="nome"
            label="Nome"
            variant="standard"
            value={formikFilters.values.nome}
            onChange={formikFilters.handleChange}
          />
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <TextField
            id="cnpj"
            label="CNPJ"
            variant="standard"
            className="flex-1"
            value={formikFilters.values.cnpj}
            onChange={formikFilters.handleChange}
          />
        </div>
      </div>
      <Button
        color="secondary"
        variant={dark ? "contained" : "outlined"}
        style={{ margin: 16, background: !dark ? "white" : "#080D3B" }}
        type="submit"
        className="self-start m-4"
      >
        Apply
      </Button>
    </form>
  );

  return (
    <div className="flex flex-col items-start w-full">
      <span className="text-primary-3 dark:text-white font-medium text-2xl mb-8">
        ADMINISTRATORS
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
              <TableCell>COD </TableCell>
              <TableCell align="left">NOME</TableCell>
              <TableCell align="right">TEL1 </TableCell>
              <TableCell align="right">OBS </TableCell>
              <TableCell align="right">Actions </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admins.map((row: any) => (
              <TableRow key={row.code}>
                <TableCell component="th" scope="row">
                  {row.code}
                </TableCell>
                <TableCell align="left">{row.nome}</TableCell>
                <TableCell align="right">{row.tel1}</TableCell>
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
                  <Checkbox />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AdminModal
        open={showModal!!}
        handleClose={() => {
          setShowModal(false);
          load();
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

export default Admins;

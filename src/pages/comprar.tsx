import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import Header from "../components/header";
import Footer from "../components/footer";

const Comprar = () => {
  const filters = (
    <div className="flex w-full flex-col">
      <div className="flex w-full bg-primary-2 min-h-[50px] rounded-t-[4px] items-center pl-8">
        <span className="text-white text-lg font-medium">Opções de filtro</span>
      </div>
      <div className="flex gap-4 p-4">
        <div className="flex flex-1 flex-col gap-4">
          <FormControl fullWidth variant="outlined">
            <InputLabel id="demo-simple-select-label">
              SITUAÇÃO DA COTA
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="SITUAÇÃO DA COTA "
              onChange={() => {}}
              sx={{ background: "white" }}
            >
              <MenuItem value={10}>CONTEMPLADO</MenuItem>
              <MenuItem value={20}>NÃO CONTEMPLADO</MenuItem>
              <MenuItem value={30}>TODAS</MenuItem>
            </Select>
          </FormControl>

          <TextField
            id="standard-basic"
            label="ADMINISTRADORA"
            variant="outlined"
          />

          <FormControl fullWidth variant="outlined">
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
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-col ">
            <div className="flex items-center gap-4">
              <span className="text-gray-700">Valor do bem:</span>
              <TextField
                id="standard-basic"
                label="DE "
                variant="outlined"
                className="flex-1"
              />
              <TextField
                id="standard-basic"
                label="A"
                variant="outlined"
                className="flex-1"
              />
            </div>
          </div>
          <div className="flex flex-col   ">
            <div className="flex items-center gap-4">
              <span className="text-gray-700">Valor da Entrada:</span>
              <TextField
                id="standard-basic"
                label="DE "
                variant="outlined"
                className="flex-1"
              />
              <TextField
                id="standard-basic"
                label="A"
                variant="outlined"
                className="flex-1"
              />
            </div>
          </div>
          <div className="flex flex-col   ">
            <div className="flex items-center gap-4">
              <span className="text-gray-700">Valor da parcela:</span>
              <TextField
                id="standard-basic"
                label="DE "
                variant="outlined"
                className="flex-1"
              />
              <TextField
                id="standard-basic"
                label="A"
                variant="outlined"
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div
      className="h-[100vh] w-[100vw] flex flex-col overflow-x-hidden"
      style={{
        background:
          "linear-gradient(to top, #400709, #450c0f, #4b1114, #501518, #561a1c, #581c1e, #5a1f21, #5c2123, #5a2124, #592224, #572225, #552225)",
      }}
    >
      <Header />
      <div className="flex flex-col p-6 bg-white w-full mt-[5rem] items-center  gap-12 ">
        <div className="flex max-w-[72%] w-full flex-col">
          {filters}
          <div className="flex items-center gap-4 ml-auto">
            <Button
              variant="contained"
              className="mt-12"
              style={{ background: " #080D3B", marginTop: 15 }}
              onClick={() => {}}
            >
              limpar filtero
            </Button>
            <Button
              variant="contained"
              className="mt-12"
              style={{ background: " #080D3B", marginTop: 15 }}
              onClick={() => {}}
            >
              filter
            </Button>
          </div>

          <span className="text-primary-3 font-medium text-lg self-center mt-6">
            Escolha uma de nossas opções abaixo, clique em "Mais informações"
            para entrar em contato
          </span>

          <TableContainer component={Paper} className="mt-8">
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell>CÓD COTA</TableCell>
                  <TableCell align="right">SITUAÇÃO DA COTA</TableCell>
                  <TableCell align="right">TIPO DE BEM</TableCell>
                  <TableCell align="right">ADMINISTRADORA</TableCell>
                  <TableCell align="right">VALOR DO CRÉDITO</TableCell>
                  <TableCell align="right">VALOR PAGO</TableCell>
                  <TableCell align="right">%PAGO</TableCell>
                  <TableCell align="right">VALOR DE PARCELA</TableCell>
                  <TableCell align="right">PARCELAS A PAGAR</TableCell>
                  <TableCell align="right">SALDO DEVEDOR</TableCell>
                  <TableCell align="right">VALOR DE ENTRADA</TableCell>
                  <TableCell align="right">OBS DE VENDA</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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

export default Comprar;

import {
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  InputAdornment,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, {
  FC,
  forwardRef,
  JSXElementConstructor,
  ReactElement,
  Ref,
  useEffect,
  useState,
} from "react";
import { useSpring, animated, easings } from "react-spring";
import UploadFile from "@mui/icons-material/UploadFile";
import { BASE_URL } from "../env";
import { toast } from "react-toastify";
import { IMaskInput } from "react-imask";
interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const TextMaskCustom = forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="(#0) 00000-0000"
        definitions={{
          "#": /[1-9]/,
        }}
        inputRef={
          ref as
            | Ref<ReactElement<string | JSXElementConstructor<any>>>
            | undefined as null
        }
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

const SaleFormA: FC<{ configs: { form: string } }> = ({ configs }) => {
  const [open, setOpen] = useState(false);
  const [helperTexts, setHelperTexts] = useState<
    { input: string; helperText: string }[]
  >([]);
  const [step, setStep] = useState(1);
  const height = 650; // configs?.form == "a" || configs?.form == "c" ? 550 :
  const [anim, api] = useSpring(() => ({
    from: { bottom: -height + 45 },
    config: {
      duration: 600,
      easing: easings.easeInOutSine,
    },
  }));
  const animLeftToRight = useSpring(() => ({
    from: { right: 400 },
    config: {
      duration: 1000,
      easing: easings.easeInOutCubic,
    },
  }));

  const [admins, setAdmins] = useState([]);
  const [state, setState] = useState({
    name: "",
    email: "",
    tel1: "",
    tel2: "",
    value: "",
    admin: "",
    obs: "",
    type: "",
    status: "",
    PaidrailsNum: "",
    unPaidrailsNum: "",
  });

  useEffect(() => {
    loadAdmins();

    animLeftToRight[1]({
      to: { right: 50 },
    });

    setTimeout(() => {
      api({
        to: { bottom: 0 },
        onRest(result, ctrl, item?) {
          setOpen(true);
        },
      });
    }, 1000);
  }, []);

  const loadAdmins = async () => {
    let res = await fetch(`${BASE_URL}/admin/administrators`, {
      method: "GET",
    });
    let data = await res.json();
    setAdmins(data);
  };

  const handle = () => {
    if (open) {
      api({
        to: { bottom: -height + 45 },
        onRest(result, ctrl, item?) {
          setOpen(false);
        },
      });
    } else {
      api({
        to: { bottom: 0 },
        onRest(result, ctrl, item?) {
          setOpen(true);
        },
      });
    }
  };

  const handleChange = (e: React.BaseSyntheticEvent) => {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  };
  const changeStep = (step: number) => {
    const { name, email, tel1, value } = state;

    if (name && email && tel1 && value) {
      setStep(step);
    } else {
      toast("Please fill the inputs", { type: "error" });
    }
  };
  const handleSubmit = () => {
    const { name, email, tel1, tel2, value, admin, obs, type, status } = state;
    if (name && email && tel1 && value) {
      let data = {
        name,
        email,
        tel1,
        tel2,
        value,
        admin,
        obs,
        type,
        status,
      };
      console.log(data);
      fetch(`${BASE_URL}/admin/sales`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            toast(data.error, { type: "error" });
          } else {
            toast("Sale created successfully", { type: "success" });
            setState({
              name: "",
              email: "",
              tel1: "",
              tel2: "",
              value: "",
              admin: "",
              obs: "",
              type: "",
              status: "",
              PaidrailsNum: "",
              unPaidrailsNum: "",
            });
            // navigate to thank you page
            window.location.href = "/thankyou";
          }
        });
    } else {
      toast("Please fill the inputs", { type: "error" });
    }
  };
  const b = {
    1: (
      <>
        <span className="text-neutral-900 font-semibold text-center self-center">
          Entre em contato, faremos uma proposta
        </span>

        <TextField
          id="standard-basic"
          label="*Nome"
          name="name"
          value={state.name}
          onChange={handleChange}
          variant="standard"
          error={helperTexts.find((e) => e.input == "name") ? true : false}
          helperText={helperTexts.find((e) => e.input == "name")?.helperText}
        />
        <TextField
          id="standard-basic"
          label="*Email"
          name="email"
          value={state.email}
          onChange={handleChange}
          variant="standard"
          error={helperTexts.find((e) => e.input == "email") ? true : false}
          helperText={helperTexts.find((e) => e.input == "email")?.helperText}
        />
        <div className="flex gap-4">
          <FormControl variant="standard">
            <InputLabel
              className={`${
                helperTexts.find((e) => e.input === "tel1") &&
                "MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium css-1d1r5q-MuiFormHelperText-root"
              }`}
              htmlFor="formatted-text-mask-input"
            >
              Telefone 1
            </InputLabel>
            <Input
              value={state.tel1}
              onChange={handleChange}
              name="tel1"
              id="formatted-text-mask-input"
              inputComponent={TextMaskCustom as any}
              error={helperTexts.find((e) => e.input === "tel1") !== undefined}
            />
            {helperTexts.find((e) => e.input === "tel1") && (
              <InputAdornment
                variant="standard"
                position="end"
                id="combo-box-demo-helper-text"
                sx={{ marginTop: 2, marginLeft: -0.1 }}
              >
                <span
                  id="combo-box-demo-helper-text"
                  className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium css-1d1r5q-MuiFormHelperText-root"
                >
                  {helperTexts.find((e) => e.input === "tel1")?.helperText}
                </span>
              </InputAdornment>
            )}
          </FormControl>
          <FormControl variant="standard">
            <InputLabel
              style={{ fontSize: 14 }}
              className={`${
                helperTexts.find((e) => e.input === "tel2") &&
                "MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium css-1d1r5q-MuiFormHelperText-root"
              }`}
              htmlFor="formatted-text-mask-input"
            >
              Telefone 2
            </InputLabel>
            <Input
              value={state.tel2}
              onChange={handleChange}
              name="tel2"
              error={helperTexts.find((e) => e.input === "tel2") !== undefined}
              id="formatted-text-mask-input"
              inputComponent={TextMaskCustom as any}
            />
            {helperTexts.find((e) => e.input === "tel2") && (
              <InputAdornment
                variant="standard"
                position="end"
                id="combo-box-demo-helper-text"
                sx={{ marginTop: 2, marginLeft: -0.1 }}
              >
                <span
                  id="combo-box-demo-helper-text"
                  className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium css-1d1r5q-MuiFormHelperText-root"
                >
                  {helperTexts.find((e) => e.input === "tel2")?.helperText}
                </span>
              </InputAdornment>
            )}
          </FormControl>
        </div>
        <div className="flex gap-4">
          <TextField
            id="standard-basic"
            label="*Valor do bem"
            type="number"
            placeholder="R$"
            name="value"
            value={state.value}
            onChange={handleChange}
            variant="standard"
            error={helperTexts.find((e) => e.input == "value") ? true : false}
            helperText={helperTexts.find((e) => e.input == "value")?.helperText}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            onChange={(e: any, value) => {
              setState({ ...state, admin: value?.label });
            }}
            options={admins
              .filter((a: any) => a?.nome!!)
              .map((a: any) => ({ label: a?.nome }))}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="*Administradora"
                error={
                  helperTexts.find((e) => e.input == "admin") ? true : false
                }
                helperText={
                  helperTexts.find((e) => e.input == "admin")?.helperText
                }
                value={state.admin}
                name="admin"
              />
            )}
          />
        </div>
        <TextField
          id="standard-basic"
          label="obs"
          variant="standard"
          multiline
          rows={4}
          name="obs"
          value={state.obs}
          onChange={handleChange}
          error={helperTexts.find((e) => e.input == "obs") ? true : false}
          helperText={helperTexts.find((e) => e.input == "obs")?.helperText}
        />
        <Button
          variant="contained"
          className="mt-12"
          style={{ background: " #080D3B", marginTop: 15 }}
          onClick={() => {
            const helpers: { input: string; helperText: string }[] = [];
            if (state.name === "") {
              helpers.push({
                input: "name",
                helperText: "Preencha o campo nome",
              });
            }
            if (state.email === "") {
              helpers.push({
                input: "email",
                helperText: "Preencha o campo email",
              });
            }
            if (state.tel1 === "") {
              helpers.push({
                input: "tel1",
                helperText: "Preencha o campo telefone 1",
              });
            }
            if (state.tel2 === "") {
              helpers.push({
                input: "tel2",
                helperText: "Preencha o campo telefone 2",
              });
            }
            if (state.value === "") {
              helpers.push({
                input: "value",
                helperText: "Preencha o campo valor",
              });
            }
            if (state.admin === "") {
              helpers.push({
                input: "admin",
                helperText: "Preencha o campo administradora",
              });
            }
            if (state.obs === "") {
              helpers.push({
                input: "obs",
                helperText: "Preencha o campo observação",
              });
            }
            if (helpers.length > 0) {
              setHelperTexts(helpers);
              setTimeout(() => {
                setHelperTexts([]);
              }, 5000);
            } else {
              handleSubmit();
            }
          }}
        >
          enviar
        </Button>
      </>
    ),
  };
  const f = {
    1: (
      <>
        <span className="text-neutral-900 font-semibold text-center self-center">
          Entre em contato, faremos uma proposta
        </span>
        <TextField
          id="standard-basic"
          label="*Nome"
          name="name"
          value={state.name}
          onChange={handleChange}
          variant="standard"
          error={helperTexts.find((e) => e.input == "name") ? true : false}
          helperText={helperTexts.find((e) => e.input == "name")?.helperText}
        />
        <TextField
          id="standard-basic"
          label="*Email"
          name="email"
          value={state.email}
          onChange={handleChange}
          variant="standard"
          error={helperTexts.find((e) => e.input == "email") ? true : false}
          helperText={helperTexts.find((e) => e.input == "email")?.helperText}
        />
        <div className="flex gap-4">
          <FormControl variant="standard">
            <InputLabel
              className={`${
                helperTexts.find((e) => e.input === "tel1") &&
                "MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium css-1d1r5q-MuiFormHelperText-root"
              }`}
              htmlFor="formatted-text-mask-input"
            >
              Telefone 1
            </InputLabel>
            <Input
              value={state.tel1}
              onChange={handleChange}
              name="tel1"
              id="formatted-text-mask-input"
              inputComponent={TextMaskCustom as any}
              error={helperTexts.find((e) => e.input === "tel1") !== undefined}
            />
            {helperTexts.find((e) => e.input === "tel1") && (
              <InputAdornment
                variant="standard"
                position="end"
                id="combo-box-demo-helper-text"
                sx={{ marginTop: 2, marginLeft: -0.1 }}
              >
                <span
                  id="combo-box-demo-helper-text"
                  className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium css-1d1r5q-MuiFormHelperText-root"
                >
                  {helperTexts.find((e) => e.input === "tel1")?.helperText}
                </span>
              </InputAdornment>
            )}
          </FormControl>
          <FormControl variant="standard">
            <InputLabel
              style={{ fontSize: 14 }}
              className={`${
                helperTexts.find((e) => e.input === "tel2") &&
                "MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium css-1d1r5q-MuiFormHelperText-root"
              }`}
              htmlFor="formatted-text-mask-input"
            >
              Telefone 2
            </InputLabel>
            <Input
              value={state.tel2}
              onChange={handleChange}
              name="tel2"
              error={helperTexts.find((e) => e.input === "tel2") !== undefined}
              id="formatted-text-mask-input"
              inputComponent={TextMaskCustom as any}
            />
            {helperTexts.find((e) => e.input === "tel2") && (
              <InputAdornment
                variant="standard"
                position="end"
                id="combo-box-demo-helper-text"
                sx={{ marginTop: 2, marginLeft: -0.1 }}
              >
                <span
                  id="combo-box-demo-helper-text"
                  className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium css-1d1r5q-MuiFormHelperText-root"
                >
                  {helperTexts.find((e) => e.input === "tel2")?.helperText}
                </span>
              </InputAdornment>
            )}
          </FormControl>
        </div>
        <div className="flex gap-4">
          <TextField
            id="standard-basic"
            label="*Valor do bem"
            type="number"
            placeholder="R$"
            name="value"
            value={state.value}
            onChange={handleChange}
            variant="standard"
            error={helperTexts.find((e) => e.input == "value") ? true : false}
            helperText={helperTexts.find((e) => e.input == "value")?.helperText}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            onChange={(e: any, value) => {
              setState({ ...state, admin: value?.label });
            }}
            options={admins
              .filter((a: any) => a?.nome!!)
              .map((a: any) => ({ label: a?.nome }))}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                error={
                  helperTexts.find((e) => e.input == "admin") ? true : false
                }
                helperText={
                  helperTexts.find((e) => e.input == "admin")?.helperText
                }
                label="*Administradora"
                name="admin"
                value={state.admin}
              />
            )}
          />
        </div>
        <TextField
          id="standard-basic"
          label="obs"
          variant="standard"
          multiline
          name="obs"
          rows={4}
          onChange={handleChange}
          error={helperTexts.find((e) => e.input == "obs") ? true : false}
          helperText={helperTexts.find((e) => e.input == "obs")?.helperText}
          value={state.obs}
        />
        <Button
          variant="contained"
          className="mt-12"
          style={{ background: " #080D3B", marginTop: 15 }}
          onClick={() => {
            const helpers: { input: string; helperText: string }[] = [];
            if (state.name === "") {
              helpers.push({
                input: "name",
                helperText: "Preencha o campo nome",
              });
            }
            if (state.email === "") {
              helpers.push({
                input: "email",
                helperText: "Preencha o campo email",
              });
            }
            if (state.tel1 === "") {
              helpers.push({
                input: "tel1",
                helperText: "Preencha o campo telefone 1",
              });
            }
            if (state.tel2 === "") {
              helpers.push({
                input: "tel2",
                helperText: "Preencha o campo telefone 2",
              });
            }
            if (state.value === "") {
              helpers.push({
                input: "value",
                helperText: "Preencha o campo valor",
              });
            }
            if (state.admin === "") {
              helpers.push({
                input: "admin",
                helperText: "Preencha o campo administradora",
              });
            }
            if (state.obs === "") {
              helpers.push({
                input: "obs",
                helperText: "Preencha o campo observação",
              });
            }
            if (helpers.length > 0) {
              setHelperTexts(helpers);
            } else {
              changeStep(2);
            }
          }}
        >
          enviar
        </Button>
      </>
    ),
    2: (
      <>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            Entre em contato, faremos uma proposta
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Sim, Tenho Mais De 30% Pago"
            />
            <FormControlLabel
              value="male"
              control={<Radio />}
              label="Não, Não Tenho Mais De 30% Pago"
            />
          </RadioGroup>
        </FormControl>

        <Button
          variant="contained"
          className="mt-12"
          style={{ background: " #080D3B", marginTop: 15 }}
          onClick={() => setStep(3)}
        >
          enviar
        </Button>
      </>
    ),
    3: (
      <>
        <span className="text-neutral-900 text-center self-center">
          Você tem um EXTRATO do consórcio ? (pdf, word, jpg) até heightkb
        </span>
        <Button
          variant="outlined"
          className="mt-12"
          style={{ marginTop: 15 }}
          onClick={() => setStep(4)}
          startIcon={<UploadFile />}
        >
          Escolher Arquivo
        </Button>
        <Button
          variant="contained"
          className="mt-12"
          style={{ background: " #080D3B", marginTop: 15 }}
          onClick={() => setStep(4)}
        >
          enviar
        </Button>
      </>
    ),
    4: (
      <>
        <TextField
          id="standard-basic"
          label="Quantos reais (R$) AINDA FALTAM pagar"
          type="number"
          required
          variant="standard"
          value={state.unPaidrailsNum}
          onChange={handleChange}
          name="unPaidrailsNum"
          error={
            helperTexts.find((e) => e.input == "unPaidrailsNum") ? true : false
          }
          helperText={
            helperTexts.find((e) => e.input == "unPaidrailsNum")?.helperText
          }
        />
        <Button
          variant="contained"
          className="mt-12"
          style={{ background: " #080D3B", marginTop: 15 }}
          onClick={() => {
            const helpers: { input: string; helperText: string }[] = [];
            if (state.unPaidrailsNum === "") {
              helpers.push({
                input: "unPaidrailsNum",
                helperText: "Preencha o campo valor",
              });
            }
            if (helpers.length > 0) {
              setHelperTexts(helpers);
            } else {
              changeStep(5);
            }
          }}
        >
          enviar
        </Button>
      </>
    ),
    5: (
      <>
        <span className="text-neutral-900 font-semibold text-center self-center">
          E por ultimo preencha as informações abaixo
        </span>
        <div className="flex gap-4">
          <TextField
            id="standard-basic"
            label="*Valor do bem"
            type="number"
            placeholder="R$"
            variant="standard"
            name="value"
            required
            error={helperTexts.find((e) => e.input == "value") ? true : false}
            value={state.value}
            onChange={handleChange}
            helperText={helperTexts.find((e) => e.input == "value")?.helperText}
          />
          <TextField
            id="standard-basic"
            label="Quantos reais (R$) você JÁ pagou"
            type="number"
            name="PaidrailsNum"
            variant="standard"
            required
            value={state.PaidrailsNum}
            error={
              helperTexts.find((e) => e.input == "PaidrailsNum") ? true : false
            }
            helperText={
              helperTexts.find((e) => e.input == "PaidrailsNum")?.helperText
            }
            onChange={handleChange}
          />
        </div>

        <Button
          variant="contained"
          className="mt-12"
          style={{ background: " #080D3B", marginTop: 15 }}
          onClick={() => {
            const helpers: { input: string; helperText: string }[] = [];

            if (state.value === "") {
              helpers.push({
                input: "value",
                helperText: "Preencha o campo valor",
              });
            }

            if (state.PaidrailsNum === "") {
              helpers.push({
                input: "PaidrailsNum",
                helperText: "Preencha o campo valor",
              });
            }
            if (helpers.length > 0) {
              setHelperTexts(helpers);
              setTimeout(() => {
                setHelperTexts([]);
              }, 5000);
            } else {
              handleSubmit();
            }
          }}
        >
          enviar
        </Button>
      </>
    ),
  };
  const a = {
    1: (
      <>
        <span className="text-neutral-900 font-semibold text-center self-center">
          Entre em contato, faremos uma proposta
        </span>

        <TextField
          id="standard-basic"
          label="*Nome"
          name="name"
          value={state.name}
          onChange={handleChange}
          variant="standard"
          error={helperTexts.find((e) => e.input == "name") ? true : false}
          helperText={helperTexts.find((e) => e.input == "name")?.helperText}
        />
        <TextField
          id="standard-basic"
          label="*Email"
          name="email"
          value={state.email}
          onChange={handleChange}
          variant="standard"
          error={helperTexts.find((e) => e.input == "email") ? true : false}
          helperText={helperTexts.find((e) => e.input == "email")?.helperText}
        />
        <div className="flex gap-4">
          <FormControl variant="standard">
            <InputLabel
              className={`${
                helperTexts.find((e) => e.input === "tel1") &&
                "MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium css-1d1r5q-MuiFormHelperText-root"
              }`}
              htmlFor="formatted-text-mask-input"
            >
              Telefone 1
            </InputLabel>
            <Input
              value={state.tel1}
              onChange={handleChange}
              name="tel1"
              id="formatted-text-mask-input"
              inputComponent={TextMaskCustom as any}
              error={helperTexts.find((e) => e.input === "tel1") !== undefined}
            />
            {helperTexts.find((e) => e.input === "tel1") && (
              <InputAdornment
                variant="standard"
                position="end"
                id="combo-box-demo-helper-text"
                sx={{ marginTop: 2, marginLeft: -0.1 }}
              >
                <span
                  id="combo-box-demo-helper-text"
                  className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium css-1d1r5q-MuiFormHelperText-root"
                >
                  {helperTexts.find((e) => e.input === "tel1")?.helperText}
                </span>
              </InputAdornment>
            )}
          </FormControl>
          <FormControl variant="standard">
            <InputLabel
              style={{ fontSize: 14 }}
              className={`${
                helperTexts.find((e) => e.input === "tel2") &&
                "MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium css-1d1r5q-MuiFormHelperText-root"
              }`}
              htmlFor="formatted-text-mask-input"
            >
              Telefone 2
            </InputLabel>
            <Input
              value={state.tel2}
              onChange={handleChange}
              name="tel2"
              error={helperTexts.find((e) => e.input === "tel2") !== undefined}
              id="formatted-text-mask-input"
              inputComponent={TextMaskCustom as any}
            />
            {helperTexts.find((e) => e.input === "tel2") && (
              <InputAdornment
                variant="standard"
                position="end"
                id="combo-box-demo-helper-text"
                sx={{ marginTop: 2, marginLeft: -0.1 }}
              >
                <span
                  id="combo-box-demo-helper-text"
                  className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium css-1d1r5q-MuiFormHelperText-root"
                >
                  {helperTexts.find((e) => e.input === "tel2")?.helperText}
                </span>
              </InputAdornment>
            )}
          </FormControl>
        </div>
        <div className="flex gap-4">
          <TextField
            id="standard-basic"
            label="*Valor do bem"
            type="number"
            placeholder="R$"
            name="value"
            value={state.value}
            onChange={handleChange}
            variant="standard"
            error={helperTexts.find((e) => e.input == "value") ? true : false}
            helperText={helperTexts.find((e) => e.input == "value")?.helperText}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            onChange={(e: any, value) => {
              if (value) {
                setState({ ...state, admin: value.label });
              }
            }}
            options={admins
              .filter((a: any) => a.nome!!)
              .map((a: any) => ({ label: a.nome }))}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                error={
                  helperTexts.find((e) => e.input == "admin") ? true : false
                }
                helperText={
                  helperTexts.find((e) => e.input == "admin")?.helperText
                }
                label="*Administradora"
                name="admin"
                value={state.admin}
                onChange={handleChange}
              />
            )}
          />
        </div>
        <TextField
          id="standard-basic"
          label="obs"
          variant="standard"
          name="obs"
          multiline
          rows={4}
          error={helperTexts.find((e) => e.input == "obs") ? true : false}
          helperText={helperTexts.find((e) => e.input == "obs")?.helperText}
          value={state.obs}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          className="mt-12"
          style={{ background: " #080D3B", marginTop: 15 }}
          onClick={() => {
            const helpers: { input: string; helperText: string }[] = [];
            if (state.name === "") {
              helpers.push({
                input: "name",
                helperText: "Preencha o campo nome",
              });
            }
            if (state.email === "") {
              helpers.push({
                input: "email",
                helperText: "Preencha o campo email",
              });
            }
            if (state.tel1 === "") {
              helpers.push({
                input: "tel1",
                helperText: "Preencha o campo telefone 1",
              });
            }
            if (state.tel2 === "") {
              helpers.push({
                input: "tel2",
                helperText: "Preencha o campo telefone 2",
              });
            }
            if (state.value === "") {
              helpers.push({
                input: "value",
                helperText: "Preencha o campo valor",
              });
            }
            if (state.admin === "") {
              helpers.push({
                input: "admin",
                helperText: "Preencha o campo administradora",
              });
            }
            if (state.obs === "") {
              helpers.push({
                input: "obs",
                helperText: "Preencha o campo observação",
              });
            }
            if (helpers.length > 0) {
              setHelperTexts(helpers);
            } else {
              changeStep(2);
            }
          }}
        >
          enviar
        </Button>
      </>
    ),
    2: (
      <>
        <TextField
          id="standard-basic"
          label="*Quantos reais (R$) você JÁ pagou"
          type="number"
          variant="standard"
          value={state.PaidrailsNum}
          name="PaidrailsNum"
          onChange={handleChange}
          placeholder="R$"
          error={
            helperTexts.find((e) => e.input == "PaidrailsNum") ? true : false
          }
          helperText={
            helperTexts.find((e) => e.input == "PaidrailsNum")?.helperText
          }
        />
        <Button
          variant="contained"
          className="mt-12"
          style={{ background: " #080D3B", marginTop: 15 }}
          onClick={() => {
            const helpers: { input: string; helperText: string }[] = [];

            if (state.PaidrailsNum === "") {
              helpers.push({
                input: "PaidrailsNum",
                helperText: "Preencha o campo valor",
              });
            }

            if (helpers.length > 0) {
              setHelperTexts(helpers);
            } else {
              setStep(3);
            }
          }}
        >
          enviar
        </Button>
      </>
    ),
    3: (
      <>
        <span className="text-neutral-900 text-center self-center">
          Você tem um EXTRATO do consórcio ? (pdf, word, jpg) até heightkb
        </span>
        <Button
          variant="outlined"
          className="mt-12"
          style={{ marginTop: 15 }}
          onClick={() => setStep(3)}
          startIcon={<UploadFile />}
        >
          Escolher Arquivo
        </Button>
        <Button
          variant="contained"
          className="mt-12"
          style={{ background: " #080D3B", marginTop: 15 }}
          onClick={() => setStep(4)}
        >
          enviar
        </Button>
      </>
    ),
    4: (
      <>
        <TextField
          id="standard-basic"
          label="Quantos reais (R$) AINDA FALTAM pagar"
          type="number"
          variant="standard"
          name="unPaidrailsNum"
          required
          value={state.unPaidrailsNum}
          onChange={handleChange}
          error={
            helperTexts.find((e) => e.input == "unPaidrailsNum") ? true : false
          }
          helperText={
            helperTexts.find((e) => e.input == "unPaidrailsNum")?.helperText
          }
        />
        <Button
          variant="contained"
          className="mt-12"
          style={{ background: " #080D3B", marginTop: 15 }}
          onClick={() => {
            const helpers: { input: string; helperText: string }[] = [];
            if (state.unPaidrailsNum === "") {
              helpers.push({
                input: "unPaidrailsNum",
                helperText: "Preencha o campo valor",
              });
            }
            if (helpers.length > 0) {
              setHelperTexts(helpers);
            } else {
              setStep(5);
            }
          }}
        >
          enviar
        </Button>
      </>
    ),
    5: (
      <>
        <div className="flex gap-4">
          <TextField
            id="standard-basic"
            label="Tipo de bem"
            variant="standard"
            name="type"
            value={state.type}
            onChange={handleChange}
            error={helperTexts.find((e) => e.input == "type") ? true : false}
            helperText={helperTexts.find((e) => e.input == "type")?.helperText}
          />
          <TextField
            id="standard-basic"
            label="Situação da Cota"
            variant="standard"
            name="status"
            value={state.status}
            onChange={handleChange}
            error={helperTexts.find((e) => e.input == "status") ? true : false}
            helperText={
              helperTexts.find((e) => e.input == "status")?.helperText
            }
          />
        </div>

        <Button
          variant="contained"
          className="mt-12"
          style={{ background: " #080D3B", marginTop: 15 }}
          onClick={() => {
            const helpers: { input: string; helperText: string }[] = [];
            if (state.type === "") {
              helpers.push({
                input: "type",
                helperText: "Preencha o campo tipo",
              });
            }
            if (state.status === "") {
              helpers.push({
                input: "status",
                helperText: "Preencha o campo situação",
              });
            }
            if (helpers.length > 0) {
              setHelperTexts(helpers);
            } else {
              handleSubmit();
            }
          }}
        >
          enviar
        </Button>
      </>
    ),
  };

  const c = {
    1: (
      <>
        <span className="text-neutral-900 font-semibold text-center self-center">
          Entre em contato, faremos uma proposta
        </span>

        <TextField
          error={helperTexts.find((e) => e.input == "name") ? true : false}
          helperText={helperTexts.find((e) => e.input == "name")?.helperText}
          id="standard-basic"
          name="name"
          label="*Nome"
          variant="standard"
          value={state.name}
          onChange={handleChange}
        />
        <TextField
          id="standard-basic"
          name="email"
          label="*Email"
          variant="standard"
          onChange={handleChange}
          error={helperTexts.find((e) => e.input == "email") ? true : false}
          helperText={helperTexts.find((e) => e.input == "email")?.helperText}
        />
        <div className="flex gap-4">
          <FormControl variant="standard">
            <InputLabel
              className={`${
                helperTexts.find((e) => e.input === "tel1") &&
                "MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium css-1d1r5q-MuiFormHelperText-root"
              }`}
              htmlFor="formatted-text-mask-input"
            >
              Telefone 1
            </InputLabel>
            <Input
              value={state.tel1}
              onChange={handleChange}
              name="tel1"
              id="formatted-text-mask-input"
              inputComponent={TextMaskCustom as any}
              error={helperTexts.find((e) => e.input === "tel1") !== undefined}
            />
            {helperTexts.find((e) => e.input === "tel1") && (
              <InputAdornment
                variant="standard"
                position="end"
                id="combo-box-demo-helper-text"
                sx={{ marginTop: 2, marginLeft: -0.1 }}
              >
                <span
                  id="combo-box-demo-helper-text"
                  className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium css-1d1r5q-MuiFormHelperText-root"
                >
                  {helperTexts.find((e) => e.input === "tel1")?.helperText}
                </span>
              </InputAdornment>
            )}
          </FormControl>
          <FormControl variant="standard">
            <InputLabel
              style={{ fontSize: 14 }}
              className={`${
                helperTexts.find((e) => e.input === "tel2") &&
                "MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium css-1d1r5q-MuiFormHelperText-root"
              }`}
              htmlFor="formatted-text-mask-input"
            >
              Telefone 2
            </InputLabel>
            <Input
              value={state.tel2}
              onChange={handleChange}
              name="tel2"
              error={helperTexts.find((e) => e.input === "tel1") !== undefined}
              id="formatted-text-mask-input"
              inputComponent={TextMaskCustom as any}
            />
            {helperTexts.find((e) => e.input === "tel2") && (
              <InputAdornment
                variant="standard"
                position="end"
                id="combo-box-demo-helper-text"
                sx={{ marginTop: 2, marginLeft: -0.1 }}
              >
                <span
                  id="combo-box-demo-helper-text"
                  className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium css-1d1r5q-MuiFormHelperText-root"
                >
                  {helperTexts.find((e) => e.input === "tel2")?.helperText}
                </span>
              </InputAdornment>
            )}
          </FormControl>
        </div>
        <div className="flex gap-4">
          <TextField
            id="standard-basic"
            label="*Valor do bem"
            type="number"
            placeholder="R$"
            name="value"
            variant="standard"
            value={state.value}
            onChange={handleChange}
            error={helperTexts.find((e) => e.input == "value") ? true : false}
            helperText={helperTexts.find((e) => e.input == "value")?.helperText}
          />
          <TextField
            id="standard-basic"
            label="Quantos reais (R$) você JÁ pagou"
            type="number"
            name="PaidrailsNum"
            variant="standard"
            required
            value={state.PaidrailsNum}
            onChange={handleChange}
            error={
              helperTexts.find((e) => e.input == "PaidrailsNum") ? true : false
            }
            helperText={
              helperTexts.find((e) => e.input == "PaidrailsNum")?.helperText
            }
          />
        </div>
        <Button
          variant="contained"
          className="mt-12"
          style={{ background: " #080D3B", marginTop: 15 }}
          onClick={() => {
            const helpers: { input: string; helperText: string }[] = [];
            if (state.name === "") {
              helpers.push({
                input: "name",
                helperText: "Preencha o campo nome",
              });
            }
            if (state.email === "") {
              helpers.push({
                input: "email",
                helperText: "Preencha o campo email",
              });
            }
            if (state.tel1 === "") {
              helpers.push({
                input: "tel1",
                helperText: "Preencha o campo telefone 1",
              });
            }
            if (state.tel2 === "") {
              helpers.push({
                input: "tel2",
                helperText: "Preencha o campo telefone 2",
              });
            }
            if (state.value === "") {
              helpers.push({
                input: "value",
                helperText: "Preencha o campo valor",
              });
            }
            if (state.PaidrailsNum === "") {
              helpers.push({
                input: "PaidrailsNum",
                helperText: "Preencha o campo administradora",
              });
            }
            if (helpers.length > 0) {
              setHelperTexts(helpers);
            } else {
              setStep(2);
            }
          }}
        >
          enviar
        </Button>
      </>
    ),
    2: (
      <>
        <span className="text-neutral-900 text-center self-center">
          Você tem um EXTRATO do consórcio ? (pdf, word, jpg) até heightkb
        </span>
        <Button
          variant="outlined"
          className="mt-12"
          style={{ marginTop: 15 }}
          onClick={() => setStep(3)}
          startIcon={<UploadFile />}
        >
          Escolher Arquivo
        </Button>
        <Button
          variant="contained"
          className="mt-12"
          style={{ background: " #080D3B", marginTop: 15 }}
          onClick={() => setStep(3)}
        >
          enviar
        </Button>
      </>
    ),
    3: (
      <>
        <TextField
          id="standard-basic"
          label="Quantos reais (R$) AINDA FALTAM pagar"
          type="number"
          variant="standard"
          name="unPaidrailsNum"
          required
          value={state.unPaidrailsNum}
          onChange={handleChange}
          error={
            helperTexts.find((e) => e.input == "unPaidrailsNum") ? true : false
          }
          helperText={
            helperTexts.find((e) => e.input == "unPaidrailsNum")?.helperText
          }
        />
        <Button
          variant="contained"
          className="mt-12"
          style={{ background: " #080D3B", marginTop: 15 }}
          onClick={() => {
            const helpers: { input: string; helperText: string }[] = [];
            if (state.unPaidrailsNum === "") {
              helpers.push({
                input: "unPaidrailsNum",
                helperText: "Preencha o campo valor",
              });
            }
            if (helpers.length > 0) {
              setHelperTexts(helpers);
            } else {
              setStep(4);
            }
          }}
        >
          enviar
        </Button>
      </>
    ),
    4: (
      <>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={admins
            .filter((a: any) => a.nome!!)
            .map((a: any) => ({ label: a.nome }))}
          sx={{ width: 300 }}
          onChange={(e: any, value) => {
            if (value) setState({ ...state, admin: value?.label });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              error={helperTexts.find((e) => e.input == "admin") ? true : false}
              helperText={
                helperTexts.find((e) => e.input == "admin")?.helperText
              }
              label="*Administradora"
            />
          )}
        />
        <Button
          variant="contained"
          className="mt-12"
          style={{ background: " #080D3B", marginTop: 15 }}
          onClick={() => {
            const helpers: { input: string; helperText: string }[] = [];
            if (state.admin === "") {
              helpers.push({
                input: "admin",
                helperText: "Preencha o campo administradora",
              });
            }
            if (helpers.length > 0) {
              setHelperTexts(helpers);
            } else {
              setStep(5);
            }
          }}
        >
          enviar
        </Button>
      </>
    ),
    5: (
      <>
        <span className="text-neutral-900 font-semibold text-center self-center">
          E por ultimo preencha as informações abaixo
        </span>
        <div className="flex gap-4">
          <TextField
            id="standard-basic"
            label="*Valor do bem"
            type="number"
            placeholder="R$"
            variant="standard"
            required
            error={helperTexts.find((e) => e.input == "value") ? true : false}
            helperText={helperTexts.find((e) => e.input == "value")?.helperText}
            name="value"
            value={state.value}
            onChange={handleChange}
          />
          <TextField
            id="standard-basic"
            label="Quantos reais (R$) você JÁ pagou"
            type="number"
            name="PaidrailsNum"
            variant="standard"
            required
            value={state.PaidrailsNum}
            onChange={handleChange}
            error={
              helperTexts.find((e) => e.input == "PaidrailsNum") ? true : false
            }
            helperText={
              helperTexts.find((e) => e.input == "PaidrailsNum")?.helperText
            }
          />
        </div>
        <TextField
          id="standard-basic"
          label="obs"
          name="obs"
          value={state.obs}
          onChange={handleChange}
          variant="standard"
          multiline
          rows={4}
          error={helperTexts.find((e) => e.input == "obs") ? true : false}
          helperText={helperTexts.find((e) => e.input == "obs")?.helperText}
        />
        <Button
          variant="contained"
          className="mt-12"
          style={{ background: " #080D3B", marginTop: 15 }}
          onClick={() => {
            const helpers: { input: string; helperText: string }[] = [];
            if (state.value === "") {
              helpers.push({
                input: "value",
                helperText: "Preencha o campo valor",
              });
            }
            if (state.obs === "") {
              helpers.push({
                input: "obs",
                helperText: "Preencha o campo obs",
              });
            }
            if (state.PaidrailsNum === "") {
              helpers.push({
                input: "PaidrailsNum",
                helperText: "Preencha o campo obs",
              });
            }
            if (helpers.length > 0) {
              setHelperTexts(helpers);
            } else {
              handleSubmit();
            }
          }}
        >
          enviar
        </Button>
      </>
    ),
  };

  const d = {
    1: (
      <>
        <span className="text-neutral-900 font-semibold text-center self-center">
          Entre em contato, faremos uma proposta
        </span>

        <TextField
          id="standard-basic"
          label="*Nome"
          variant="standard"
          helperText={helperTexts.find((e) => e.input == "name")?.helperText}
          error={helperTexts.find((e) => e.input == "name") ? true : false}
          name="name"
          value={state.name}
          onChange={handleChange}
        />
        <TextField
          id="standard-basic"
          label="*Email"
          variant="standard"
          error={helperTexts.find((e) => e.input == "email") ? true : false}
          helperText={helperTexts.find((e) => e.input == "email")?.helperText}
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <div className="flex gap-4">
          <FormControl variant="standard">
            <InputLabel
              className={`${
                helperTexts.find((e) => e.input === "tel1") &&
                "MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium css-1d1r5q-MuiFormHelperText-root"
              }`}
              htmlFor="formatted-text-mask-input"
            >
              Telefone 1
            </InputLabel>
            <Input
              value={state.tel1}
              onChange={handleChange}
              name="tel1"
              id="formatted-text-mask-input"
              inputComponent={TextMaskCustom as any}
              error={helperTexts.find((e) => e.input === "tel1") !== undefined}
            />
            {helperTexts.find((e) => e.input === "tel1") && (
              <InputAdornment
                variant="standard"
                position="end"
                id="combo-box-demo-helper-text"
                sx={{ marginTop: 2, marginLeft: -0.1 }}
              >
                <span
                  id="combo-box-demo-helper-text"
                  className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium css-1d1r5q-MuiFormHelperText-root"
                >
                  {helperTexts.find((e) => e.input === "tel1")?.helperText}
                </span>
              </InputAdornment>
            )}
          </FormControl>
          <FormControl variant="standard">
            <InputLabel
              style={{ fontSize: 14 }}
              className={`${
                helperTexts.find((e) => e.input === "tel2") &&
                "MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium css-1d1r5q-MuiFormHelperText-root"
              }`}
              htmlFor="formatted-text-mask-input"
            >
              Telefone 2
            </InputLabel>
            <Input
              value={state.tel2}
              onChange={handleChange}
              name="tel2"
              error={helperTexts.find((e) => e.input === "tel1") !== undefined}
              id="formatted-text-mask-input"
              inputComponent={TextMaskCustom as any}
            />
            {helperTexts.find((e) => e.input === "tel2") && (
              <InputAdornment
                variant="standard"
                position="end"
                id="combo-box-demo-helper-text"
                sx={{ marginTop: 2, marginLeft: -0.1 }}
              >
                <span
                  id="combo-box-demo-helper-text"
                  className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium css-1d1r5q-MuiFormHelperText-root"
                >
                  {helperTexts.find((e) => e.input === "tel2")?.helperText}
                </span>
              </InputAdornment>
            )}
          </FormControl>
        </div>
        <div className="flex gap-4">
          <TextField
            id="standard-basic"
            label="*Valor do bem"
            type="number"
            placeholder="R$"
            variant="standard"
            error={helperTexts.find((e) => e.input == "value") ? true : false}
            helperText={helperTexts.find((e) => e.input == "value")?.helperText}
            name="value"
            value={state.value}
            onChange={handleChange}
          />
          <TextField
            id="standard-basic"
            label="Tipo de bem"
            variant="standard"
            required
            name="type"
            value={state.type}
            onChange={handleChange}
            error={helperTexts.find((e) => e.input == "type") ? true : false}
            helperText={helperTexts.find((e) => e.input == "type")?.helperText}
          />
        </div>
        <div className="flex gap-4">
          <TextField
            id="standard-basic"
            label="Situação da Cota"
            variant="standard"
            required
            name="status"
            value={state.status}
            onChange={handleChange}
            error={helperTexts.find((e) => e.input == "status") ? true : false}
            helperText={
              helperTexts.find((e) => e.input == "status")?.helperText
            }
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            onChange={(e: any, value) => {
              if (value) setState({ ...state, admin: value?.label });
            }}
            options={admins
              .filter((a: any) => a?.nome!!)
              .map((a: any) => ({ label: a?.nome }))}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="*Administradora"
                error={
                  helperTexts.find((e) => e.input == "admin") ? true : false
                }
                helperText={
                  helperTexts.find((e) => e.input == "admin")?.helperText
                }
                value={state.admin}
                name="admin"
              />
            )}
          />
        </div>
        <TextField
          id="standard-basic"
          label="obs"
          variant="standard"
          multiline
          rows={1}
          error={helperTexts.find((e) => e.input == "obs") ? true : false}
          helperText={helperTexts.find((e) => e.input == "obs")?.helperText}
          name="obs"
          value={state.obs}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          className="mt-12"
          style={{ background: " #080D3B", marginTop: 15 }}
          onClick={() => {
            const helpers: { input: string; helperText: string }[] = [];
            if (state.name == "") {
              helpers.push({ input: "name", helperText: "Campo obrigatório" });
            }
            if (state.email == "") {
              helpers.push({ input: "email", helperText: "Campo obrigatório" });
            }
            if (state.tel1 == "") {
              helpers.push({
                input: "tel1",
                helperText: "Campo obrigatório",
              });
            }
            if (state.tel2 == "") {
              helpers.push({
                input: "tel2",
                helperText: "Campo obrigatório",
              });
            }
            if (state.type == "") {
              helpers.push({ input: "type", helperText: "Campo obrigatório" });
            }
            if (state.status == "") {
              helpers.push({
                input: "status",
                helperText: "Campo obrigatório",
              });
            }

            if (state.value == "") {
              helpers.push({ input: "value", helperText: "Campo obrigatório" });
            }
            if (state.obs == "") {
              helpers.push({ input: "obs", helperText: "Campo obrigatório" });
            }
            if (state.admin === "") {
              helpers.push({
                input: "admin",
                helperText: "Campo obrigatório",
              });
            }
            if (helpers.length > 0) {
              setHelperTexts(helpers);
            } else {
              setStep(2);
            }
          }}
        >
          enviar
        </Button>
      </>
    ),
    2: (
      <>
        <TextField
          id="standard-basic"
          label="Quantos reais (R$) você JÁ pagou"
          type="number"
          variant="standard"
          name="PaidrailsNum"
          value={state.PaidrailsNum}
          onChange={handleChange}
          error={
            helperTexts.find((e) => e.input == "PaidrailsNum") ? true : false
          }
          helperText={
            helperTexts.find((e) => e.input == "PaidrailsNum")?.helperText
          }
          required
        />

        <Button
          variant="contained"
          className="mt-12"
          style={{ background: " #080D3B", marginTop: 15 }}
          onClick={() => {
            const helpers: { input: string; helperText: string }[] = [];
            if (state.PaidrailsNum == "") {
              helpers.push({
                input: "PaidrailsNum",
                helperText: "Campo obrigatório",
              });
            }
            if (helpers.length > 0) {
              setHelperTexts(helpers);
            } else {
              setStep(3);
            }
          }}
        >
          enviar
        </Button>
      </>
    ),
    3: (
      <>
        <span className="text-neutral-900 text-center self-center">
          Você tem um EXTRATO do consórcio ? (pdf, word, jpg) até heightkb
        </span>
        <Button
          variant="outlined"
          className="mt-12"
          style={{ marginTop: 15 }}
          onClick={() => setStep(3)}
          startIcon={<UploadFile />}
        >
          Escolher Arquivo
        </Button>
        <Button
          variant="contained"
          className="mt-12"
          style={{ background: " #080D3B", marginTop: 15 }}
          onClick={() => setStep(4)}
        >
          enviar
        </Button>
      </>
    ),
    4: (
      <>
        <TextField
          id="standard-basic"
          label="Quantos reais (R$) AINDA FALTAM pagar"
          type="number"
          variant="standard"
          required
          value={state.unPaidrailsNum}
          name="unPaidrailsNum"
          onChange={handleChange}
          error={
            helperTexts.find((e) => e.input == "unPaidrailsNum") ? true : false
          }
          helperText={
            helperTexts.find((e) => e.input == "unPaidrailsNum")?.helperText
          }
        />
        <Button
          variant="contained"
          className="mt-12"
          style={{ background: " #080D3B", marginTop: 15 }}
          onClick={() => {
            const helpers: { input: string; helperText: string }[] = [];
            if (state.unPaidrailsNum == "") {
              helpers.push({
                input: "unPaidrailsNum",
                helperText: "Campo obrigatório",
              });
            }
            if (helpers.length > 0) {
              setHelperTexts(helpers);
            } else {
              handleSubmit();
            }
          }}
        >
          enviar
        </Button>
      </>
    ),
  };

  const e = {
    1: (
      <>
        <span className="text-neutral-900 font-semibold text-center self-center">
          Entre em contato, faremos uma proposta
        </span>

        <TextField
          id="standard-basic"
          label="*Nome"
          variant="standard"
          error={helperTexts.find((e) => e.input == "name") ? true : false}
          helperText={helperTexts.find((e) => e.input == "name")?.helperText}
          name="name"
          value={state.name}
          onChange={handleChange}
        />
        <TextField
          id="standard-basic"
          label="*Email"
          variant="standard"
          error={helperTexts.find((e) => e.input == "email") ? true : false}
          name="email"
          helperText={helperTexts.find((e) => e.input == "email")?.helperText}
          value={state.email}
          onChange={handleChange}
        />
        <div className="flex gap-4">
          <FormControl variant="standard">
            <InputLabel
              className={`${
                helperTexts.find((e) => e.input === "tel1") &&
                "MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium css-1d1r5q-MuiFormHelperText-root"
              }`}
              htmlFor="formatted-text-mask-input"
            >
              Telefone 1
            </InputLabel>
            <Input
              value={state.tel1}
              onChange={handleChange}
              name="tel1"
              id="formatted-text-mask-input"
              inputComponent={TextMaskCustom as any}
              error={helperTexts.find((e) => e.input === "tel1") !== undefined}
            />
            {helperTexts.find((e) => e.input === "tel1") && (
              <InputAdornment
                variant="standard"
                position="end"
                id="combo-box-demo-helper-text"
                sx={{ marginTop: 2, marginLeft: -0.1 }}
              >
                <span
                  id="combo-box-demo-helper-text"
                  className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium css-1d1r5q-MuiFormHelperText-root"
                >
                  {helperTexts.find((e) => e.input === "tel1")?.helperText}
                </span>
              </InputAdornment>
            )}
          </FormControl>
          <FormControl variant="standard">
            <InputLabel
              style={{ fontSize: 14 }}
              className={`${
                helperTexts.find((e) => e.input === "tel2") &&
                "MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium css-1d1r5q-MuiFormHelperText-root"
              }`}
              htmlFor="formatted-text-mask-input"
            >
              Telefone 2
            </InputLabel>
            <Input
              value={state.tel2}
              onChange={handleChange}
              name="tel2"
              error={helperTexts.find((e) => e.input === "tel1") !== undefined}
              id="formatted-text-mask-input"
              inputComponent={TextMaskCustom as any}
            />
            {helperTexts.find((e) => e.input === "tel2") && (
              <InputAdornment
                variant="standard"
                position="end"
                id="combo-box-demo-helper-text"
                sx={{ marginTop: 2, marginLeft: -0.1 }}
              >
                <span
                  id="combo-box-demo-helper-text"
                  className="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium css-1d1r5q-MuiFormHelperText-root"
                >
                  {helperTexts.find((e) => e.input === "tel2")?.helperText}
                </span>
              </InputAdornment>
            )}
          </FormControl>
        </div>
        <div className="flex gap-4">
          <TextField
            id="standard-basic"
            label="*Valor do bem"
            type="number"
            placeholder="R$"
            variant="standard"
            error={helperTexts.find((e) => e.input == "value") ? true : false}
            helperText={helperTexts.find((e) => e.input == "value")?.helperText}
            name="value"
            value={state.value}
            onChange={handleChange}
          />
          <TextField
            id="standard-basic"
            label="Tipo de bem"
            variant="standard"
            required
            value={state.type}
            onChange={handleChange}
            name="type"
            error={helperTexts.find((e) => e.input == "type") ? true : false}
            helperText={helperTexts.find((e) => e.input == "type")?.helperText}
          />
        </div>
        <div className="flex gap-4">
          <TextField
            id="standard-basic"
            label="Situação da Cota"
            variant="standard"
            required
            value={state.status}
            onChange={handleChange}
            name="status"
            error={helperTexts.find((e) => e.input == "status") ? true : false}
            helperText={
              helperTexts.find((e) => e.input == "status")?.helperText
            }
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            onChange={(e: any, value) => {
              if (value) setState({ ...state, admin: value?.label });
            }}
            options={admins
              .filter((a: any) => a?.nome!!)
              .map((a: any) => ({ label: a?.nome }))}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="*Administradora"
                error={
                  helperTexts.find((e) => e.input == "admin") ? true : false
                }
                helperText={
                  helperTexts.find((e) => e.input == "admin")?.helperText
                }
                value={state.admin}
                name="admin"
              />
            )}
          />
        </div>
        <TextField
          id="standard-basic"
          label="obs"
          name="obs"
          variant="standard"
          multiline
          error={helperTexts.find((e) => e.input == "obs") ? true : false}
          helperText={helperTexts.find((e) => e.input == "obs")?.helperText}
          value={state.obs}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          className="mt-12"
          style={{ background: " #080D3B", marginTop: 15 }}
          onClick={() => {
            const helpers: { input: string; helperText: string }[] = [];
            if (state.name === "") {
              helpers.push({ input: "name", helperText: "Campo Obrigatório" });
            }
            if (state.email === "") {
              helpers.push({ input: "email", helperText: "Campo Obrigatório" });
            }
            if (state.tel1 === "") {
              helpers.push({ input: "tel1", helperText: "Campo Obrigatório" });
            }
            if (state.tel2 === "") {
              helpers.push({ input: "tel2", helperText: "Campo Obrigatório" });
            }
            if (state.type === "") {
              helpers.push({ input: "type", helperText: "Campo Obrigatório" });
            }
            if (state.value === "") {
              helpers.push({ input: "value", helperText: "Campo Obrigatório" });
            }
            if (state.status === "") {
              helpers.push({
                input: "status",
                helperText: "Campo Obrigatório",
              });
            }
            if (state.admin === "") {
              helpers.push({ input: "admin", helperText: "Campo Obrigatório" });
            }
            if (state.obs === "") {
              helpers.push({ input: "obs", helperText: "Campo Obrigatório" });
            }
            if (helpers.length > 0) {
              setHelperTexts(helpers);
            } else {
              setStep(2);
            }
          }}
        >
          enviar
        </Button>
      </>
    ),
    2: (
      <>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            Entre em contato, faremos uma proposta
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Sim, Tenho Mais De 30% Pago"
            />
            <FormControlLabel
              value="male"
              control={<Radio />}
              label="Não, Não Tenho Mais De 30% Pago"
            />
          </RadioGroup>
        </FormControl>

        <Button
          variant="contained"
          className="mt-12"
          style={{ background: " #080D3B", marginTop: 15 }}
          onClick={() => setStep(3)}
        >
          enviar
        </Button>
      </>
    ),
    3: (
      <>
        <span className="text-neutral-900 text-center self-center">
          Você tem um EXTRATO do consórcio ? (pdf, word, jpg) até heightkb
        </span>
        <Button
          variant="outlined"
          className="mt-12"
          style={{ marginTop: 15 }}
          onClick={() => setStep(3)}
          startIcon={<UploadFile />}
        >
          Escolher Arquivo
        </Button>
        <Button
          variant="contained"
          className="mt-12"
          style={{ background: " #080D3B", marginTop: 15 }}
          onClick={() => setStep(4)}
        >
          enviar
        </Button>
      </>
    ),
    4: (
      <>
        <TextField
          id="standard-basic"
          label="Quantos reais (R$) AINDA FALTAM pagar"
          type="number"
          variant="standard"
          required
          value={state.unPaidrailsNum}
          onChange={handleChange}
          name="unPaidrailsNum"
          error={
            helperTexts.find((e) => e.input == "unPaidrailsNum") ? true : false
          }
          helperText={
            helperTexts.find((e) => e.input == "unPaidrailsNum")?.helperText
          }
        />
        <Button
          variant="contained"
          className="mt-12"
          style={{ background: " #080D3B", marginTop: 15 }}
          onClick={() => {
            const helpers: { input: string; helperText: string }[] = [];
            if (state.unPaidrailsNum == "") {
              helpers.push({
                input: "unPaidrailsNum",
                helperText: "Campo obrigatório",
              });
            }
            if (helpers.length > 0) {
              setHelperTexts(helpers);
            } else {
              handleSubmit();
            }
          }}
        >
          enviar
        </Button>
      </>
    ),
  };

  const forms: any = {
    a,
    b,
    c,
    d,
    e,
    f,
  };

  return (
    <animated.div
      className={`fixed right-[50px] w-[375px] ] bg-white z-30 rounded-t-[16px] overflow-hidden`}
      style={{ bottom: anim.bottom, height, right: animLeftToRight[0].right }}
    >
      <div
        className="bg-primary-1  h-[45px]  text-white flex items-center justify-center font-semibold cursor-pointer "
        onClick={handle}
      >
        Venda Seu Consórcio
      </div>
      <div className="p-5 flex flex-col gap-3 h-full">
        {configs && configs["form"] ? forms[configs["form"]][step] : null}
      </div>
    </animated.div>
  );
};

export default SaleFormA;

import { FileUpload } from "@mui/icons-material";
import {
  TextField,
  Button,
  Input,
  FormControl,
  InputLabel,
  Autocomplete,
  InputAdornment,
} from "@mui/material";
import {
  FC,
  useState,
  forwardRef,
  ReactElement,
  Ref,
  JSXElementConstructor,
  useEffect,
} from "react";
import { IMaskInput } from "react-imask";
import { BASE_URL } from "../env";

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

const NumberMask = forwardRef<HTMLElement, CustomProps>(function TextMaskCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="R$ ###########"
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
});

const SaleForm: FC = () => {
  const [loaded, setLoaded] = useState<Boolean>(false);
  const [administratorOptions, setAdministratorOptions] = useState([]);
  document.onreadystatechange = () => {
    setLoaded(document.readyState === "complete");
  };

  const [popup, setPopup] = useState<Boolean>(false);

  useEffect(() => {
    loadAdmins();
  }, []);

  const loadAdmins = async () => {
    let res = await fetch(`${BASE_URL}/admin/administrators`, {
      method: "GET",
    });
    let data = await res.json();
    setAdministratorOptions(data);
  };

  useEffect(() => {
    if (loaded)
      setTimeout(() => {
        setPopup(true);
      }, 1000);
  }, [loaded]);

  interface Values {
    email: string;
    goodsType: string;
    name: string;
    telephone1: string;
    telephone2: string;
    valueOfGood: string;
    administrator: string;
  }

  const [values, setValues] = useState<Values>({
    email: "",
    name: "",
    telephone1: "",
    telephone2: "",
    administrator: "",
    goodsType: "",
    valueOfGood: "",
  });

  const handleChanges = (name: string, value: string) => {
    setValues({ ...values, [name]: value });
  };

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [helperTexts, setHelperTexts] = useState<
    { input: string; helperText: string }[]
  >([]);

  return (
    <form
      method="post"
      style={{ height: popup ? (helperTexts.length > 0 ? 650 : 600) : 60 }}
      className={`fixed ${
        loaded && "translate-x-64"
      } bottom-0 transition-all overflow-hidden duration-1000 flex items-center w-[27rem] shadow-xl rounded-xl bg-white flex-col z-50 right-[20rem]`}
    >
      <div
        onClick={() => {
          setPopup(!popup);
        }}
        className="text-center font-bold text-xl bg-primary-1 w-full text-white rounded-t-xl py-4 cursor-pointer"
      >
        Vender o seu Consórcio
      </div>
      <div className="overflow-hidden w-full flex">
        <div
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          className="min-w-full duration-1000 transition-all flex flex-col items-center"
        >
          <div className="text-lg font-medium max-w-[15rem] py-5 text-center">
            Entre em contato, faremos uma proposta
          </div>
          <div className="flex flex-col gap-3 px-7 pb-5 ">
            <TextField
              onChange={(e) => handleChanges(e.target.name, e.target.value)}
              id="standard-helperText"
              label="Nome"
              name="name"
              variant="standard"
              error={helperTexts.find((e) => e.input === "name") !== undefined}
              helperText={
                helperTexts.find((e) => e.input === "name")?.helperText
              }
            />
            <TextField
              id="standard-helperText"
              label="Email"
              name="email"
              onChange={(e) => handleChanges(e.target.name, e.target.value)}
              variant="standard"
              error={helperTexts.find((e) => e.input === "email") !== undefined}
              helperText={
                helperTexts.find((e) => e.input === "email")?.helperText
              }
            />
            <div className="flex gap-3">
              <FormControl variant="standard">
                <InputLabel
                  className={`${
                    helperTexts.find((e) => e.input === "telephone1") &&
                    "MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium css-1d1r5q-MuiFormHelperText-root"
                  }`}
                  htmlFor="formatted-text-mask-input"
                >
                  Telefone 1
                </InputLabel>
                <Input
                  value={values.telephone1}
                  onChange={(e) => {
                    handleChanges(e.target.name, e.target.value);
                  }}
                  name="telephone1"
                  id="formatted-text-mask-input"
                  inputComponent={TextMaskCustom as any}
                  error={
                    helperTexts.find((e) => e.input === "telephone1") !==
                    undefined
                  }
                />
                {helperTexts.find((e) => e.input === "telephone1") && (
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
                      {
                        helperTexts.find((e) => e.input === "telephone1")
                          ?.helperText
                      }
                    </span>
                  </InputAdornment>
                )}
              </FormControl>
              <FormControl variant="standard">
                <InputLabel
                  style={{ fontSize: 14 }}
                  className={`${
                    helperTexts.find((e) => e.input === "telephone2") &&
                    "MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium css-1d1r5q-MuiFormHelperText-root"
                  }`}
                  htmlFor="formatted-text-mask-input"
                >
                  Telefone 2
                </InputLabel>
                <Input
                  value={values.telephone2}
                  onChange={(e) => {
                    handleChanges(e.target.name, e.target.value);
                  }}
                  name="telephone2"
                  error={
                    helperTexts.find((e) => e.input === "telephone1") !==
                    undefined
                  }
                  id="formatted-text-mask-input"
                  inputComponent={TextMaskCustom as any}
                />
                {helperTexts.find((e) => e.input === "telephone2") && (
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
                      {
                        helperTexts.find((e) => e.input === "telephone2")
                          ?.helperText
                      }
                    </span>
                  </InputAdornment>
                )}
              </FormControl>
            </div>
            <div className="flex gap-3">
              <FormControl variant="standard">
                <InputLabel
                  className={`${
                    helperTexts.find((e) => e.input === "valueOfGood") &&
                    "MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium css-1d1r5q-MuiFormHelperText-root"
                  }`}
                  htmlFor="formatted-text-mask-input"
                >
                  Valor do Bem
                </InputLabel>
                <Input
                  value={values.valueOfGood}
                  onChange={(e) => {
                    handleChanges(e.target.name, e.target.value);
                  }}
                  id="formatted-text-mask-input"
                  error={
                    helperTexts.find((e) => e.input === "valueOfGood") !==
                    undefined
                  }
                  inputComponent={NumberMask as any}
                  name="valueOfGood"
                />
                {helperTexts.find((e) => e.input === "valueOfGood") && (
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
                      {
                        helperTexts.find((e) => e.input === "valueOfGood")
                          ?.helperText
                      }
                    </span>
                  </InputAdornment>
                )}
              </FormControl>

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                sx={{ width: "70%" }}
                onChange={(e, value) => {
                  handleChanges("administrator", value as any);
                }}
                options={administratorOptions
                  .filter((a: any) => a?.nome!!)
                  .map((a: any) => ({ label: a?.nome }))}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Administrador"
                    variant="standard"
                    error={
                      helperTexts.find((e) => e.input === "administrator") !==
                      undefined
                    }
                    helperText={
                      helperTexts.find((e) => e.input === "administrator")
                        ?.helperText
                    }
                  />
                )}
              />
            </div>
            <div className="flex flex-col gap-3 px-7 pb-5 w-full">
              <TextField
                id="standard-helperText"
                label="obs"
                name="obs"
                onChange={(e) => handleChanges(e.target.name, e.target.value)}
                variant="standard"
                error={helperTexts.find((e) => e.input === "obs") !== undefined}
                helperText={
                  helperTexts.find((e) => e.input === "obs")?.helperText
                }
                multiline
                rows={2}
              />
            </div>
          </div>

          <Button
            className="w-[85%]"
            onClick={() => {
              const helpers: { input: string; helperText: string }[] = [];
              if (values.name === "") {
                helpers.push({ input: "name", helperText: "Nome inválido" });
              }
              if (values.email === "") {
                helpers.push({
                  input: "email",
                  helperText: "Campo obrigatório",
                });
              }
              if (
                !/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim.test(values.email)
              ) {
                helpers.push({
                  input: "email",
                  helperText: "Email inválido",
                });
              }
              if (values.telephone1 === "") {
                helpers.push({
                  input: "telephone1",
                  helperText: "Campo obrigatório",
                });
              }
              if (values.telephone2 === "") {
                helpers.push({
                  input: "telephone2",
                  helperText: "Campo obrigatório",
                });
              }
              if (values.valueOfGood === "") {
                helpers.push({
                  input: "valueOfGood",
                  helperText: "Campo obrigatório",
                });
              }
              if (values.administrator === "") {
                helpers.push({
                  input: "administrator",
                  helperText: "Campo obrigatório",
                });
              }
              setHelperTexts(helpers);
              if (helpers.length === 0) {
                setCurrentSlide(1);
              } else {
                setTimeout(() => {
                  // setHelperTexts([]);
                }, 5000);
              }
            }}
            variant="contained"
            color="secondary"
          >
            Enviar
          </Button>
        </div>
        <div
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          className="min-w-full gap-7 duration-1000 transition-all flex flex-col items-center justify-center"
        >
          <div className="flex flex-col items-end">
            <span className="text-xl pt-5 text-[#505050] l">
              Quantos reais &#40;R$&#41; você já pagou
            </span>
            <hr
              className={`${
                currentSlide === 1 ? "w-full" : "w-0"
              } transition-all duration-1000 h-[2px] bg-[#505050ed]`}
            />
          </div>
          <Button
            style={{ width: "75%" }}
            onClick={() => {
              setCurrentSlide(2);
            }}
            variant="contained"
            color="secondary"
          >
            Enviar
          </Button>
        </div>
        <div
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          className="min-w-full gap-8 duration-1000 transition-all flex flex-col items-center justify-center"
        >
          <span className="text-xl pt-5 max-w-[25rem] text-center text-[#505050]">
            Você tem extrato do consórcio? (pdf,word,jpg) até 500kb
          </span>
          <label htmlFor="file">
            <Button variant="outlined">
              <FileUpload />
              <span>Escolher Arquivo</span>
            </Button>
          </label>
          <input type="file" hidden id="file" />
          <Button
            style={{ width: "75%" }}
            onClick={() => {
              setCurrentSlide(3);
            }}
            variant="contained"
            color="secondary"
          >
            Enviar
          </Button>
        </div>
        <div
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          className="min-w-full gap-7 duration-1000 transition-all flex flex-col items-center justify-center"
        >
          <div className="flex flex-col items-end">
            <span className="text-xl pt-5 text-[#505050]">
              Quantos reais &#40;R$&#41; <strong>ainda faltam</strong> <br />
              pagar!
            </span>
            <hr
              className={`${
                currentSlide === 1 ? "w-full" : "w-0"
              } transition-all duration-1000 h-[2px] bg-[#505050ed]`}
            />
          </div>
          <Button
            style={{ width: "75%" }}
            onClick={() => {
              setCurrentSlide(4);
            }}
            variant="contained"
            color="secondary"
          >
            Enviar
          </Button>
        </div>
        <div
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          className="min-w-full gap-8 duration-1000 transition-all flex flex-col items-center justify-center"
        >
          <span className="font-semibold text-lg text-center max-w-[20rem]">
            E por ultimo preencha as informacoes abaixo
          </span>
          <div className="flex px-7 w-full gap-3">
            <Autocomplete
              options={["IMMOBILE", "CAR", "TRUCK", "MOTO", "OTHER"]}
              disablePortal
              id="combo-box-demo"
              sx={{ width: "70%" }}
              onChange={(e, value) => {
                handleChanges("administrator", value as string);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tipo de bem"
                  variant="standard"
                  error={
                    helperTexts.find((e) => e.input === "administrator") !==
                    undefined
                  }
                  helperText={
                    helperTexts.find((e) => e.input === "administrator")
                      ?.helperText
                  }
                />
              )}
            />
            <Autocomplete
              options={["NOT CONTEMPLATED", "CONTEMPLATED", "CANCELLED"]}
              disablePortal
              id="combo-box-demo"
              sx={{ width: "70%" }}
              onChange={(e, value) => {
                handleChanges("administrator", value as string);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Situação da Cota"
                  variant="standard"
                  error={
                    helperTexts.find((e) => e.input === "administrator") !==
                    undefined
                  }
                  helperText={
                    helperTexts.find((e) => e.input === "administrator")
                      ?.helperText
                  }
                />
              )}
            />
          </div>
          <textarea
            name="abs"
            className="w-[85%] outline-none border-b-2 min-h-[5rem]"
            placeholder="abs"
          ></textarea>

          <Button
            style={{ width: "75%" }}
            type="submit"
            variant="contained"
            color="secondary"
          >
            Enviar
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SaleForm;

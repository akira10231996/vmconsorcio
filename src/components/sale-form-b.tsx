import {
  Button,
  TextField,
  Modal,
  Fade,
  FormControl,
  InputLabel,
  Input,
  Autocomplete,
  InputAdornment,
} from "@mui/material";
import {
  useEffect,
  useState,
  forwardRef,
  ReactElement,
  Ref,
  JSXElementConstructor,
} from "react";
import { IMaskInput } from "react-imask";
import { useSpring, animated, easings } from "react-spring";
import UploadFile from "@mui/icons-material/UploadFile";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

interface Values {
  email: string;
  goodsType: string;
  name: string;
  telephone1: string;
  telephone2: string;
  valueOfGood: string;
  administrator: string;
}

const TextMaskCustom = forwardRef<HTMLElement, CustomProps>(
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

const SaleFormB = ({ open, handleClose }: any) => {
  const [step, setStep] = useState(1) as any;
  const [values, setValues] = useState<Values>({
    email: "",
    name: "",
    telephone1: "",
    telephone2: "",
    administrator: "",
    goodsType: "",
    valueOfGood: "",
  });
  const [anim, api] = useSpring(() => ({
    from: { bottom: -450 + 45 },
    config: {
      duration: 400,
      easing: easings.easeInOutSine,
    },
  }));

  const handle = () => {
    handleClose();
    if (open) {
      api({
        to: { bottom: -450 + 45 },
        onRest(result, ctrl, item?) {
          setStep(0);
        },
      });
    } else {
      api({
        to: { bottom: 0 },
        onRest(result, ctrl, item?) {
          setStep(1);
        },
      });
    }
  };

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [administratorOptions, setAdministratorOptions] = useState([]);

  const handleChanges = (name: string, value: string) => {
    setValues({ ...values, [name]: value });
  };

  const [helperTexts, setHelperTexts] = useState<
    { input: string; helperText: string }[]
  >([]);

  const steps: any = {
    1: (
      <>
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
        {/* <span className="text-neutral-900 font-semibold text-center self-center">
                    Entre em contato, faremos uma proposta
                </span>

                <TextField
                    id="standard-basic"
                    label="Nome"
                    variant="standard"
                />
                <TextField
                    id="standard-basic"
                    label="Email"
                    variant="standard"
                />
                <div className="flex gap-4">
                    <TextField
                        id="standard-basic"
                        label="Telefone 1"
                        variant="standard"
                    />
                    <TextField
                        id="standard-basic"
                        label="Telefone 2"
                        variant="standard"
                    />
                </div>
                <div className="flex gap-4">
                    <TextField
                        id="standard-basic"
                        label="Administradora"
                        variant="standard"
                    />
                    <TextField
                        id="standard-basic"
                        label="Valor do bem"
                        variant="standard"
                    />
                </div>
                <div className="flex gap-4">
                    <TextField
                        id="standard-basic"
                        label="Tipo de bem"
                        variant="standard"
                    />
                    <TextField
                        id="standard-basic"
                        label="N Parcelas pagas"
                        variant="standard"
                    />
                    <TextField
                        id="standard-basic"
                        label="Situação da Cota"
                        variant="standard"
                    />
                </div>
                <TextField
                    id="standard-basic"
                    label="obs"
                    variant="standard"
                    multiline
                    rows={4}
                /> 
                <Button
                    variant="contained"
                    className="mt-12"
                    style={{ background: ' #080D3B', marginTop: 15 }}
                    onClick={() => {
                        
                    }}
                >
                    enviar
                </Button> */}
      </>
    ),
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
          <div
            className={` w-[450px] bg-white z-30  rounded-[16px] overflow-hidden`}
          >
            <div
              className="bg-primary-1  h-[45px]  text-white flex items-center justify-center font-semibold cursor-pointer"
              onClick={handle}
            >
              Vender Consórcio
            </div>
            <div className="p-5 flex flex-col gap-3 h-full">{steps[step]}</div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default SaleFormB;

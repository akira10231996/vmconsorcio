import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  TextField,
} from "@mui/material";
import { BASE_URL } from "../../env";
import { toast } from "react-toastify";
import {
  forwardRef,
  useEffect,
  Ref,
  JSXElementConstructor,
  ReactElement,
} from "react";
import { useFormik } from "formik";
import { IMaskInput } from "react-imask";
import useDarkMode from "../../hooks/use-dark-mode";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const CNPJMASKCustom = forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="##.###.###/####-##"
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
const CNPJ = () => {
  const formik = useFormik({
    initialValues: {
      cnpj: "",
      displayed: false,
    },
    onSubmit: async (values) => {
      let res = await fetch(`${BASE_URL}/admin/update-configs`, {
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
      }
    },
  });

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    let res = await fetch(`${BASE_URL}/admin/get-configs`, {
      method: "GET",
    });
    let data = await res.json();
    // formik.setValues({
    //   ...formik.values,
    //   cnpj: data.c.cnpj,
    //   displayed: data.q.find((e: { config: string }) => e.config === "cnpj")
    //     .display,
    // });
    formik.setFieldValue("cnpj", data.c.cnpj);
    console.log(data.q)
    formik.setFieldValue(
      "displayed",
      data.q.find((e: { config: string }) => e.config === "cnpj").display
    );
  };
  const dark = useDarkMode();
  return (
    <div className="flex flex-col items-start w-full p-6">
      <span className="text-primary-3 font-medium text-2xl mb-8 dark:text-gray-100">
        CNPJ
      </span>
      <form className="mb-4" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col w-full">
          {/* <TextField
            id="cnpj"
            label="CNPJ"
            variant="standard"
            required
        /> */}
          <TextField
            onChange={(e) => {
              formik.setFieldValue("cnpj", e.target.value);
            }}
            value={formik.values.cnpj}
            id="cnpg"
            label="CNPJ"
            variant="standard"
            required
          />
          <FormControlLabel
            control={
              <Checkbox
                id="ativo_modelo_resposta"
                checked={formik.values.displayed}
                onChange={(e) => {
                  formik.setFieldValue("displayed", e.target.checked);
                }}
                color={dark ? "info" : "error"}
              />
            }
            label="Do you want this info to be displayed on website"
            className="mt-2 mb-1 dark:text-white"
          />
          <Button
            variant="contained"
            className="mt-12 w-[300px]"
            style={{ marginTop: 15 }}
            type="submit"
            color="secondary"
          >
            salve
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CNPJ;

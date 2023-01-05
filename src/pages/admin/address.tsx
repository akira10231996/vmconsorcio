import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { BASE_URL } from "../../env";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import useDarkMode from "../../hooks/use-dark-mode";

const Address = () => {
  const formik = useFormik({
    initialValues: {
      address: "",
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
    formik.setValues({
      ...formik.values,
      address: data?.c.address,
      displayed: data.q.find((e: { config: string }) => e.config === "address")
        .display,
    });
  };
  const dark = useDarkMode();
  return (
    <div className="flex flex-col items-start w-full p-6">
      <span className="text-primary-3 font-medium text-2xl mb-8 dark:text-gray-100">
        Horário de Atemdimento
      </span>
      <form className="mb-4" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col w-full">
          <TextField
            id="address"
            label="ENDEREÇO"
            variant="standard"
            required
            onChange={formik.handleChange}
            value={formik.values.address}
          />
          <FormControlLabel
            control={
              <Checkbox
                id="ativo_modelo_resposta"
                color={dark ? "info" : "error"}
                checked={formik.values.displayed}
                onChange={(e) => {
                  formik.setFieldValue("displayed", e.target.checked);
                }}
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

export default Address;

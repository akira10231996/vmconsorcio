import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { BASE_URL } from "../../env";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import useDarkMode from "../../hooks/use-dark-mode";

const AdminEmail = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
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
      email: data?.c.email,
      displayed: data.q.find((e: { config: string }) => e.config === "email")
        .display,
    });
  };
  const dark = useDarkMode();
  return (
    <div className="flex flex-col dark:text-gray-100 items-start w-full p-6">
      <span className="text-primary-3 font-medium text-2xl mb-8 dark:text-gray-100">
        Emails
      </span>
      <form className="mb-4" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col w-full">
          <TextField
            type="email"
            id="email"
            label="Enter Email"
            variant="standard"
            required
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.displayed}
                onChange={() => {
                  formik.setFieldValue("displayed", !formik.values.displayed);
                }}
                id="ativo_modelo_resposta"
                color={dark ? "info" : "error"}
              />
            }
            label="Do you want this info to be displayed on website"
            className="mt-2 mb-1"
          />
          <Button
            variant="contained"
            className="mt-12"
            style={{ marginTop: 15 }}
            color="secondary"
            type="submit"
          >
            salve
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminEmail;

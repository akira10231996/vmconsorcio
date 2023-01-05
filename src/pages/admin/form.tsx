import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { BASE_URL } from "../../env";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useFormik } from "formik";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Form = () => {
  const formik = useFormik({
    initialValues: {
      form: "",
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
    formik.setValues({ form: data?.c.form });
  };
  const forms: string[] = [
    "Form A",
    "Form B",
    "Form C",
    "Form D",
    "Form E",
    "Form F",
  ];

  return (
    <div className="flex flex-col items-start w-full p-6">
      <span className="text-primary-3 font-medium text-2xl mb-8 dark:text-gray-100">
        FORMULARIES
      </span>
      <form className="mb-4" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col w-full">
          <FormControl fullWidth variant="outlined">
            <InputLabel id="demo-simple-select-label">FORMULARIES</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="form"
              value={formik.values.form}
              renderValue={(selected) => selected}
              MenuProps={MenuProps}
              label="FORMULARIES"
              onChange={(e) => formik.setFieldValue("form", e.target.value)}
            >
                {forms.map((form, index) => (
                  <MenuItem key={index} value={form}>
                    <Checkbox checked={formik.values.form === form} />
                    <ListItemText primary={form} />
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
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

export default Form;

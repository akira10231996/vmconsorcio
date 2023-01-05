import {
  Button,
  FormControl,
  Input,
  InputLabel,
  TextField,
} from "@mui/material";
import { BASE_URL } from "../../env";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { TextMaskCustom } from "../../components/SaleForm";

const AdminTels = () => {
  const formik = useFormik({
    initialValues: {
      tel1: "",
      tel2: "",
      whatsapp: "",
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
    formik.setValues(data?.c);
  };
  return (
    <div className="flex flex-col items-start w-full p-6">
      <span className="text-primary-3 font-medium text-2xl mb-8 dark:text-gray-100">
        Tels
      </span>
      <form className="mb-4" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col w-full gap-6">
          {/* <TextField
            type="text"
            id="tel1"
            label="TEL 1"
            variant="standard"
            onChange={formik.handleChange}
            value={formik.values.tel1}
          /> */}
          <FormControl variant="standard">
            <InputLabel htmlFor="tel1">TEL 1</InputLabel>
            <Input
              id="tel1"
              onChange={(e) => formik.setFieldValue("tel1", e.target.value)}
              value={formik.values.tel1}
              inputComponent={TextMaskCustom as any}
            />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel htmlFor="tel2">TEL 2</InputLabel>
            <Input
              id="tel2"
              onChange={(e) => formik.setFieldValue("tel2", e.target.value)}
              value={formik.values.tel2}
              inputComponent={TextMaskCustom as any}
            />
          </FormControl>
          <FormControl variant="standard">
            <InputLabel htmlFor="whatsapp">WhatsApp</InputLabel>
            <Input
              id="whatsapp"
              onChange={(e) => formik.setFieldValue("whatsapp", e.target.value)}
              value={formik.values.whatsapp}
              inputComponent={TextMaskCustom as any}
            />
          </FormControl>

          <Button
            variant="contained"
            className="mt-12"
            style={{ background: " #080D3B", marginTop: 15 }}
            type="submit"
          >
            salve
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminTels;

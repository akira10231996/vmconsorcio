import { Button, TextField } from "@mui/material";
import { BASE_URL } from "../../env";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useFormik } from "formik";

const BankInfo = () => {
  const formik = useFormik({
    initialValues: {
      bank_nome: "",
      bank_cpf: "",
      bank_banco: "",
      bank_agencia: "",
      bank_conta: "",
      bank_pix: "",
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
    data && formik.setValues(data);
  };
  return (
    <div className="flex flex-col items-start w-full p-6">
      <span className="text-primary-3 dark:text-white font-medium text-2xl mb-8">
        DADOS BANCARIOS
      </span>
      <form className="mb-4" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col w-full gap-6">
          <TextField
            id="bank_nome"
            label="NOME"
            variant="standard"
            onChange={formik.handleChange}
            value={formik.values.bank_nome}
          />
          <TextField
            id="bank_cpf"
            label="CPF"
            variant="standard"
            onChange={formik.handleChange}
            value={formik.values.bank_cpf}
          />
          <TextField
            id="bank_banco"
            label="BANCO"
            variant="standard"
            onChange={formik.handleChange}
            value={formik.values.bank_banco}
          />
          <TextField
            id="bank_conta"
            label="CONTA"
            variant="standard"
            onChange={formik.handleChange}
            value={formik.values.bank_conta}
          />
          <TextField
            id="bank_pix"
            label="PIX"
            variant="standard"
            onChange={formik.handleChange}
            value={formik.values.bank_pix}
          />
          <Button
            variant="contained"
            className="mt-12"
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

export default BankInfo;

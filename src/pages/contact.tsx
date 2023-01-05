import {
  Button,
  FormControl,
  Input,
  InputLabel,
  TextField,
} from "@mui/material";
import { useState } from "react";
import Header from "../components/header";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import Twitter from "@mui/icons-material/Twitter";
import { phoneFormatter } from "../utils/phoneFormatter";
import { TextMaskCustom } from "../components/SaleForm";
const Cantact = () => {
  const [values, setValues] = useState<{ phone1: string }>({ phone1: "" });
  return (
    <div
      className="h-[100vh] w-[100vw] flex flex-col overflow-x-hidden dark:bg-white relative"
      style={{
        background:
          "linear-gradient(to top, #400709, #450c0f, #4b1114, #501518, #561a1c, #581c1e, #5a1f21, #5c2123, #5a2124, #592224, #572225, #552225)",
      }}
    >
      <Header />
      <div className="flex p-8 bg-white w-[75%] md:w-[75%] mt-[5rem] self-center rounded-[16px] min-h-[80vh] gap-12">
        <div className="flex flex-col gap-3 h-full flex-1">
          <span className="text-primary-3 font-bold text-2xl">Contato</span>
          <span className="text-primary-3 font-medium text-sm">
            OLA DEIXE SUA MENSAGEM ENTRAREMOS EM CONTATO
          </span>
          <TextField id="standard-basic" label="Nome" variant="standard" />
          <TextField id="standard-basic" label="Email" variant="standard" />
          <div className="flex gap-4">
            <FormControl variant="standard">
              <InputLabel htmlFor="formatted-text-mask-input">
                Telefone 1
              </InputLabel>
              <Input
                value={values.phone1}
                onChange={(e) => {
                  setValues({ ...values, phone1: e.target.value });
                }}
                inputComponent={TextMaskCustom as any}
                id="formatted-text-mask-input"
              />
            </FormControl>
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
            style={{ background: " #080D3B", marginTop: 45 }}
            onClick={() => {}}
          >
            enviar
          </Button>
        </div>
        <div className="h-full w-[1px] bg-gray-100" />
        <div className=" flex flex-col gap-3 h-full flex-1 items-center">
          <span className="text-primary-3 font-bold text-xl">VMConsortium</span>
          <span className="text-primary-3 font-semibold text-lg mt-4">
            Telefones
          </span>
          <span className="text-gray-700 font-medium ">(11) 2 2913-440</span>
          <span className="text-gray-700 font-medium ">(11) 9 7101-466</span>
          <span className="text-gray-700 font-medium">(11) 9 7101-466</span>
          <span className="text-primary-3 font-semibold text-lg mt-4">
            Email
          </span>
          <span className="text-gray-700 font-medium">
            vendermeuconsorcio@gmail.com
          </span>
          <span className="text-primary-3 font-semibold text-lg mt-4">
            Endereço
          </span>
          <span className="text-gray-700 font-medium">
            Rua Caicó, 777 São Paulo/SP
          </span>
          <span className="text-primary-3 font-semibold text-lg mt-4">
            Horário de Atendimento
          </span>
          <span className="text-gray-700 font-medium">Seg-Sex 08:00 18:00</span>
          <span className="text-primary-3 font-semibold text-lg mt-4">
            Nossas Redes Sociais
          </span>
          <div className="flex items-center gap-3">
            <a
              href="https://facebook.com"
              className="w-11 h-11 rounded-full bg-primary-2 flex justify-center items-center cursor-pointer hover:scale-105 transition-all"
            >
              <Facebook htmlColor="#fff" />
            </a>
            <a
              href="https://instagram.com"
              className="w-11 h-11 rounded-full bg-primary-2 flex justify-center items-center cursor-pointer hover:scale-105 transition-all"
            >
              <Instagram htmlColor="#fff" />
            </a>
            <a
              href="https://twitter.com"
              className="w-11 h-11 rounded-full bg-primary-2 flex justify-center items-center cursor-pointer hover:scale-105 transition-all"
            >
              <Twitter htmlColor="#fff" />
            </a>
            <a className="w-11 h-11 rounded-full bg-primary-2 flex justify-center items-center cursor-pointer hover:scale-105 transition-all">
              <img
                src="/img/reclame-aqui-icon-wt.png"
                style={{ width: "50%" }}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cantact;

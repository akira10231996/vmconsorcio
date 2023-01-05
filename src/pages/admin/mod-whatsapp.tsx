import { WhatsApp } from "@mui/icons-material";
import { FC } from "react";

const ModWhatsapp: FC = () => {
  return (
    <div className="dark:text-white">
      <a
      href="https://api.whatsapp.com/send?phone=1197101466&text=Halo%20Admin%20Saya%20Ingin%20Membeli%20Produk%20Anda"
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-2 text-green-500 hover:text-green-600 hover:no-underline"
      >
        <WhatsApp />
        Call Via WhatsApp
      </a>
    </div>
  );
};
export default ModWhatsapp;

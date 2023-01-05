import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import Twitter from "@mui/icons-material/Twitter";
import { WhatsApp } from "@mui/icons-material";

import { useEffect, useState } from "react";
import { BASE_URL } from "../env";
const Footer = () => {
  const [configs, setConfigs] = useState<any>(null);
  const load = async () => {
    let res = await fetch(`${BASE_URL}/admin/get-configs`, {
      method: "GET",
    });
    let data = await res.json();
    data.q.forEach(
      ({ config, display }: { config: string; display: boolean }) => {
        data.c[config] = { value: data.c[config], display };
      }
    );
    setConfigs(data.c);
  };
  useEffect(() => {
    load();
  }, []);

  return (
    <footer className="w-full bg-primary-3 flex justify-center  ">
      <div className="w-[75%] md:w-full flex self-center py-[40px] md:flex-col md:gap-12 md:pl-4 ">
        <div className="flex flex-1 flex-col">
          <span className="text-gray-100 text-2xl font-bold">VMConsórcio</span>
          <span className="text-gray-400 text-md">
            Site description lorem ipsom
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <span className="text-gray-300 text-xs font-bold mb-2">
            Contact Info
          </span>
          {configs?.tel1.display && (
            <a className="text-gray-100 text-sm">{configs?.tel1.value}</a>
          )}

          {configs?.tel2.display && (
            <a className="text-gray-100 text-sm">{configs?.tel2.value}</a>
          )}

          {configs?.whatsapp?.display && (
            <a className="text-gray-100 text-sm">
              {configs?.whatsapp.value} (WhatsApp)
            </a>
          )}
          {configs?.address?.display && (
            <span className="text-gray-100 text-sm">
              {configs?.address?.value}
            </span>
          )}
          {configs?.officeHours.display && (
            <span className="text-gray-100 text-sm">{configs?.officeHours.value}</span>
          )}
          {configs?.email.display && (
            <span className="text-gray-100 text-sm">
              {configs?.email.value}
            </span>
          )}
          {configs?.cnpj.display && (
            <span className="text-gray-100 text-sm">{configs?.cnpj.value}</span>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <span className="text-gray-300 text-xs font-bold mb-2">LINKS</span>
          <a href="/about/" className="text-gray-100 text-sm">
            Quem Somos Nós
          </a>
          <a href="/blog/" className="text-gray-100 text-sm">
            Blog
          </a>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <span className="text-gray-300 text-xs font-bold mb-2">
            Redes Sociais
          </span>
          <a href="https://facebook.com" className="text-gray-100 text-sm">
            <Facebook /> Facebook
          </a>
          <a href="https://instagram.com" className="text-gray-100 text-sm">
            <Instagram /> Instagram
          </a>
          <a href="https://twitter.com" className="text-gray-100 text-sm">
            <Twitter /> Twitter
          </a>
          <a
            href="https://api.whatsapp.com/send?phone=1197101466&text=Halo%20Admin%20Saya%20Ingin%20Membeli%20Produk%20Anda"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-gray-100 text-sm"
          >
            <WhatsApp />
            WhatsApp
          </a>
          <a href="" className="text-gray-100 text-sm flex items-center gap-1">
            <img src="/img/reclame-aqui-icon-wt.png" style={{ width: 25 }} />
            Reclame Aqui
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

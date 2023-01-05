import { KeyboardArrowDown } from "@mui/icons-material";
import { Dropdown, MenuProps, Space, Switch } from "antd";
import { useEffect, useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useNavigate, Routes, Route } from "react-router-dom";
import { BASE_URL } from "../../env";
import useDarkMode from "../../hooks/use-dark-mode";
import Address from "./address";
import Admins from "./administrators";
import BankInfo from "./bank-info";
import ClienteComprando from "./cliente-comprando";
import ClienteVendendo from "./cliente_vendendo";
import CNPJ from "./cnpj";
import AdminEmail from "./email";
import Form from "./form";
import Home from "./layout";
import OfficeHours from "./office-hours";
import AdminTels from "./tels";
import ModWhatsapp from "./mod-whatsapp";

const AdminPanel = () => {
  const [isLogged, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dark = useDarkMode();
  const [link, setLink] = useState("home");
  const [fullname, setFullname] = useState<any>(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fullname = JSON.parse(localStorage.getItem("fullname") as any);
    setFullname(fullname);
    if (!token) {
      navigate("/admin/login");
    }
    fetch(`${BASE_URL}/admin/update-configs`).then((res) => {
      if (res.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/admin/login";
      }
    });

    setIsLoggedIn(!!token);
    const route = window.location.pathname.split("/").pop();
    setLink(route! === "panel" ? "home" : route!);
    fetch(`${BASE_URL}/admin/token`, {
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then(async (res) => {
      let data = await res.json();
      setFullname({ fistname: data.firstname, lastname: data.lastname });
    }).catch(error => {
      navigate("/admin/login")
    })
  }, []);
  // console.log(fullname)
  const sidebarr = (
    <Sidebar
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          height: "100vh",
          background: dark ? "#0D0909" : "#f6f6f6",
        },
      }}
    >
      <Menu
        menuItemStyles={{
          button: ({ level, active, disabled }) => {
            return {
              color: dark ? "#fff" : "#0D0909",
              background: dark ? "#0D0909" : "#f6f6f6",
            };
          },
        }}
      >
        <SubMenu label="ADM SITE">
          <SubMenu label="ELEMENTOS EXTERNOS">
            <MenuItem onClick={() => navigate("/admin/email")}>EMAILS</MenuItem>
            <MenuItem onClick={() => navigate("/admin/telefones")}>
              TELFEFONES{" "}
            </MenuItem>
            <MenuItem onClick={() => navigate("/admin/office-hours")}>
              HORARIO DE ATENDIMENTO{" "}
            </MenuItem>
            <MenuItem onClick={() => navigate("/admin/cnpj")}>CNPJ </MenuItem>

            <MenuItem onClick={() => navigate("/admin/address")}>
              ENDEREÇO
            </MenuItem>
            <MenuItem onClick={() => navigate("/admin/form")}>
              FORMULARIOS
            </MenuItem>
          </SubMenu>
          <SubMenu label="ELEMENTOS INTERNOS">
            <MenuItem onClick={() => navigate("/admin/administrators")}>
              ADMINISTRADORAS
            </MenuItem>
            <MenuItem>MARGEM COTISTA</MenuItem>
            <MenuItem>TEXTOS MODELOS</MenuItem>
            <MenuItem>TAGS PERSONALIZADAS - FORMULARIO</MenuItem>
            {/* <MenuItem>CNPJ </MenuItem> */}
            <MenuItem>MOD WHATSAPP</MenuItem>
            <MenuItem>MOD TEL </MenuItem>
            <MenuItem onClick={() => navigate("/admin/bank-info")}>
              DADOS BANCARIOS
            </MenuItem>

            {/* <MenuItem>ENDEREÇO</MenuItem> */}
          </SubMenu>
        </SubMenu>

        <SubMenu label="GERENCIAR CLIENTES">
          <MenuItem onClick={() => navigate("/admin/cliente-vendendo")}>
            CLIENTE VENDENDO
          </MenuItem>
          <MenuItem onClick={() => navigate("/admin/cliente-comprando")}>
            CLIENTE COMPRANDO
          </MenuItem>
          <MenuItem>CONTATOS DE CLIENTES</MenuItem>
        </SubMenu>

        <SubMenu label="CONFIG MKT">
          <MenuItem>MKT INTERNO</MenuItem>
          <MenuItem>CADASTRO COTISTAS</MenuItem>
          <MenuItem>EMAILS AUTOMATICOS</MenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>
  );
  const admSitesItems: MenuProps["items"] = [
    {
      key: "1",
      label: "ELEMENTOS EXTERNOS",
      className: "text-white",
      children: [
        {
          label: "EMAILS",
          key: "1-1",
          onClick: () => {
            setLink("email");
            navigate("/admin/email");
          },
        },
        {
          label: "TELEFONES",
          key: "1-2",
          onClick: () => {
            setLink("telefones");
            navigate("/admin/telefones");
          },
        },
        {
          label: "HORARIO DE ATENDIMENTO",
          key: "1-3",
          onClick: () => {
            setLink("office-hours");
            navigate("/admin/office-hours");
          },
        },
        {
          label: " CNPJ",
          key: "1-4",
          onClick: () => {
            setLink("cnpj");
            navigate("/admin/cnpj");
          },
        },
        {
          label: "ENDEREÇO",
          key: "1-5",
          onClick: () => {
            setLink("address");
            navigate("/admin/address");
          },
        },
        {
          label: "FORMULARIOS",
          key: "1-6",
          onClick: () => {
            setLink("form");
            navigate("/admin/form");
          },
        },
      ],
    },
    {
      key: "2",
      label: "ELEMENTOS INTERNOS",
      children: [
        {
          key: "2-1",
          label: "ADMINISTRATORS",
          onClick: () => {
            setLink("administrators");
            navigate("/admin/administrators");
          },
        },
        {
          key: "2-2",
          label: "MARGEM COTISTA",
        },
        {
          key: "2-3",
          label: "TEXTOS MODELOS",
        },
        {
          key: "2-4",
          label: "TAGS PERSONALIZADAS - FORMULARIO",
        },
        {
          key: "2-5",
          label: "MOD WHATSAPP",
          onClick: () => {
            setLink("whatsapp");
            navigate("mod-whatsapp");
          },
        },
        {
          key: "2-6",
          label: "MOD TEL",
        },
        {
          key: "2-7",
          label: "DADOS BANCARIOS",
          onClick: () => {
            setLink("bank-info");
            navigate("/admin/bank-info");
          },
        },
      ],
    },
  ];

  const manageCustomersitems: MenuProps["items"] = [
    {
      label: "CLIENTE VENDENDO",
      key: "1",
      onClick: () => {
        setLink("cliente-vendendo");
        navigate("/admin/cliente-vendendo");
      },
    },
    {
      label: "CLIENTE COMPRANDO",
      key: "2",
      onClick: () => {
        setLink("cliente-comprando");
        navigate("/admin/cliente-comprando");
      },
    },
    {
      label: "ONTATOS DE CLIENTES",
      key: "3",
    },
  ];
  const configItems: MenuProps["items"] = [
    {
      label: "MKT INTERNO",
      key: "1",
    },
    {
      label: "CADASTRO COTISTAS",
      key: "2",
    },
    {
      label: "EMAILS AUTOMATICOS",
      key: "3",
    },
  ];
  const userItems: MenuProps["items"] = [
    {
      label: "Bem Vindo!",
      key: "1",
    },
    {
      label: "Modo Escruro",
      key: "2",
      icon: <Switch size="small" />,
      onClick: () => {
        if (document.body.classList.contains("dark"))
          document.body.classList.remove("dark");
        else document.body.classList.add("dark");
      },
    },
    {
      key: "3",
      type: "divider",
    },
    {
      key: "4",
      label: "Sair",
      onClick: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("fullname");
        navigate("/admin/login");
      },
      icon: <RiLogoutBoxLine />,
    },
  ];
  const header = (
    <div
      // className="min-h-[7rem] w-full  flex pt-5 pb-2 px-4 bg-white"
      className={`min-h-[7rem] z-50 sticky top-0 w-full dark:bg-[#3b4650] flex pt-5 pb-2 px-4 bg-white`}
      style={{ boxShadow: "0 1px 1px rgb(50 58 70 / 10%)" }}
    >
      <div className="h-full hover:no-underline justify-between flex flex-col">
        {/* <span className="text-[#323a46] font-bold text-3xl">VMConsortium</span>
        <span className="capitalize hover:text-[#323a46] text-[#323a46]">{link}</span> */}
        <span className="text-[#323a46] dark:text-[#f3f7f9] font-bold text-3xl">
          VMConsortium
        </span>
        <div className="flex capitalize dark:text-[#f3f7f9]  text-xs hover:text-[#323a46] text-[#323a46] gap-1 items-center">
          <div
            onClick={() => {
              setLink("home");
              navigate("panel");
            }}
            className="hover:no-underline cursor-pointer"
          >
            Home
          </div>
          {link !== "home" && (
            <span className="text-[#8c98a5] -mt-[0.7px]">&gt; {link}</span>
          )}
        </div>
      </div>

      {/* <div className="ml-auto gap-10 flex itmes-center"> */}
      <div className="ml-auto dark:text-[rgba(255,255,255,0.75)] text-[#6c757d] gap-10 flex itmes-center">
        <div
          onClick={() => {
            setLink("home");
            navigate("panel");
          }}
          // className="text-[#6c757d] cursor-pointer hover:text-[#6c757d] hover:no-underline"
          className="cursor-pointer hover:no-underline"
        >
          HOME
        </div>
        {/* <div className="text-[0.8rem] text-[#6c757d]"> */}
        <div className="relative text-[0.8rem] ">
          <Dropdown
            overlayClassName="pt-5"
            overlayStyle={{ fontSize: 10 }}
            trigger={["click"]}
            menu={{ items: admSitesItems }}
          >

            <div className="cursor-pointer text-base">
              <span>ADM SITE</span>
              <KeyboardArrowDown sx={{ height: 20, width: 20 }} />
            </div>
          </Dropdown>
        </div>
        {/* <div className="relative text-[0.8rem] text-[#6c757d]"> */}
        <div className="relative text-[0.8rem] ">
          <Dropdown
            overlayClassName="pt-5"
            overlayStyle={{ fontSize: 10 }}
            trigger={["click"]}
            menu={{ items: manageCustomersitems }}
          >
            <div className="cursor-pointer text-base">
              <span>GERENCIAR CLIENTES</span>
              <KeyboardArrowDown sx={{ height: 20, width: 20 }} />
            </div>
          </Dropdown>
        </div>
        {/* <div className="relative text-[0.8rem] text-[#6c757d]"> */}
        <div className="relative text-[0.8rem] ">
          <Dropdown
            overlayStyle={{ fontSize: 10 }}
            trigger={["click"]}
            menu={{ items: configItems }}
            // overlayClassName="pt-2"
            overlayClassName="pt-5"
          >
            <div className="cursor-pointer text-base">
              <span>CONFIG MKT</span>
              <KeyboardArrowDown sx={{ height: 20, width: 20 }} />
            </div>
          </Dropdown>
        </div>
      </div>
      <div className="relative ml-14 text-[0.8rem] ">
        <Dropdown
          overlayStyle={{ fontSize: 10, width: 150 }}
          trigger={["click"]}
          overlayClassName="pt-5"
          menu={{ items: userItems }}
        >
          <Space className="cursor-pointer text-[#323a46] dark:text-white">
            <div className="flex items  -center gap-1">
              <span>{fullname?.fistname}</span>
              <span>{fullname?.lastname}</span>
            </div>
            {/* <KeyboardArrowDown /> */}
            <KeyboardArrowDown sx={{ height: 20, width: 20 }} />
          </Space>
        </Dropdown>
      </div>
    </div>
  );

  if (!isLogged) return null;
  return (
    // <div className="h-[100vh] w-[100vw] flex flex-col overflow-x-hidden bg-white dark:bg-primary-3">
    <div className="h-screen w-screen flex flex-col overflow-x-hidden bg-[#f5f6f8]  dark:bg-[#323b44]">
      {header}
      <div className="flex">
        {/* {sidebarr} */}
        <div
          className={`overflow-y-auto  rounded-md ${
            link === "home"
              ? "dark:bg-[#323b44] bg-[#f5f6f8]"
              : "p-5 m-5  dark:bg-[#36404a]"
          } bg-white  w-full flex flex-col `}
        >
          <Routes>
            <Route path="panel" element={<Home />} />
            <Route path="email" element={<AdminEmail />} />
            <Route path="telefones" element={<AdminTels />} />
            <Route path="office-hours" element={<OfficeHours />} />
            <Route path="address" element={<Address />} />
            <Route path="cnpj" element={<CNPJ />} />
            <Route path="form" element={<Form />} />
            <Route path="administrators" element={<Admins />} />
            <Route path="bank-info" element={<BankInfo />} />
            <Route path="mod-whatsapp" element={<ModWhatsapp />} />
            <Route path="cliente-vendendo" element={<ClienteVendendo />} />
            <Route path="cliente-comprando" element={<ClienteComprando />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

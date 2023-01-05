import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { ConfigProvider } from "antd";
import { useEffect, useMemo, useState } from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import {
  BrowserRouter,
  Routes,
  Route,
  // group some routes together
  Outlet,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SaleFormA from "./components/sale-form-a";
import SaleForm from "./components/SaleForm";
import { BASE_URL } from "./env";
import useDarkMode from "./hooks/use-dark-mode";
import About from "./pages/About";
import AdminLogin from "./pages/admin/login";
import AdminPanel from "./pages/admin/panel";
import Blog from "./pages/Blog";
import Comprar from "./pages/comprar";
import Contact from "./pages/contact";
import Landing from "./pages/Landing";
import ThankYou from "./pages/ThankYou";

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#400709",
    },
    secondary: {
      main: "#080D3B",
    },
  },
});

const App = () => {
  const dark = useDarkMode();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: !dark ? "light" : "dark",
          primary: {
            // Purple and green play nicely together.
            main: "#400709",
          },
          secondary: {
            main: dark ? "#232f96" : "#080D3B",
          },
        },
      }),
    [dark]
  );
  const [configs, setConfigs] = useState<any>(null);
  useEffect(() => {
    const getConfigs = async () => {
      let res = await fetch(`${BASE_URL}/admin/get-configs`, {
        method: "GET",
      });
      let data = await res.json();
      setConfigs({ ...data.c, form: data.c.form.split(" ")[1].toLowerCase() });
    };
    getConfigs();
  }, []);
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00b96b",
        },
      }}
    >
      <ThemeProvider theme={theme}>
        <ProSidebarProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/about" element={<About />}/>
              <Route path="/blog" element={<Blog />} />
              <Route path="/thankyou" element={<ThankYou />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="/comprar" element={<Comprar />} />
              <Route path="admin/*" element={<AdminPanel />} />
              <Route path="/admin/login/" element={<AdminLogin />} />
            </Routes>
          </BrowserRouter>
        </ProSidebarProvider>
        {!window.location.pathname.includes("/admin") && (
          <SaleFormA configs={configs} />
        )}
      </ThemeProvider>
      <ToastContainer position="top-center" />
    </ConfigProvider>
  );
};

export default App;

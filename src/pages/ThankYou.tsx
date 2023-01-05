import { FC, useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import Topper from "../components/Topper";
import { BASE_URL } from "../env";

const ThankYou: FC = () => {
  return (
    <div className="">
      <Topper />
      <Header top />
      <div
        className="min-h-[100vh] font-bold text-3xl text-white flex items-center justify-center bg-center"
        style={{
          backgroundImage:
            "linear-gradient(to top, rgba(1, 40, 64, 0.7), rgba(64, 7, 9, 0.5)), url(https://vmconsorcio.com.br/img/casa-bg2.jpg)",
        }}
      >
        Thank you for registering
      </div>
      <Footer />
    </div>
  );
};
export default ThankYou;

import { Button } from "@mui/material";
import { FC } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import Topper from "../components/Topper";
const Blog: FC = () => {
  const cardsContents = [
    {
      title: "Título da postagem do blog com um resumo",
      date: "20/02/2021",
      innerText:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
    {
      title: "Título da postagem do blog com um resumo",
      date: "20/02/2021",
      innerText:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
    {
      title: "Título da postagem do blog com um resumo",
      date: "20/02/2021",
      innerText:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    },
  ];
  return (
    <div>
      <Topper />

      <div
        style={{
          backgroundImage:
            "linear-gradient(to top, rgba(1, 40, 64, 0.7), rgba(64, 7, 9, 0.5)), url(https://vmconsorcio.com.br/img/casa-bg2.jpg)",
        }}
        className="pt-10 bg-center"
      >
        <Header top={true} />
        <div className="min-h-[40vh] flex items-center justify-center text-5xl capitalize text-white font-bold">
          Blog
        </div>
      </div>
      <div className="bg-[#DAD9D4] flex flex-col items-center py-14 gap-7">
        <h1 className="text-[#40070B] text-4xl py-3 font-bold">
          Ultimas postagens
        </h1>
        <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-3 gap-10">
          {cardsContents.map((card, index) => (
            <div
              key={index}
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgba(0, 0, 0, 0.01), rgba(255, 255, 255, 0.9))",
              }}
              className="border-b items-start shadow-md border-b-solid max-w-[23rem] flex flex-col gap-4 p-10 border-b-[rgba(255,255,255,0.1)] border-r-2 border-r-solid border-r-[rgba(255,255,255,0.2)] rounded-2xl"
            >
              <div className="font-bold text-lg">{card.title}</div>
              <div className="flex  text-gray-400 gap-4">
                <div>{card.date}</div>
                <div>0</div>
              </div>
              <div>{card.innerText}</div>
              <Button variant="contained" sx={{ background: "#012840" }}>
                LEIA MAIS
              </Button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Blog;

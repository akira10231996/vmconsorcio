import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import SaleFormA from "../components/sale-form-a";
import { BASE_URL } from "../env";
import { Modal } from "antd";
import Topper from "../components/Topper";

function Landing() {
  const [configs, setConfigs] = useState(null);

  useEffect(() => {
    load();
    const elements = document.querySelectorAll(
      '[class*=" intersect:"],[class*=":intersect:"],[class^="intersect:"]'
    );

    elements.forEach((element) => {
      let observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio === 0) {
            element.setAttribute("no-intersect", "");

            return;
          }

          element.removeAttribute("no-intersect");

          element.classList.contains("intersect-once") && observer.disconnect();
        });
      });

      observer.observe(element);
    });
  }, []);

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

  const carousel1 = (
    <div
      id="carouselExampleCaptions"
      className="carousel slide relative min-h-[100vh]"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner relative w-full overflow-hidden h-[100vh]">
        <div className="carousel-item active relative float-left w-full">
          <img
            src="https://vmconsorcio.com.br/img/casa-bg.jpg"
            className="block w-full min-h-[100vh]"
            alt="..."
          />
          <div
            className="w-full min-h-[100vh] absolute left-0 top-0"
            style={{
              background:
                "linear-gradient(to top, rgba(1, 40, 64, 0.7), rgba(64, 7, 9, 0.8)), url(https://vmconsorcio.com.br/img/casa-bg.jpg)",
            }}
          />
          <div className="carousel-caption  flex flex-col justify-center items-center absolute text-center top-0">
            <h4 className="text-4xl font-medium">First slide label</h4>
            <p className="mt-4">
              Some representative placeholder content for the first slide.
            </p>
          </div>
        </div>
        <div className="carousel-item relative float-left w-full">
          <img
            src="https://vmconsorcio.com.br/img/casa-bg2.jpg"
            className="block w-full min-h-[100vh]"
            alt="..."
          />
          <div
            className="w-full min-h-[100vh] absolute left-0 top-0"
            style={{
              background:
                "linear-gradient(to top, rgba(1, 40, 64, 0.7), rgba(64, 7, 9, 0.8)), url(https://vmconsorcio.com.br/img/casa-bg.jpg)",
            }}
          />
          <div className="carousel-caption flex flex-col justify-center items-center absolute text-center top-0">
            <h4 className="text-4xl font-medium">Second slide label</h4>
            <p className="mt-4">
              Some representative placeholder content for the second slide.
            </p>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span
          className="carousel-control-prev-icon inline-block bg-no-repeat"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span
          className="carousel-control-next-icon inline-block bg-no-repeat"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );

  return (
    <div
      id="sssssss"
      className="h-[100vh] w-[100vw] flex flex-col overflow-x-hidden bg-gray-900 dark:bg-white relative"
    >
      <Topper />
      <Header top />
      {carousel1}
      <div className="w-full flex flex-col items-center p-10 px-[10%] bg-white">
        <span className="text-primary-1 text-3xl font-semibold mt-[-16px] mb-[16px] intersect:translate-y-4 opacity-0 intersect:opacity-100 intersect-once duration-1000  transition-all">
          Os Principais Tipos de Consórcios
        </span>
        <span className="mt-2">Veja quais são</span>
        <div className="flex items-center w-full mt-8">
          {Array.from({ length: 3 }).map((item, index) => (
            <div
              className="flex flex-1 flex-col text-center px-12 gap-3 transition-all intersect-once"
              key={`card_${index}`}
            >
              <span className="text-lg font-semibold">Título do card</span>
              <span>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </span>
              <Button
                variant="contained"
                className="mt-12 self-center"
                style={{
                  background: " #080D3B",
                  marginTop: 15,
                }}
                onClick={() => {
                  Modal.info({
                    icon: null,
                    content:
                      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
                    okButtonProps: {
                      style: { background: "#080d3b" },
                    },
                  });
                }}
              >
                VER MAIS
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div
        className="w-full flex flex-col items-center p-10 px-[15%] gap-4   "
        style={{
          background:
            "linear-gradient(to bottom, rgba(1, 40, 64, 0.7), rgba(1, 40, 64, 0.7), rgba(64, 7, 9, 0.8)), url(https://vmconsorcio.com.br/img/negocios-bg2.jpg)",
        }}
      >
        <span className="text-white text-3xl font-semibold mt-[-16px] mb-[16px] intersect:translate-y-4 transition-all duration-1000 ">
          Os Principais Tipos de Consórcios
        </span>
        <span className="mt-2 text-white">
          We are specialized in consolidated and consortium
        </span>
        <div className="flex items-center w-full mt-8 gap-6  ">
          {Array.from({ length: 4 }).map((item, index) => (
            <div
              className="flex flex-1 flex-col min-h-[200px] text-center px-12 gap-3 p-3 py-6 rounded-lg"
              style={{ background: "rgba(0, 0, 0, 0.4)" }}
              key={`solution_${index}`}
            >
              <span className="text-lg font-medium text-white">
                First solution
              </span>
              <span className="text-white text-md font-light ">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </span>
              <Button
                variant="contained"
                className="mt-12 self-center"
                style={{
                  background: " #012840",
                  marginTop: 15,
                }}
                onClick={() => {
                  Modal.info({
                    icon: null,
                    content:
                      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
                    okButtonProps: {
                      style: { background: "#080d3b" },
                    },
                  });
                }}
              >
                VER MAIS
              </Button>
            </div>
          ))}
        </div>
      </div>
      <Footer  />
    </div>
  );
}

export default Landing;

import Footer from "../components/footer";
import Header from "../components/header";
import Topper from "../components/Topper";

const About = () => {
  const aboutData = [
    {
      title: "Confiança",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    },
    {
      title: "Segurança",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    },
    {
      title: "Velocidade",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    },
    {
      title: "Atendimento",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
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
        className="pt-10 bg-center min-h-[40vh] flex items-center justify-center  text-white"
      >
        <Header top/>
        <span className="text-5xl capitalize font-bold">Quem Somos</span>
      </div>
      <div className="bg-[#DAD9D4] gap-14 py-14 items-center flex flex-col ">
        <div className="flex xl:flex-col-reverse gap-14">
          <div className="max-w-[37rem] gap-5 flex flex-col items-start">
            <div className="text-[#400709] text-3xl leading-10 font-bold">
              Titulo
            </div>
            <div className=" font-light flex flex-col gap-5 leading-6">
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem
                ducimus minus est illum dolore. Quasi odio magnam quidem eveniet
                tempore nobis temporibus, magni explicabo soluta repudiandae
                culpa ut error delectus?
              </p>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem
                ducimus minus est illum dolore. Quasi odio magnam quidem eveniet
                tempore nobis temporibus, magni explicabo soluta repudiandae
                culpa ut error delectus?
              </p>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem
                ducimus minus est illum dolore. Quasi odio magnam quidem eveniet
                tempore nobis temporibus, magni explicabo soluta repudiandae
                culpa ut error delectus?
              </p>
            </div>
          </div>
          <img
            src="https://vmconsorcio.com.br/img/negocios-bg.jpg"
            className="w-[33rem] object-cover"
            alt="people"
          />
        </div>
        <div className="grid gap-8 sm:grid-cols-1 xl:grid-cols-2 grid-cols-4">
          {aboutData.map((data, index) => (
            <div
              key={index}
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgba(0, 0, 0, 0.01), rgba(255, 255, 255, 0.9))",
              }}
              className="border-b items-center shadow-md border-b-solid max-w-[16.7rem] flex flex-col gap-4 p-7  border-b-[rgba(255,255,255,0.1)] border-r-2 border-r-solid border-r-[rgba(255,255,255,0.2)] rounded-2xl"
            >
              <div className="font-bold text-xl leading-7">{data.title}</div>
              <div className="leading-6  font-light">{data.desc}</div>
            </div>
          ))}
        </div>
        <div className="flex xl:flex-col gap-14">
          <img
            src="https://vmconsorcio.com.br/img/negocios-bg.jpg"
            className="w-[33rem] object-cover"
            alt="people"
          />
          <div className="max-w-[37rem] gap-4 flex flex-col items-start">
            <div className="text-[#400709] text-3xl leading-10 font-bold">
              Titulo
            </div>
            <div className=" font-light flex flex-col gap-5 leading-6">
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem
                ducimus minus est illum dolore. Quasi odio magnam quidem eveniet
                tempore nobis temporibus, magni explicabo soluta repudiandae
                culpa ut error delectus?
              </p>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem
                ducimus minus est illum dolore. Quasi odio magnam quidem eveniet
                tempore nobis temporibus, magni explicabo soluta repudiandae
                culpa ut error delectus?
              </p>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem
                ducimus minus est illum dolore. Quasi odio magnam quidem eveniet
                tempore nobis temporibus, magni explicabo soluta repudiandae
                culpa ut error delectus?
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default About;

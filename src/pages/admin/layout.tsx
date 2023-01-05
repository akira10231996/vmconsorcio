import { FC, useEffect, useState } from "react";
import {
  RiUserHeartLine,
  RiTeamLine,
  RiUserFollowLine,
  RiDatabaseLine,
} from "react-icons/ri";
import { BASE_URL } from "../../env";

const Home: FC = () => {
  const [generatedForms, setGeneratedForms] = useState([]);
  useEffect(() => {
    const getGeneratedForms = async () => {
      let res = await fetch(`${BASE_URL}/admin/generated-forms`, {
        method: "GET",
      });
      let data = await res.json();
      setGeneratedForms(data);
    };
    getGeneratedForms();
  }, []);
  return (
    // <div className="w-screen  bg-[#f5f6f8] py-5 grid grid-cols-4 sm:grid-cols-1 lg:grid-cols-2 h-screen gap-5 px-5">
    //   <div className="flex p-7 rounded shadow h-fit bg-white justify-between">
    <div className="py-5 grid grid-cols-4 sm:grid-cols-1 lg:grid-cols-2 gap-5 px-5">
      <div className="flex p-7 min-h-[11rem] rounded shadow h-fit dark:bg-[#3b4650] text-black dark:text-[#acbfd2] bg-white justify-between">
        <div className="flex flex-col gap-5">
          <span className="text-[#98a6ad] font-medium">
            Formulários Gerados Hoje
          </span>
          <span className="text-xl">
            {
              generatedForms.filter(
                (form: any) =>
                  form.timestamp.split("T")[0] ===
                  new Date().toISOString().split("T")[0]
              ).length
            }
          </span>
        </div>
        <div className="flex items-center justify-center bg-[rgba(24,201,132,.25)] h-fit rounded-[0.25rem] p-2 text-2xl text-[#18c984]">
          <RiUserHeartLine />
        </div>
      </div>
      {/* <div className="flex p-7 rounded shadow h-fit bg-white justify-between"> */}
      <div className="flex p-7 min-h-[11rem] rounded shadow h-fit dark:bg-[#3b4650] text-black dark:text-[#acbfd2] bg-white justify-between">
        <div className="flex flex-col gap-5">
          <span className="text-[#98a6ad] font-medium">
            Formulários Não Lidos
          </span>
          <span className="text-xl">
            {generatedForms.filter((form: any) => form.readed === false).length}
          </span>
        </div>
        <div className="flex items-center h-fit rounded-[0.25rem] p-2 text-2xl text-[#526dee] bg-[rgba(82,109,238,.25)] justify-center">
          <RiTeamLine />
        </div>
      </div>
      {/* <div className="flex p-7 rounded shadow h-fit bg-white justify-between"> */}
      <div className="flex p-7 min-h-[11rem] rounded shadow h-fit dark:bg-[#3b4650] text-black dark:text-[#acbfd2] bg-white justify-between">
        <div className="flex flex-col gap-5">
          <span className="text-[#98a6ad] font-medium">
            Formulários Em Destaque
          </span>
          {generatedForms.filter((form: any) => form.readed === true).length}
          <span className="text-xl"></span>
        </div>
        <div className="flex items-center justify-center text-2xl p-2 h-fit bg-[rgba(235,81,81,.25)] text-[#eb5151] rounded-[0.25rem]">
          <RiUserFollowLine />
        </div>
      </div>
      {/* <div className="flex p-7 rounded shadow h-fit bg-white justify-between"> */}
      <div className="flex p-7 min-h-[11rem] rounded shadow h-fit dark:bg-[#3b4650] text-black dark:text-[#acbfd2] bg-white justify-between">
        <div className="flex flex-col gap-5">
          <span className="text-[#98a6ad] font-medium">
            Formulários Gerados
          </span>
          <span className="text-xl">{generatedForms.length}</span>
        </div>
        <div className="flex bg-[rgba(244,191,62,.25)] text-2xl text-[#f4bf3e] items-center justify-center p-2 h-fit rounded-[0.25rem]">
          <RiDatabaseLine />
        </div>
      </div>
    </div>
  );
};
export default Home;

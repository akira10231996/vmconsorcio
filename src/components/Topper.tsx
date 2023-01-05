import { FC, useEffect, useState } from "react";
import { BASE_URL } from "../env";

const Topper: FC = () => {
  const [configs, setConfigs] = useState<any>(null);
  useEffect(() => {
    const getConfigs = async () => {
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
    getConfigs();
  }, []);
  return (
    <div className="bg-[#400709] sticky-top text-white p-5">
      <div className="max-w-[90rem] flex items-center justify-between mx-auto">
        <div className="flex gap-4 text-gray-200 text-[15px] items-center">
          {configs?.address?.display && (
            <a href="">{configs?.address?.value}</a>
          )}
          {configs?.tel1.display && (
            <a href="tel:+01122913440">{configs?.tel1.value}</a>
          )}
          {configs?.tel2.display && (
            <a href="tel:+01197101466">{configs?.tel2.value}</a>
          )}
          {configs?.whatsapp.display && (
            <a href="https://wa.me/01197101466">
              {configs?.whatsapp.value}(Whatsapp)
            </a>
          )}
        </div>
        <div className="flex gap-5 items-center">
          {configs?.officeHours.display && (
            <span className="">{configs?.officeHours.value}</span>
          )}
          {configs?.email.display && (
            <a href="mailto:someone@admin.com">{configs?.email.value}</a>
          )}
        </div>
      </div>
    </div>
  );
};
export default Topper;

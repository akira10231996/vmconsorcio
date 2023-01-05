import { Button, TextField } from "@mui/material";
import { BASE_URL } from "../../env";
import { ToastContainer, toast } from "react-toastify";
const AdminLogin = () => {
  const login = async (e: any) => {
    e.preventDefault();
    let res = await fetch(`${BASE_URL}/admin/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.elements.email.value,
        password: e.target.elements.password.value,
      }),
    });
    let data = await res.json();
    if (data["error"]) {
      // alert(data.error)
      toast.error(data.error);
      return;
    }
    localStorage.setItem("token", data.token);
    localStorage.setItem(
      "fullname",
      JSON.stringify({
        fistname: data.admin.firstName,
        lastname: data.admin.lastName,
      })
    );

    window.location.href = "/admin/panel";
  };

  return (
    <div className="antialiased bg-gray-200 text-gray-900 font-sans">
      <div className="flex items-center h-screen w-full justify-center">
        <div className="bg-white min-w-[400px] rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
          <span className="block w-full text-xl uppercase font-bold mb-4">
            VMConsortium
          </span>
          <form className="mb-4" onSubmit={login}>
            <div className="mb-4 w-full">
              <TextField
                id="email"
                type="email"
                label="Email"
                variant="standard"
                className="w-full   "
                required
              />
            </div>
            <div className="mb-6 w-full">
              <TextField
                id="password"
                type="password"
                label="Password"
                variant="standard"
                className="w-full   "
                required
              />
            </div>
            <Button
              variant="contained"
              className="mt-12 w-full"
              style={{ background: " #080D3B", marginTop: 15 }}
              type="submit"
            >
              login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

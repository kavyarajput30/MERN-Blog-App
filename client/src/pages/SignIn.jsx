import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Label, TextInput, Alert, Spinner, Toast } from "flowbite-react";
import { HiFire } from "react-icons/hi";
import { HiInformationCircle } from "react-icons/hi";
function SignIn() {

    const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState(null);
  const [loading, setloading] = useState(false);
  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value.trim();
    return setData({ ...data, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      setErrMsg(null);
      const res = await fetch("http://localhost:8000/api/v1/auth/sign-in", { 
        
        method: "POST",
        headers: {
          "Content-type": "application/json",

        },
        withCredentials: true,
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success == false) {
        setErrMsg(result.message);
      }
      if (res.ok) {
        setErrMsg(null);
        setData({
          email: "",
          password: "",
        });
        navigate("/");
      }
      console.log(result);
      setloading(false);
    } catch (err) {
      setErrMsg(err.message);
      console.log(err);
    }
  };
















    return (
        <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Link to="/" className=" font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white mr-1">
              Kavya's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is my demo project using MERN. You can sign in with your email
            and password or with Google.
          </p>
        </div>
        <div className="flex-1">
          {errMsg && (
            <Toast className="bg-red-100">
              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-900 dark:text-red-200">
                <HiInformationCircle className="h-5 w-5" />
              </div>
              <div className="ml-3 text-sm font-normal text-red-900">
                {errMsg}
              </div>
              <Toast.Toggle />
            </Toast>
          )}

          <form
            className="flex max-w-md flex-col gap-4"
            onSubmit={handleFormSubmit}
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Your email" />
              </div>
              <TextInput
                id="email1"
                type="email"
                placeholder="email"
                name="email"
                value={data.email}
                required
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Your password" />
              </div>
              <TextInput
                id="password1"
                type="password"
                placeholder="password"
                name="password"
                value={data.password}
                required
                onChange={handleInputChange}
              />
            </div>
            <Button type="submit" gradientDuoTone="purpleToPink">
              {loading ? (<>
              <Spinner color="purple"/>
              <span className="pl-3">Loading....</span>
              </>) : "Sign In"}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <Button gradientDuoTone="purpleToPink" outline>
              Sign In with Google
            </Button>
          </div>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
    )
}

export default SignIn

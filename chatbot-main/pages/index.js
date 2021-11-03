import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuth } from "../lib/auth";

export default function Home() {
  const { register, handleSubmit, watch, formState } = useForm({
    mode: "onChange",
  });

  const { currentUser, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/chat");
    }
  }, [currentUser, router]);

  const signin = async ({ email, password }) => {
    try {
      await login(email, password);
      toast.success("Successfully logged in !");
      router.push("/chat");
    } catch (err) {
      console.log(err);
      if (err.code == "auth/user-not-found") {
        toast.error("User not found");
      } else if (err.code == "auth/password") {
        toast.error("Password is incorrect");
      } else {
        toast.error("Unknown error");
      }
    }
  };

  return (
    <div className="bg-image flex flex-col items-center justify-center min-h-screen py-2">
      <div className="bg-white w-1/4 rounded-xl flex flex-col p-7 items-center justify-center">
        <h3 className="font-bold text-lg mb-10">Login</h3>
        <form onSubmit={handleSubmit(signin)} className="flex flex-col w-full">
          <input
            type="email"
            required
            placeholder="Enter email"
            {...register("email", {
              required: { value: true, message: "Email is required" },
            })}
            className="shadow-lg outline-none mb-10 px-2 py-3 rounded-lg"
          />
          <input
            type="password"
            required
            placeholder="Enter password"
            {...register("password", {
              required: { value: true, message: "Password is required" },
            })}
            className="shadow-lg outline-none mb-10 px-2 py-3 rounded-lg"
          />
          <button
            type="submit"
            className=" bg-gradient-to-b from-box-start to-box-end text-white m-3 p-3 rounded-lg shadow-sm font-bold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

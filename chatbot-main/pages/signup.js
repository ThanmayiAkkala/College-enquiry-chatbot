import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuth } from "../lib/auth";

export default function Home() {
  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });

  const { currentUser, signup } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      console.log("You are already signed in !");
      router.push("/chat");
    }
  }, [currentUser, router]);

  const signUp = async ({ email, password }) => {
    try {
      await signup(email, password);
      toast.success("Successfully created account");
      router.push("/chat");
    } catch (err) {
      console.log(err);
      if (err.code == "auth/weak-password") {
        toast.error("Weak password");
      } else if (err.code == "auth/email-already-in-use") {
        toast.error("Email already in use");
      } else {
        toast.error("Unable to create account");
      }
    }
  };

  return (
    <div className="bg-image flex flex-col items-center justify-center min-h-screen py-2">
      <div className="bg-white w-1/4 rounded-xl flex flex-col p-7 items-center justify-center">
        <h3 className="font-bold text-lg mb-10">Sign Up</h3>
        <form onSubmit={handleSubmit(signUp)} className="flex flex-col w-full">
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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

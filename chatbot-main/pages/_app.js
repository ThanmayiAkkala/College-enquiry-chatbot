import { Toaster } from "react-hot-toast";
import "tailwindcss/tailwind.css";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../lib/auth";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Toaster />
      <Navbar />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;

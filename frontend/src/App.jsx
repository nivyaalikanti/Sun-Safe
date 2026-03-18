import "./styles.css";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import UVScale from "./Components/UVScale";
import Features from "./Components/Features";
import Footer from "./Components/Footer";
import Dashboard from "./Components/Dashboard";
import { Routes, Route } from "react-router-dom";
import SubscribeForm from "./components/SubscribeForm";

function Home() {
  return (
    <>
      <Hero />
      <UVScale />
      <Features />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/subscribe" element={<SubscribeForm />} />
      </Routes>
    </>
  );
}

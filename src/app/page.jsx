import Link from "next/link";
import Nav from "./components/Nav";
import { BackgroundBeams } from "./components/ui/background-beams";
import { Button } from "./components/ui/button";
import ButtonGetStarted from "./components/buttonGetStarted";
import { SplineBg } from "@/components/bg-spline";

export default function Home() {
  return (
    <div className="relative  pt-4 h-screen overflow-hidden">
      <Nav />
      <div className="relative w-[90%] m-auto  h-[80%] flex flex-col gap-3 justify-center items-center text-center z-10">
        <h2 className="max-w-[60%] text-5xl md:text-6xl font-medium">
          Effortless Room Management for Optimal Learning
        </h2>
        <p className="max-w-[40%] font-light text-sm">
          Streamline the scheduling and management of classrooms, labs, and
          meeting spaces with our user-friendly system
        </p>
        <ButtonGetStarted></ButtonGetStarted>
      </div>
      {/* Background components */}
      {/* <BackgroundBeams className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none" /> */}
      <SplineBg ></SplineBg>
    </div>
  );
}

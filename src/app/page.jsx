import Link from "next/link";
import Nav from "./components/Nav";
import { BackgroundBeams } from "./components/ui/background-beams";
import { Button } from "./components/ui/button";
import ButtonGetStarted from "./components/buttonGetStarted";

export default function Home() {
  return (
    <div className="relative w-[90%] m-auto pt-4 h-screen">
      <Nav />
      <div className="relative w-full h-[80%] flex flex-col gap-3 justify-center items-center text-center z-10">
        <h2 className="max-w-[60%] text-6xl font-medium">
          Effortless Room Management for Optimal Learning
        </h2>
        <p className="max-w-[40%] font-light text-sm">
          Streamline the scheduling and management of classrooms, labs, and
          meeting spaces with our user-friendly system
        </p>
        <ButtonGetStarted></ButtonGetStarted>
      </div>
      {/* Background components */}
      <BackgroundBeams className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none" />
    </div>
  );
}

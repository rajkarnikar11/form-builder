import Image from "next/image";
import Formstructure from "./components/Formstructure";
import LiveForm from "./components/LiveForm";

export default function Home() {
  return (
    <div className=" h-full " >
      <div className="p-6 sticky top-0 z-100 bg-teal-900 text-gray-50 "><h1 className=" font-bold text-4xl"> Form Builder</h1></div>
      <div className="p-6 flex h-full gap-4">
        <Formstructure />
        <LiveForm />
      </div>
    </div>
  );
}

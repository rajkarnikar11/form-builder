import Image from "next/image";
import Formstructure from "./components/Formstructure";

export default function Home() {
  return (
    <div className="p-6" >
     <h1 className=" font-bold text-4xl"> Form Builder</h1>
     <Formstructure/>
    </div>
  );
}

import Image from "next/image";
import Heroui from "./components/Heroui/Heroui";
import Footer from "./components/Footer/Footer";
import Banner from "./components/Banner/Banner";
import Cards from "./components/Card/Cards";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
           <Heroui/>  
              <Banner/> 
              <Cards/>
           <Footer/>
    </div>
  );
}

"use client";
import Image from "next/image";
import ButtonComponent from "./ButtonComponent";
import { useRouter } from "next/navigation";


interface HeroProps{
    hTitle: string;
    subTitle: string;
    hImage:string;
    hColor1:string;
    hColor2:string;
}

const HeroSection = ({hTitle,subTitle,hImage,hColor1, hColor2}:HeroProps) => {
  const router = useRouter();
  return (
    <section className={`relative w-full min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br ${hColor1} ${hColor2} px-6 `}>
      {/* Background Blur Effect */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 max-w-3xl text-white">
        <h1 className="text-4xl sm:text-6xl font-bold leading-tight">
          {hTitle}
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-200">
          {subTitle}
        </p>

        <div className="mt-6 flex justify-center gap-4">
          
            <ButtonComponent onClick={()=>{router.push(`/search?q=`);}} ButtonName="Shop Now" ButtonColor1="bg-white" ButtonColor2="hover:bg-gray-200" TextColor="text-blue-600" className=" px-6 py-3 font-semibold"/>

            <ButtonComponent onClick={()=>{router.push("/AboutUs")}} ButtonName="Learn more" ButtonColor1="bg-white" ButtonColor2="hover:bg-gray-200" TextColor="text-blue-600" className="px-6 py-3 font-semibold"/>

        </div>
      </div>

      {/* Background Image */}
      <div className="absolute bottom-0 w-full h-64">
        <Image
          src={hImage} // Replace with your image
          alt="Hero"
          layout="fill"
          objectFit="cover"
          className="opacity-80"
        />
      </div>
    </section>
  );
};

export default HeroSection;


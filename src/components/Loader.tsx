"use client"
import { motion } from "framer-motion";

 const Loader = () => {
  return (
    <>
     <div className="flex items-center justify-center h-screen bg-white bg-opacity-60">
      <motion.div
        className="w-16 h-16 border-4 border-black border-t-transparent border-b-transparent rounded-full "
        animate={{ rotate: 360, scale: [1, 1.3, 1] }}
        transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
        />
    </div>
        </>
  );
};

export default Loader;

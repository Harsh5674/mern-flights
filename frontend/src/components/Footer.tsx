
function Footer(){
   return(
        <div className="bg-blue-800 py-10">
        <div className="container mx-auto flex flex-col sm:justify-between sm:flex-row items-center">
        <span className="text-3xl text-orange-400 font-bold tracking-tight">
            MernAir.com
        </span>
        <span className="text-white font-bold tracking-tight flex gap-4">
            <p className="cursor-pointer">Privacy Policy</p>
            <p className="cursor-pointer">Terms of Service</p>
        </span>
        </div>
    </div>
   );
};

export default Footer;
import { BsGear, BsSmartwatch } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaRegBell } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { MdWbSunny } from "react-icons/md";
import { SlCalender } from "react-icons/sl";

const Header = () => {
    return (
        <div className="flex flex-row justify-between gap-10 mx-10 mt-5" >
            {/* left navbar */}
            <div className="flex flex-row gap-40 justify-between py-1">


                <a className="flex gap-1 items-center flex-row justify-center bg-white rounded-full px-3 cursor-pointer border-2 border-white transition duration-200 ease-in-out hover:text-[#FB5607] duration-400">
                    <div className="py-1" ><MdWbSunny/></div>
                    <div>timeposible</div>
                </a>

                {/* middle navbar */}
                <div className="flex flex-row gap-14 align-right items-center px-16 rounded-full bg-white">
                    <a className="flex gap-1 justify-center items-center transition duration-200 ease-in-out hover:text-[#FB5607]" >
                        <GoHome />
                        <a href="/home" className=" duration-100" >Home</a>
                    </a>
                    <a className="flex gap-1 justify-center items-center transition duration-200 ease-in-out hover:text-[#FB5607]" >
                        <SlCalender />
                        <a href="/Calender" className=" duration-100" >Calender</a>
                    </a>
                    <a className="flex gap-1 justify-center items-center transition duration-200 ease-in-out hover:text-[#FB5607]" >
                        <BsSmartwatch />
                        <a href="/Activity" className=" duration-100" >Activity</a>
                    </a>
                    <a className="flex gap-1 justify-center items-center transition duration-200 ease-in-out hover:text-[#FB5607]" >
                        <BsGear />
                        <a href="/Settings" className="duration-100" >Settings</a>
                    </a>

                </div>
            </div>

            {/* right navbar */}
            <div className="flex py-2 gap-4 justify-between items-center bg-white rounded-full px-3 cursor-pointer">
                <div className="rounded-full bg-[#F4F4F4] px-2 py-2 transition duration-200 ease-in-out hover:text-[#FB5607]">
                    <FaRegBell />
                </div>
                <a href="/Settings" className="rounded-full bg-[#F4F4F4] px-2 py-2 transition duration-200 ease-in-out hover:text-[#FB5607]">
                    <CgProfile size="1.3em" />
                </a>
            </div>
        </div>
    )

}

export default Header;
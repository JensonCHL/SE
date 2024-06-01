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


                <a className="flex gap-1 items-center flex-row justify-center bg-white rounded-full px-3 cursor-pointer border-2 border-white transition duration-200 ease-in-out hover:border-blue-500 hover:text-[#FB5607] duration-400">
                    <div className="py-1" ><MdWbSunny/></div>
                    <div>timeposible</div>
                </a>

                {/* middle navbar */}
                <div className="flex flex-row gap-14 align-right items-center px-16 rounded-full bg-white">
                    <a className="flex gap-1 justify-center items-center" >
                        <GoHome />
                        <a href="/" className="hover:text-[#FB5607] duration-100" >Home</a>
                    </a>
                    <a className="flex gap-1 justify-center items-center" >
                        <SlCalender />
                        <a href="/Calender" className="hover:text-[#FB5607] duration-100" >Calender</a>
                    </a>
                    <a className="flex gap-1 justify-center items-center" >
                        <BsSmartwatch />
                        <a href="/Activity" className="hover:text-[#FB5607] duration-100" >Activity</a>
                    </a>
                    <a className="flex gap-1 justify-center items-center" >
                        <BsGear />
                        <a href="/Settings" className="hover:text-[#FB5607] duration-100" >Settings</a>
                    </a>

                </div>
            </div>

            {/* right navbar */}
            <div className="flex py-2 gap-4 justify-between items-center bg-white rounded-full px-3">
                <div className="rounded-full bg-[#F4F4F4] px-2 py-2">
                    <FaRegBell />
                </div>
                <div className="rounded-full bg-[#F4F4F4] px-2 py-2">
                    <CgProfile size="1.3em" />
                </div>
            </div>
        </div>
    )

}

export default Header;
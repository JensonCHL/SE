import { MdOutlinePhotoCamera } from "react-icons/md";

const Left = () => {
    return (
        <div className="flex flex-col bg-white w-full rounded-[15px] h-full gap-y-10" >
            <div className="flex flex-col items-center justify-center pt-6" >
                <div className="p-5 bg-[#D9D9D9] rounded-full" >
                    <MdOutlinePhotoCamera size="5em" color="white" />
                </div>

                <div><span className="text-bold text-[40px]" >Username</span></div>
                <div><span className="text-bold" >USERNAME@Gmail.com</span></div>
            </div>


            <div>
                <div className="flex w-auto bg-[#8E8E8E] bg-opacity-15 rounded m-4 px-2 py-2">
                    Profile
                </div>
                <div className="flex w-auto text-[#A8A8A8] rounded m-4 px-2 py-2" >
                    System
                </div>
            </div>

        </div>
    )

}

export default Left;
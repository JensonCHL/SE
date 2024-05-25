
export default function Header() {
    return (
        <div className="flex flex-row justify-between gap-10 mx-10 mt-5" >
            {/* left navbar */}
            <div className="flex flex-row gap-40 justify-between ">
                <div className="flex py-2 flex-row align-center justify-center">timeposible</div>

                {/* middle navbar */}
                <div className="flex flex-row gap-5 align-right  border border-black py-2 px-16 rounded-full">
                    <div>home</div>
                    <div>calender</div>
                    <div>activity</div>
                    <div>settings</div>
                </div>
            </div>

            {/* right navbar */}
            <div className="flex py-2 gap-10 justify-between">
                <div>bell </div>
                <div>profile</div>
            </div>
        </div>
    )

}
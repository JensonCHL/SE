import Left from "../../componentSettings/Left"
import Right from "../../componentSettings/Right"
import System from "../../componentSettings/System"

const Settings = () => {
    return (
        <div className="flex flex-row gap-8 m-10 w-auto h-[900px]" >
            <div className="w-1/4" >
                <Left></Left>
            </div>
            <div className="w-3/4"  >
                {/* <System></System> */}
                <Right></Right>
            </div>


        </div>
    )

}

export default Settings
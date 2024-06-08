import Left from "../../componentSettings/Left"
import Right from "../../componentSettings/Right"

const Settings = () => {
    return (
        <div className="flex flex-row gap-4 m-4 w-auto h-[900px]" >
            <div className="w-1/3" >
                <Left></Left>
            </div>
            <div className="w-2/3"  >
                <Right></Right>
            </div>


        </div>
    )

}

export default Settings
import {Toaster} from "react-hot-toast";

const ToasterProvider = () => {
    return (
        <Toaster toastOptions={{
            style: {
                background: "#343434",
                color: "white"
            }
        }}/>
    )
}

export default ToasterProvider;
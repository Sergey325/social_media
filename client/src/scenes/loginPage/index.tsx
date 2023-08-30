import Form from "./Form";

type Props = {

};

const LoginPage = (props: Props) => {
    return (
        <div className="h-[100%]">
            <div className="w-full py-4 px-[6%] text-center bg-bkg-alt">
                <h1 className="font-bold text-xl md:text-2xl lg:text-3xl text-primary-main select-none transition">
                    Socialmedia
                </h1>
            </div>
            <div className="w-11/12 md:w-1/2 mx-auto my-6 md:my-8 p-5 md:p-8 rounded-2xl bg-bkg-alt">
                <Form/>
            </div>

        </div>
    );
};

export default LoginPage;
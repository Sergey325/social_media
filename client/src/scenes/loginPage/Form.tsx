import {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm, FieldValues} from "react-hook-form";
import axios from "axios";
import {setLogin} from "../../state";
import Button from "../../components/Button";
import Input from "../../components/Input";


const Form = () => {
    const [pageType, setPageType] = useState("login");
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<FieldValues>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            location: '',
            occupation: '',
            imageSrc: '',
        }
    })

    const registerUser = async (formData: FieldValues) => {
        try {
            const response = await axios.post('/auth/register', formData);
            const savedUser = response.data;
            reset();
            if (savedUser) {
                setPageType("login");
            }
        } catch (error) {
            console.error("Error while registering: ", error);
        }
    };

    const loginUser = async (formData: FieldValues) => {
        try {
            const response = await axios.post("/auth/login", formData)
            const loggedIn = response.data
            reset()

            if (loggedIn) {
                dispatch(
                    setLogin({
                        user: loggedIn.user,
                        token: loggedIn.token,
                    })
                );
                navigate("/home");
            }
        } catch (error) {
            console.error("Error while logging in:", error);
        }

    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true)
        if (isLogin) await loginUser(data)
        if (isRegister) await registerUser(data)
        setIsLoading(false)
    };

    return (
        <div className="w-full flex flex-col gap-4 text-xs lg:text-base">
            <Input
                id="email"
                label='Email'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                type="password"
                label='Password'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />

            <Button
                label={"Submit"}
                disabled={isLoading}
                onClick={handleSubmit(onSubmit)}
            />
        </div>
    );
};

export default Form;
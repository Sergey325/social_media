import {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm, FieldValues} from "react-hook-form";
import axios from "axios";
import {setLogin} from "../../state";
import Button from "../../components/Button";
import Input from "../../components/Input";
import ImageUpload from "../../components/ImageUpload";


const Form = () => {
    const [pageType, setPageType] = useState("register");
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
        watch,
        setValue
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

    const imageSrc = watch('imageSrc')

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        })
    }


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
        <div className="w-full flex flex-col gap-4 text-xs lg:text-sm">
            <span className=" text-lg text-neutral-dark">Welcome to Socialmedia, the Social Media for Sociopaths!</span>
            <div className="flex gap-4">
                <Input
                    id="firstName"
                    label='First Name'
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <Input
                    id="lastName"
                    label='lastName'
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
            <Input
                id="occupation"
                label='Occupation'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <div className="rounded-md border-2 border-neutral-400 p-2">
                <ImageUpload/>
            </div>
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

            <div className="text-sm text-bkg-alt">
                <Button
                    label={isLogin ? "LOGIN" : "REGISTER"}
                    disabled={isLoading}
                    onClick={handleSubmit(onSubmit)}
                />
            </div>

        </div>
    );
};

export default Form;
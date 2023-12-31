import {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {SubmitHandler, useForm, FieldValues} from "react-hook-form";
import axios from "axios";
import {setLogin} from "../../state";
import Button from "../../components/UI/Button";
import FormInput from "../../components/UI/FormInput";
import ImageUpload from "../../components/UI/ImageUpload";
import toast from 'react-hot-toast';

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
        watch,
        setValue
    } = useForm<FieldValues>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: 'test@gmail.com',
            password: 'test',
            location: '',
            occupation: '',
            pictureUrl: '',
        }
    })

    const pictureUrl = watch('pictureUrl')

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        })
    }


    const registerUser = (formData: FieldValues) => {
        setIsLoading(true)
        axios.post(`${process.env.REACT_APP_ENDPOINT}/auth/register`, formData)
            .then((res) => {
                const savedUser = res.data
                if (savedUser) {
                    setPageType("login");
                }
                toast.success("Account created!")
            })
            .catch(error => {
                toast.error(error.response?.data.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    };

    const loginUser = (formData: FieldValues) => {
        setIsLoading(true)
        axios.post(`${process.env.REACT_APP_ENDPOINT}/auth/login`, formData)
            .then(res => {
                const loggedIn = res.data
                reset()

                if (loggedIn) {
                    toast.success("Logged in")
                    dispatch(
                        setLogin({
                            user: loggedIn.user,
                            token: loggedIn.token,
                        })
                    );
                    navigate("/home");
                }
            })
            .catch(error => {
                toast.error(error.response?.data.message)
            })
            .finally(() => {
                setIsLoading(false)
            })
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true)
        if (isLogin) loginUser(data)
        if (isRegister) registerUser(data)
        setIsLoading(false)
    };

    return (
        <div className="w-full flex flex-col gap-4 text-xs lg:text-sm">
            <span className=" text-lg text-neutral-dark">Welcome to Socialmedia, the Social Media for Sociopaths!</span>
            {
                pageType === "register" &&
                <>
                    <div className="flex gap-4">
                        <FormInput
                            id="firstName"
                            label='First Name'
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                        />
                        <FormInput
                            id="lastName"
                            label='lastName'
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                        />
                    </div>
                    <FormInput
                        id="location"
                        label='Location'
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                    <FormInput
                        id="occupation"
                        label='Occupation'
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                    <div className="rounded-md border-2 border-neutral-400 p-2">
                        <ImageUpload onChange={(pictureUrl) => setCustomValue("pictureUrl", pictureUrl)}/>
                    </div>
                </>
            }

            <FormInput
                id="email"
                label='Email'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <FormInput
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
            <span
                onClick={() => {
                    setPageType(isLogin ? "register" : "login");
                    reset();
                }}
                className="
                    underline
                    cursor-pointer
                    text-primary-main
                    hover:text-primary-light
                    max-w-max
                "
            >
                {isLogin
                    ? "Don't have an account? Sign Up here."
                    : "Already have an account? Login here."
                }
            </span>
        </div>
    );
};

export default Form;
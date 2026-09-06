import { useState } from "react";
import { login } from "../api/authApi";
import useForm from "./useForm";
import toast from 'react-hot-toast';

export function useLogin() {
    const [error, setError] = useState(null);

    const { formData, handleChange } = useForm({
        email: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(null);

        if (!formData.email || !formData.password) {
            setError("Email and password are required!!!!");
            return;
        }

        try {
            const response = await login(formData);
            toast.success(response.data?.message);
        } catch (error) {
            const message = error.response?.data?.errorMessage ?? "Something went wrong. Please try again.";
            setError(message);
        }
    };

    return { formData, handleSubmit,handleChange,error };
}
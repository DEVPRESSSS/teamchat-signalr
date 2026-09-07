import { useState } from "react";
import { login } from "../api/authApi";
import useForm from "./useForm";
import toast from 'react-hot-toast';
import {useNavigate } from "react-router-dom"
export function useLogin() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { formData, handleChange } = useForm({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(null);

        if (!formData.email || !formData.password) {
            setError("Email and password are required!!!!");
            return;
        }

        setLoading(true);
        try {
            const response = await login(formData);
            toast.success(response.data?.message);

            navigate("/userdashboard");

        } catch (error) {
            const message = error.response?.data?.errorMessage ?? "Something went wrong. Please try again.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return { formData, handleSubmit, handleChange, error, loading };
}
import { useState } from "react";
import useForm from "./useForm";
import { register } from "../api/authApi";
import toast from 'react-hot-toast';
import {useNavigate } from 'react-router-dom'

export function useRegister() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { formData, handleChange } = useForm({
        email:"",
        name:"",
        rawPassword:"",
        confirmPassword:"",
    });
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(null);

        if (!formData.email || !formData.rawPassword) {
            setError("Email and password are required!!!!");
            return;
        }

        if (!formData.name) {
            setError("Name is required!!!!");
            return;
        }

        if (formData.rawPassword != formData.confirmPassword) {
            setError("Password don't match!!!");
            return;
        }
       
        setLoading(true);

        try {

            const result = await register(formData);
            toast.success(result.data.message);

            navigate("/login");

        } catch (error) {
            const errorMessage = error.response?.data?.errorMessage;
            setError(errorMessage);
        } finally {
            setLoading(false);
        }


    };
    return { formData,error,loading, handleChange, handleSubmit };
}
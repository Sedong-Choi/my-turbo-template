import { useEffect, useState } from 'react';

interface FormValues {
    email: string;
    password: string;
    confirmPassword?: string;
    userName?: string;
}



export interface FormErrors {
    email?: errorProps;
    password?: errorProps;
    confirmPassword?: errorProps;
    userName?: errorProps;
}

interface errorProps {
    text: string;
    order: number;
}

type validateType = "login" | "signup";


function setInitialValues(type: validateType): FormValues {
    const baseFields = { email: '', password: '' };
    const signupFields = ["confirmPassword", "userName"];
    return type === 'login'
        ? baseFields
        : signupFields.reduce((acc, field) => ({ ...acc, [field]: '' }), baseFields);
}
const useValidateForm = (type: validateType) => {
    // login and signup error focus order
    const errorOrder = ['email', 'password', 'confirmPassword', 'userName'];

    
    const [values, setValues] = useState<FormValues>(
        setInitialValues(type)
    );
    const [targetField, setTargetField] = useState<keyof FormValues | null>(null);
    const [isDirty, setIsDirty] = useState(false);
    useEffect(() => {
        if (targetField) {
            validateForm(targetField);
        }
    }, [targetField, values]);
    const [errors, setErrors] = useState<FormErrors>({});

    const validateForm = async (fieldName?: keyof FormValues): Promise<boolean> => {
        const newErrors: FormErrors = { ...errors };

        if (fieldName) {
            // Validate only the specified field
            await validateField(fieldName);
        } else {
            // Validate all fields
            for (const field in values) {
                await validateField(field as keyof FormValues);
            }
            setIsDirty(true);
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;

        async function validateField(field: keyof FormValues) {
            switch (field) {
                case 'email':
                    if (!values.email) {
                        newErrors.email = { text: 'Email is required', order: errorOrder.indexOf('email') };

                    } else if (!values.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i)) {
                        newErrors.email = { text: 'Invalid email format', order: errorOrder.indexOf('email') };
                    } else {
                        delete newErrors.email
                    }
                    break;
                case 'password':
                    if (!values.password) {
                        newErrors.password = { text: 'Password is required', order: errorOrder.indexOf('password') };
                    } else if (values.password.length < 6) {
                        newErrors.password = { text: 'Password must be at least 6 characters long', order: errorOrder.indexOf('password') };
                    } else {
                        delete newErrors.password;
                    }
                    break;
                case 'confirmPassword':
                    if (values.password !== values.confirmPassword) {
                        newErrors.confirmPassword = { text: 'Passwords do not match', order: errorOrder.indexOf('confirmPassword') };
                    } else {
                        delete newErrors.confirmPassword;
                    }
                    break;
                case 'userName':
                    if (!values.userName) {
                        newErrors.userName = { text: 'User name is required', order: errorOrder.indexOf('userName') };
                    } else if (values.userName.length < 2) {
                        newErrors.userName = { text: 'User name must be at least 2 characters long', order: errorOrder.indexOf('userName') };
                    } else {
                        delete newErrors.userName;
                    }
                    break;
                default:
                    break;
            }
            
        }
    };

    const handleChange = (name: keyof FormValues, value: string) => {
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
        if( type === 'login' && !isDirty) {
            return ;
        }
        setTargetField(name);
    };

    return {
        values,
        errors,
        handleChange,
        validateForm,
    };
}

export default useValidateForm;

export type useValidateFormReturn = ReturnType<typeof useValidateForm>;
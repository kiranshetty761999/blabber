import * as React from 'react';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import classes from './SignUp.module.css'
import Loader from '../../Loader/Loader';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { SignUpOperation } from '../../../services/blabberApiHandler';
import { updateSnackBar } from '../../../store/SnackBarSlice';
import { useDispatch } from "react-redux";

const SignUp = () => {
    const {
        handleSubmit,
        register,
        setError,
        clearErrors,
        formState: { errors },
        watch,
    } = useForm();

    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = React.useState({
        password: false,
        confirmPassword: false,
    });
    const [picLoading, setPicLoading] = React.useState(false);
    const [uploadSuccess, setUploadSuccess] = React.useState(false);
    const [profileLink, setProfileLink] = React.useState('');

    const handleClickShowPassword = (field) => () => {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleFileInputChange = async (event) => {
        const pic = event.target.files[0];

        setPicLoading(true);

        if (!pic) {
            clearErrors('image');
            return;
        }

        if (!['image/jpeg', 'image/png'].includes(pic.type)) {
            setError('image', {
                type: 'custom',
                message: 'Image must be in JPEG or PNG format',
            });
            event.target.value = '';
            return;
        }

        if (pic.size > 5 * 1024 * 1024) {
            setError('image', {
                type: 'custom',
                message: 'Image must be under 5MB',
            });
            event.target.value = '';
            return;
        }

        const data = new FormData();
        data.append('file', pic);
        data.append('upload_preset', 'Blabber');
        data.append('cloud_name', 'dxludokby');
        fetch('https://api.cloudinary.com/v1_1/dxludokby/image/upload', {
            method: 'post',
            body: data,
        })
            .then((res) => res.json())
            .then((data) => {
                setProfileLink(data.url);
                setPicLoading(false);
                setUploadSuccess(true);
            })
            .catch((err) => {
                console.log(err);
                setPicLoading(false);
            });

        clearErrors('image');
    };

    const onSubmit = async (data) => {
        const { password, confirmPassword } = data;

        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(.{8,})$/;

        if (!passwordRegex.test(password)) {
            setError('password', {
                type: 'custom',
                message: 'Password length should be at least 8 characters with 1 special character and 1 number',
            });
            return;
        }

        if (password !== confirmPassword) {
            setError('confirmPassword', {
                type: 'custom',
                message: 'Passwords do not match',
            });
            return;
        } else {
            clearErrors('confirmPassword');
        }

        console.log(data);
        const payload = {
            name: data.name,
            email: data.email,
            password: data.password,
            profilePic: profileLink,
        };

        try {
            const response = await SignUpOperation(payload)
            console.log(response?.data)
            if (response?.data?.success) {
                localStorage.setItem('name', response?.data?.data?.name)
                localStorage.setItem('userId', response?.data?.data?.userId)
                localStorage.setItem('profilePic', response?.data?.data?.profilePic)
                localStorage.setItem('token', response?.data?.data?.token)

            }
            else {
                dispatch(
                    updateSnackBar({
                        open: true,
                        severity: 'error',
                        message: 'Failed to SignUp'
                    })
                )
            }
        }
        catch (error) {
            dispatch(
                updateSnackBar({
                    open: true,
                    severity: 'error',
                    message: 'Something went wrong'
                })
            )
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.container}>
                    <TextField
                        id="outlined-basic"
                        label="Whisper your true name"
                        variant="outlined"
                        sx={{ width: '100%' }}
                        {...register('name', { required: 'Name is required' })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                    <TextField
                        id="email"
                        label="Spill the email beans!"
                        sx={{ width: '100%', m: 1 }}
                        className={errors.email ? 'error' : ''}
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^\S+@\S+\.\S+/,
                                message: 'Invalid email address',
                            },
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Conjure your secret code!</InputLabel>
                        <OutlinedInput
                            id="password"
                            type={showPassword.password ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword('password')}
                                        edge="end"
                                    >
                                        {showPassword.password ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Conjure your secret code!"
                            {...register('password', {
                                required: 'Password is required',
                            })}
                            error={!!errors.password}
                        />
                        <span className={classes.error}>{errors.password && errors.password.message}</span>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-confirm-password">Validate Sorcery!</InputLabel>
                        <OutlinedInput
                            id="confirmPassword"
                            type={showPassword.confirmPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword('confirmPassword')}
                                        edge="end"
                                    >
                                        {showPassword.confirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Validate Sorcery!"
                            {...register('confirmPassword', {
                                required: 'Confirm Password is required',
                            })}
                            error={!!errors.confirmPassword}
                        />
                        <span className={classes.error}>{errors.confirmPassword && errors.confirmPassword.message}</span>
                    </FormControl>
                    <input
                        type="file"
                        id="imageInput"
                        accept=".jpg, .jpeg, .png"
                        onChange={handleFileInputChange}
                        style={{ display: 'none' }}
                    />

                    <span className={classes.error}>{errors.image && errors.image.message}</span>
                    <span style={{ width: '100%', textAlign: 'center' }}>Weave your visual charm</span>
                    <span style={{ fontSize: '0.75rem' }}>  Upload an image (JPEG or PNG, max 5MB)</span>
                    {!picLoading ? (
                        uploadSuccess ? (
                            <div className={classes.uploadSuccess}>
                                <CheckCircleIcon />
                                <span>Uploaded successfully</span>
                            </div>
                        ) : (
                            <label htmlFor="imageInput">
                                <CloudUploadOutlinedIcon
                                    sx={{ fontSize: '5rem', color: '#707070', cursor: 'pointer' }}
                                />
                            </label>
                        )
                    ) : (
                        <Loader />
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ width: '100%', textTransform: 'initial', backgroundColor: '#7584F4' }}
                        disabled={Object.keys(errors).length > 0 || picLoading}
                    >
                        Join the Blabber Babble!
                    </Button>
                </div>
            </form>
        </>
    );
};

export default SignUp;

import { configureStore } from '@reduxjs/toolkit';
import SnackBarSlice from './SnackBarSlice';

const store = configureStore({
    reducer: {
        snackBar:SnackBarSlice ,
    },
});

export default store;
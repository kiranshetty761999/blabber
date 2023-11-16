import { configureStore } from '@reduxjs/toolkit';
import SnackBarSlice from './SnackBarSlice';
import AddGroupSlice from './AddGroupSlice';
import ImageUploadSlice from './ImageUploadSlice';

const store = configureStore({
    reducer: {
        snackBar:SnackBarSlice ,
        addGroup:AddGroupSlice,
        imageUpload:ImageUploadSlice
    },
});

export default store;
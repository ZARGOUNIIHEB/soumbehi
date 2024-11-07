import { configureStore } from "@reduxjs/toolkit";
import UserSlice from './UserSlice';
import AdvertSlice from './AdvertSlice';

export default configureStore({
    reducer: {
        userElement: UserSlice,
        advertElement: AdvertSlice
    }
})
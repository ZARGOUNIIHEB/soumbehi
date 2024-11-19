import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "userElement",
    initialState: [{
        _id: "user _id",
        firstName: "user firstname",
        lastName: "user lastname",
        role: "user role",
        age: 1,
        phone: 11111111,
        imageUser: "user imageUser",
        email: "user email",
        password: "user password"
    }],
    reducers: {
        setUser: (state, action) => {
            return action.payload;
        }
    }
})
export const { setUser } = userSlice.actions;
export default userSlice.reducer;

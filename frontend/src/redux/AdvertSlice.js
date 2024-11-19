import { createSlice } from '@reduxjs/toolkit';

const advertSlice = createSlice({
    name: "advertElement",
    initialState: [{
        _id: "1",
        title: "advert title",
        type: "advert type",
        price: 100,
        city: "advert city",
        delegation: "advert delegation",
        category: "advert category",
        subCategory: "advert subCategory",
        productCondition: "advert productCondition",
        imageAdvert: [
            { path: ".//images/172.jpg" }
        ]
    },
    {
        _id: "2",
        title: "advert title",
        type: "advert type",
        price: 100,
        city: "advert city",
        delegation: "advert delegation",
        category: "advert category",
        subCategory: "advert subCategory",
        productCondition: "advert productCondition",
        imageAdvert: [
            { path: ".//images/172.jpg" }
        ]
    },
    {
        _id: "3",
        title: "advert title",
        type: "advert type",
        price: 100,
        city: "advert city",
        delegation: "advert delegation",
        category: "advert category",
        subCategory: "advert subCategory",
        productCondition: "advert productCondition",
        imageAdvert: [
            { path: ".//images/172.jpg" }
        ]
    }],
    reducers: {
        setAdvert: (state, action) => {
            return action.payload;
        }
    }
})

export const { setAdvert } = advertSlice.actions;
export default advertSlice.reducer;
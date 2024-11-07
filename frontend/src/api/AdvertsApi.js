import axios from 'axios';


export const fetchAllAdverts = async () => {
    const { data } = await axios.get('http://localhost:5000/advert/allAdverts');
    return data;
}

export const postAdverts = async (values) => {
    const addAdvert = await axios.post('http://localhost:5000/advert/addAdvert', { ...values });
}

export const updateAdverts = async (id, values) => {
    const updateAdvert = await axios.put(`http://localhost:5000/advert/updateAdvert/${id}`, values);
}

export const deleteAdverts = async (id) => {
    const deleteAdvert = await axios.delete(`http://localhost:5000/advert/deleteAdvert/${id}`);
}

export const getUniqueAdvert = async (id) => {
    const { data } = await axios.get(`http://localhost:5000/advert/getAdvertById/${id}`);
    return data;
}

export const getAdvertsByUserAdvert = async (userAdvert) => {
    const { data } = await axios.get(`http://localhost:5000/advert/getAdvertByUserAdvert/${userAdvert}`);
    return data;
}
import axios from 'axios';

export const postUser = async (values) => {
    const addUser = await axios.post('http://localhost:5000/user/signup', { ...values });
}

export const updateUser = async (id, values) => {
    const updateUser = await axios.put(`http://localhost:5000/user/updateUser/${id}`, { ...values });
}

export const fetchAccount = async () => {
    const token = localStorage.getItem('token');
    console.log('This is the token you looking for:', token);
    const { data } = await axios.get('http://localhost:5000/user/myaccount', { headers: { Authorization: token } });
    return data;
}

export const fecthAllUsers = async () => {
    const { data } = await axios.get('http://localhost:5000/user/allUsers');
    return data;
}
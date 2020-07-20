import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burgur-builder.firebaseio.com/'
});

export default instance;
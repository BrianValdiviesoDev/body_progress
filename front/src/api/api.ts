import axios from './axiosConfig';
import { MeasureEntity } from './entities';

const api_url = process.env.VITE_API_URL;

export const listMeasures = async (): Promise<MeasureEntity[]> => {
    const response = await axios.get(`${api_url}/measures`);
    return response.data;
}
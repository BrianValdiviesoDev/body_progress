import axios from './axiosConfig';
import { MeasureEntity } from './entities';

const api_url = import.meta.env.VITE_API_URL;

export const listMeasures = async (initDate?:string, endDate?:string): Promise<MeasureEntity[]> => {
    const response = await axios.get(`${api_url}/measures?initDate=${initDate}&endDate=${endDate}`);
    return response.data;
}

export const createMeasure = async (measure: MeasureEntity): Promise<MeasureEntity> => {
    const response = await axios.post(`${api_url}/measures`, measure);
    return response.data;
}

export const editMeasure = async (measure: MeasureEntity): Promise<MeasureEntity> => {
    const response = await axios.put(`${api_url}/measures/${measure._id}`, measure);
    return response.data;
}
import Axios, { AxiosInstance } from 'axios';

export class ScapholdService {
    client: AxiosInstance;

    constructor(private url: string, private token: string) {
        this.client = Axios.create({
            baseURL: url,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    }

    async post<T>(query: string) {
        return this.client.post('', {
            query: query
        })
        .then(res => res.data.data as T)
    }
}
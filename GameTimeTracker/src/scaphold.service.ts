import { ScapholdViewFilters, OrderByObject } from './scaphold.service';
import Axios, { AxiosInstance } from 'axios';

export interface ScapholdUser {
    id: string
}

export interface ScapholdViewFilters {
    where?: any;
    orderBy?: OrderByObject[];
    first?: number;
    after?: string;
    last?: number;
    before?: string;
}

export enum OrderByDirection {
    ASC = "ASC",
    DESC = "DESC"
}

export interface OrderByObject {
    field: string,
    direction: OrderByDirection
}

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

    async post<T>(query: string, variables?: ScapholdViewFilters) {
        variables = variables || {}
        return this.client.post('', {
            query: query,
            variables: variables
        })
        .then(res => res.data.data as T)
    }
}
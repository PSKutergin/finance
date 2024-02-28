import instance from "../api/interceptor";
import { formatDateFromISO } from '../helpers/helpers';

export class Operation {
    static async getOperations(interval = 'interval', dateFrom = null, dateTo = null) {
        let url = `api/operations`;

        switch (interval) {
            case 'week':
                url += '?period=week';
                break;
            case 'month':
                url += '?period=month';
                break;
            case 'year':
                url += '?period=year';
                break;
            case 'all':
                url += '?period=all';
                break;
            case 'interval':
                if (dateFrom && dateTo) {
                    url += `?period=interval&dateFrom=${formatDateFromISO(dateFrom)}&dateTo=${formatDateFromISO(dateTo)}`
                } else {
                    url += `?period=interval&dateFrom=${formatDateFromISO()}&dateTo=${formatDateFromISO()}`
                }
                break;
        }
        return instance.get(url)
    }

    static async setOperations({ type, amount, date, comment, category_id }) {
        return instance.post(`api/operations`, { type, amount, date, comment, category_id })
    }

    static async getOperation(id) {
        return instance.get(`api/operations/${id}`)
    }

    static async editOperation(id, { type, amount, date, comment, category_id }) {
        return instance.put(`api/operations/${id}`, { type, amount, date, comment, category_id })
    }

    static async deleteOperation(id) {
        return instance.delete(`api/operations/${id}`)
    }
}
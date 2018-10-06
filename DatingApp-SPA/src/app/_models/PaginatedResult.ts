import { Paginationinfo } from './PaginationInfo';
export class PaginatedResult<T> {
    result: T;
    paginationInfo: Paginationinfo;
}

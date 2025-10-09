import { AxiosError } from 'axios';

export type Error<T = undefined> = AxiosError<{ message: string | string[], field?: T extends undefined ? string : keyof T }>;

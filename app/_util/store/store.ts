import { IAnalytics } from '@/app/_util/analytics/analytics';

export interface IBaseStore {
  loading: { [key: string]: boolean };
  error: { [key: string]: IAnalytics<Error> };
}

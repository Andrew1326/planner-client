import { IAnalytics } from '@/app/util_/analytics/analytics';

export interface IBaseStore {
  loading: {[key: string]: boolean};
  error: {[key: string]: IAnalytics<Error>};
}

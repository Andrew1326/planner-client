export interface IAnalytics<TPayload> {
  success?: boolean;
  fail?: boolean;
  error?: Error;
  message: string;
  payload: TPayload;
}

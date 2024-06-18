'use client';

import useAuthStore from '@/app/auth/_store/authStore';
import { IAnalytics } from '@/app/_util/analytics/analytics';

type TResponseParser = 'json' | 'text';

interface IGetRequestPayload {
  method: 'GET';
  data?: undefined;
  parser: TResponseParser;
}

interface IPostRequestPayload<TData> {
  method: 'POST';
  data: TData;
  parser: TResponseParser;
}

interface IPatchRequestPayload<TData> {
  method: 'PATCH';
  data: TData;
  parser: TResponseParser;
}

interface IDeleteRequestPayload<TData> {
  method: 'DELETE';
  data: TData;
  parser: TResponseParser;
}

type TRequestPayload<TData> = (
  | IGetRequestPayload
  | IPostRequestPayload<TData>
  | IPatchRequestPayload<TData>
  | IDeleteRequestPayload<TData>
) & { path: string };

// function works with http requests
const sendRequest = async <TData, TReturn>({
  path,
  data,
  method,
  parser,
}: TRequestPayload<TData>): Promise<IAnalytics<TReturn | Error>> => {
  // compose url using server origin and path
  const url = `${process.env.NEXT_PUBLIC_SERVER_ORIGIN}${path}`;

  // request settings
  const requestInfo: RequestInit = {
    method,
  };

  // define request headers
  const headers: { [key: string]: string } = {};

  // add request body if exists
  if (data) {
    requestInfo.body = JSON.stringify(data);

    // add header content type
    headers['Content-Type'] = 'application/json';
  }

  // define auth token
  const authToken = useAuthStore.getState().authToken;

  // add authorization header if token exists
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  // apply headers
  requestInfo.headers = headers;

  // send request
  const response = await fetch(url, requestInfo);

  // parse response
  const responseData: IAnalytics<TReturn | Error> = await response[parser]();

  return responseData;
};

export default sendRequest;

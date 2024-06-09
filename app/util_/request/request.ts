'use client'

import { RequestInfo } from 'undici-types';

type TResponseParser = 'json' | 'text';

interface IGetRequestPayload {
  method: 'GET'
  data: undefined;
  parser: TResponseParser;
}

interface IPostRequestPayload<TData> {
  method: 'POST'
  data: TData;
  parser: TResponseParser;
}

interface IPatchRequestPayload<TData> {
  method: 'PATCH',
  data: TData;
  parser: TResponseParser;
}

interface IDeleteRequestPayload<TData> {
  method: 'DELETE',
  data: TData;
  parser: TResponseParser;
}

type TRequestPayload<TData> = (IGetRequestPayload | IPostRequestPayload<TData> | IPatchRequestPayload<TData> | IDeleteRequestPayload<TData>) & { path: string };

// function works with http requests
const sendRequest = async <TData, TReturn>({path, data, method, parser}: TRequestPayload<TData>): Promise<TReturn> => {
  // compose url using server origin and path
  const url = `${process.env.NEXT_PUBLIC_SERVER_ORIGIN}${path}`;

  // request settings
  const requestInfo: RequestInit = {
    method
  };

  // add request body if exists
  if (data) {
    requestInfo.body = JSON.stringify(data);

  // add header content type
    requestInfo.headers = {
      'Content-Type': 'application/json'
    }
  }

  // send request
  const response = await fetch(url, requestInfo);

  // parse response
  const responseData: TReturn = await response[parser]();

  return responseData
}

export default sendRequest

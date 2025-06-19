import axios from 'axios';

export default function queryFunction<T = unknown>(api: string) {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_SERVER,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    responseType: 'json',
    responseEncoding: 'utf8',
  });

  async function getAxios<ResponseType = T>(apiUri: string = api) {
    const response = await instance.get<ResponseType>(apiUri);
    return response.data;
  }

  async function postAxios<ResponseType = T>(formData: object, apiUri: string = api) {
    const response = await instance.post<ResponseType>(apiUri, formData);
    return response.data;
  }

  async function putAxios<ResponseType = T>(formData: object, apiUri: string = api) {
    const response = await instance.put<ResponseType>(apiUri, formData);
    return response.data;
  }

  async function patchAxios<ResponseType = T>(formData?: object, apiUri: string = api) {
    const response = await instance.patch<ResponseType>(apiUri, formData);
    return response.data;
  }

  async function deleteAxios<ResponseType = T>(formData?: object, apiUri: string = api) {
    const response = await instance.delete<ResponseType>(apiUri, formData);
    return response.data;
  }

  return { getAxios, postAxios, putAxios, patchAxios, deleteAxios };
}

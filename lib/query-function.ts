export default function queryFunction<T = unknown>(api: string) {
  async function getFetch<ResponseType = T>(apiUri: string = api) {
    const response = await fetch(apiUri, {
      method: 'GET',
      mode: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = (await response.json()) as ResponseType;
    return data;
  }

  async function postFetch<ResponseType = T>(formData: object, apiUri: string = api) {
    const response = await fetch(apiUri, {
      method: 'POST',
      mode: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = (await response.json()) as ResponseType;
    return data;
  }

  async function putFetch<ResponseType = T>(formData: object, apiUri: string = api) {
    const response = await fetch(apiUri, {
      method: 'PUT',
      mode: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = (await response.json()) as ResponseType;
    return data;
  }

  async function patchFetch<ResponseType = T>(formData?: object, apiUri: string = api) {
    const response = await fetch(apiUri, {
      method: 'PATCH',
      mode: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = (await response.json()) as ResponseType;
    return data;
  }

  async function deleteFetch<ResponseType = T>(formData?: object, apiUri: string = api) {
    const response = await fetch(apiUri, {
      method: 'DELETE',
      mode: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = (await response.json()) as ResponseType;
    return data;
  }

  return { getFetch, postFetch, putFetch, patchFetch, deleteFetch };
}

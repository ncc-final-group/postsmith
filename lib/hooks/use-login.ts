'use client';

import queryFunction from "@lib/query-function";

export default function useLogin() {
  const endpoint = process.env.API_SERVER + '/api/login';
  const { getFetch } = queryFunction(endpoint);
}
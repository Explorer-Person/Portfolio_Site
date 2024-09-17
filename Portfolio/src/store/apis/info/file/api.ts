import { axiosInstance } from '@src/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RequestApiProps } from '@src/shared';

export const fileApi = createAsyncThunk(
  'admin/file',
  async ({ endpoint, method, data, headers = {} }: RequestApiProps, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.request({
        url: `${endpoint}/${encodeURI(data as any)}`,
        method: method,
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
        ...(method !== 'GET' && { data: { data } }),
        withCredentials: true,
      });

      const responseData = response.data;
      return {
        process: responseData.process || "authorize",
        status: responseData.status || true,
        data: responseData.data || null,
        error: responseData.error || null,
        statusCode: responseData.statusCode || 200,
      };
    } catch (error: any) {
      return rejectWithValue({
        process: error.response?.data?.process || "authorize",
        status: false,
        data: null,
        error: error.response?.data?.error || error.message,
        statusCode: error.response?.status || 500,
      });
    }
  }
);

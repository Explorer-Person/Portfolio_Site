import {axiosInstance} from '@src/store'
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RequestApiProps } from '@src/shared';


export const abilityApi = createAsyncThunk(
 'admin/ability',
 async ({ endpoint, method, data, headers = {} }: RequestApiProps, { rejectWithValue }) => {
  
    try {
        const info = data.info
        const response = await axiosInstance.request({
            url: endpoint,
            method: method,
            headers: {
                ...headers,
                'Content-Type': 'application/json',
            },
            ...(method !== 'GET' && { data: { data: info } }),
            withCredentials: true,
        });
        const responseData = response.data;
          // Ensure the success response has a consistent structure
        return {
          process: responseData.process || "authorize",
          status: responseData.status || true,
          data: responseData.data || null,
          error: responseData.error || null,
          statusCode: responseData.statusCode || 200,
        };
      } catch (error: any) {
        // Return a consistent error structure
        return rejectWithValue({
          process: error.response?.data?.process || "authorize",
          status: false,
          data: null,
          error: error.response?.data?.error || error.message,
          statusCode: error.response?.status || 500,
        });
      }
  
  }
)


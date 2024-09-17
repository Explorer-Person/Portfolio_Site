import { axiosInstance } from '@src/store'
import { createAsyncThunk } from '@reduxjs/toolkit';


export const authorizeApi = createAsyncThunk(
  'auth/authorize',
  async ({ endpoint, headers = {} }:
    { endpoint: string, headers?: Record<string, string> },
  ) => {

    try {
      const response = await axiosInstance.get(endpoint, {
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      const responseData = await response.data;
      // Ensure the success response has a consistent structure

      return {
        process: responseData.process || "authorize",
        status: responseData.status || true,
        data: responseData.data || null,
        error: responseData.error || null,
        statusCode: responseData.statusCode || 200,
      };

    } catch (err : any) {
      const error = err.response.data;

      // Handle the error case based on the response
      return {
        process: error.process || "authorize",
        status: error.status,
        data: null,
        error: error.error || "Unknown error",
        statusCode: error.statusCode || 500,
      };

    }

  }
)



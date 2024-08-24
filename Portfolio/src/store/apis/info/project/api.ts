import { axiosInstance } from "@src/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RequestApiProps } from "@src/shared";

export const projectApi = createAsyncThunk(
  "admin/project",
  async ({ endpoint, method, data, headers = {} }: RequestApiProps, { rejectWithValue }) => {
    try {
      const { info, file } = data;
      let response;

      if ((method === 'POST' || method === 'PUT') && file) {
        if (file instanceof File) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("data", JSON.stringify(info)); // Attach JSON data as a string

          response = await axiosInstance.request({
            url: endpoint,
            method: method,
            headers: {
              ...headers,
              "Content-Type": "multipart/form-data",
            },
            data: formData,
            withCredentials: true,
          });
        } else {
          throw new Error("Invalid data. Ensure both file and jsonData are provided.");
        }
      } else {
        response = await axiosInstance.request({
          url: endpoint,
          method: method,
          headers: {
            ...headers,
            "Content-Type": "application/json",
          },
          ...(method !== 'GET' && { data: { info } }),
          withCredentials: true,
        });
      }

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

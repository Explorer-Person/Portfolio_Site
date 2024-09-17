import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authorizeApi, loginApi, signupApi } from "@src/store";
import { RegularResponse, LoginInfo, SignupInfo, StateResponse, response} from "@src/shared";

interface AuthState {
  infos: {
    signupData: SignupInfo;
    loginData: LoginInfo;
  };
  response: StateResponse
}

const initialState: AuthState = {
  infos: {
    signupData: {
      username: "",
      email: "",
      password: "",
    },
    loginData: {
      email: "",
      password: "",
    },
  },
  response: response,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    storeSignupData: (state, action: PayloadAction<SignupInfo>) => {
      state.infos.signupData = action.payload;
    },
    storeLoginData: (state, action: PayloadAction<LoginInfo>) => {
      state.infos.loginData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle loginApi
      .addCase(loginApi.pending, (state) => {
        state.response.loading = true;
        state.response.error = [];
      })
      .addCase(
        loginApi.fulfilled,
        (state, action: PayloadAction<RegularResponse>) => {
        const {status, process, data, statusCode} = action.payload as StateResponse;

          state.response.loading = false;
          state.response.data = data;
          state.response.process = process;
          state.response.status = status;
          state.response.statusCode = statusCode;
        }
      )
      .addCase(loginApi.rejected, (state, action) => {
        console.log(action.payload, 'helooo')
        const {status, process, error, statusCode} = action.payload as StateResponse;
        state.response.loading = false;
        state.response.status = status;
        state.response.process = process;
        state.response.statusCode = statusCode;
        state.response.error = error ?? "Failed to login";
        console.log(state.response.error);
      })
      // Handle signupApi
      .addCase(signupApi.pending, (state) => {
        state.response.loading = true;
        state.response.error = [];
        state.response.statusCode = 201;
      })
      .addCase(
        signupApi.fulfilled,
        (state, action: PayloadAction<RegularResponse>) => {
          state.response.loading = false;
          state.response.data = action.payload.data;
          state.response.process = action.payload.process;
        }
      )
      .addCase(signupApi.rejected, (state, action) => {
        const {status, process, error, statusCode} = action.payload as StateResponse;
        state.response.loading = false;
        state.response.status = status;
        state.response.process = process;
        state.response.statusCode = statusCode;
        state.response.error = error ?? "Failed to Signup";
      })
      // Handle authorizeApi
      .addCase(authorizeApi.pending, (state) => {
        state.response.loading = true;
        state.response.error = [];
        state.response.statusCode = 201;
      })
      .addCase(
        authorizeApi.fulfilled,
        (state, action: PayloadAction<RegularResponse>) => {
          state.response.loading = false;
          state.response.process = action.payload.process;
          state.response.status = action.payload.status;
        }
      )
      .addCase(authorizeApi.rejected, (state, action) => {
        const response = action.payload as StateResponse;
        const {error, statusCode, status, process} = response || {};
        state.response.loading = false;
        state.response.statusCode = statusCode;
        state.response.status = status;
        state.response.process = process;
        state.response.error = error ?? "Failed to Authorize";   
      });
  },
});

export default authSlice.reducer;
export const { storeSignupData, storeLoginData } = authSlice.actions;

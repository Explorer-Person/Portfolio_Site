import {
  abilityApi,
  adminApi,
  projectApi,
  projectImageApi,
  skillApi,
  fileApi,
} from "@src/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialStateIF } from "./interface";
import {
  AbilityBoxInfo,
  AdminInfo,
  infos,
  ProjectBoxInfo,
  ProjectImageInfo,
  RegularResponse,
  response,
  SkillBoxInfo,
} from "@src/shared";

const initialState: InitialStateIF = {
  infos: infos,
  response: response,
};

const adminSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    setAdminInfo: (state, action: PayloadAction<AdminInfo>) => {
      state.infos.adminInfo = action.payload;
    },
    setSkillBoxInfo: (state, action: PayloadAction<SkillBoxInfo>) => {
      state.infos.skillBoxInfo = action.payload;
    },
    setProjectBoxInfo: (state, action: PayloadAction<ProjectBoxInfo>) => {
      state.infos.projectBoxInfo = action.payload;
    },
    setProjectImageInfo: (state, action: PayloadAction<ProjectImageInfo>) => {
      state.infos.projectImageInfo = action.payload;
    },
    setProjectImageArray: (
      state,
      action: PayloadAction<ProjectImageInfo[]>
    ) => {
      state.infos.projectImageArray = action.payload;
    },
    setProjectBoxArray: (state, action: PayloadAction<ProjectBoxInfo[]>) => {
      console.log(action.payload);
      state.infos.projectBoxArray = action.payload;
    },
    setAbilityBoxInfo: (state, action: PayloadAction<AbilityBoxInfo>) => {
      state.infos.abilityBoxInfo = action.payload;
    },
    setFileInfo: (state, action: PayloadAction<Blob | File>) => {
      state.infos.fileInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
     // Handle fileApi
      .addCase(fileApi.pending, (state) => {
        state.response.loading = true;
        state.response.error = [];
      })
      .addCase(
        fileApi.fulfilled,
        (state, action: PayloadAction<RegularResponse>) => {
          state.response.loading = false;
          state.response.data = action.payload.data;
          state.response.process = action.payload.process;
        }
      )
      .addCase(fileApi.rejected, (state, action) => {
        const {status, process, error, statusCode} = action.payload;
        state.response.loading = false;
        console.log(action)
        state.response.status = status;
        state.response.process = process;
        state.response.statusCode = statusCode;
        state.response.error = error ?? "Failed to File Operations";
      })
      // Handle adminApi
      .addCase(adminApi.pending, (state) => {
        state.response.loading = true;
        state.response.error = [];
      })
      .addCase(
        adminApi.fulfilled,
        (state, action: PayloadAction<RegularResponse>) => {
          const result = action.payload.data;
          const data = result[0];
          state.response.loading = false;
          state.response.data = data;
          state.response.process = action.payload.process;
          state.infos.adminInfo = data.info.file !== null ? {...data,
            ...data.info,
            file: JSON.parse(data.info.file)
          } : data;
        }
      )
      .addCase(adminApi.rejected, (state, action) => {
        const {status, process, error, statusCode} = action.payload;
        state.response.loading = false;
        console.log(action)
        state.response.status = status;
        state.response.process = process;
        state.response.statusCode = statusCode;
        state.response.error = error ?? "Failed to Admin Operations";
      })
      // Handle skillApi
      .addCase(skillApi.pending, (state) => {
        state.response.loading = true;
        state.response.error = [];
        state.response.statusCode = 201;
      })
      .addCase(
        skillApi.fulfilled,
        (state, action: PayloadAction<RegularResponse>) => {
          const data = action.payload.data;
          state.response.loading = false;
          state.response.data = data;
          state.response.process = action.payload.process;

          if (action.payload.process === "getOne") {
            state.infos.skillBoxInfo = data[0];
          }
            
          const parsedData = Array.isArray(action.payload.data) ? action.payload.data.map(item=>{
              return {
                ...item,
                info: {
                  ...item.info,
                  file: JSON.parse(item.info.file),
                },
                fk: state.infos.adminInfo.id,
              }
            }) : null;
            state.infos.skillBoxArray = [...parsedData];
           
        }
      )
      .addCase(skillApi.rejected, (state, action) => {
        const {status, process, error, statusCode} = action.payload;
        state.response.loading = false;
        console.log(action)
        state.response.status = status;
        state.response.process = process;
        state.response.statusCode = statusCode;
        state.response.error = error ?? "Failed to Skill Operations";
      })
      // Handle projectApi
      .addCase(projectApi.pending, (state) => {
        state.response.loading = true;
        state.response.error = [];
        state.response.statusCode = 201;
      })
      .addCase(
        projectApi.fulfilled,
        (state, action: PayloadAction<RegularResponse>) => {
          const {data, process} = action.payload;
          
          state.response.loading = false;
          state.response.data = data;
          state.response.process = process;
          if (action.payload.process === "getOne") {
            state.infos.projectBoxInfo = data[0];
          }
          
            const parsedData = action.payload.data.map(item=>{
              return {
                ...item,
                info: {
                  ...item.info,
                  file: JSON.parse(item.info.file)
                }
              }
            })
            state.infos.projectBoxArray = [...parsedData];
        }
      )
      .addCase(projectApi.rejected, (state, action) => {
        const {status, process, error, statusCode} = action.payload;
        state.response.loading = false;
        console.log(action)
        state.response.status = status;
        state.response.process = process;
        state.response.statusCode = statusCode;
        state.response.error = error ?? "Failed to Project Operations";
      })
      // Handle projectImageApi
      .addCase(projectImageApi.pending, (state) => {
        state.response.loading = true;
        state.response.error = [];
        state.response.statusCode = 201;
      })
      .addCase(
        projectImageApi.fulfilled,
        (state, action: PayloadAction<RegularResponse>) => {
          const {data, process} = action.payload
          state.response.loading = false;
          state.response.data = data;
          state.response.process = process;
          if (process === "getOne") {
            state.infos.projectImageInfo = data[0];
          }
        
            const parsedData = data.map(item=>{
              return {
                ...item,
                info: {
                  ...item.info,
                  file: JSON.parse(item.info.file)
                }
              }
            })
            console.log(parsedData);
            state.infos.projectImageArray = [...parsedData];
        }
        
      )
      .addCase(projectImageApi.rejected, (state, action) => {
        const {status, process, error, statusCode} = action.payload;
        state.response.loading = false;
        console.log(action)
        state.response.status = status;
        state.response.process = process;
        state.response.statusCode = statusCode;
        state.response.error = error ?? "Failed to Project Image Operations";
      })
      // Handle abilityApi
      .addCase(abilityApi.pending, (state) => {
        state.response.loading = true;
        state.response.error = [];
        state.response.statusCode = 201;
      })
      .addCase(
        abilityApi.fulfilled,
        (state, action: PayloadAction<RegularResponse>) => {
          const {data, process} = action.payload
          state.response.loading = false;
          state.response.data = data;
          state.response.process = process;
          if (process === "getOne") {
            state.infos.projectImageInfo = data[0];
          }
        
          state.infos.abilityBoxArray = [...data];
        }
      )
      .addCase(abilityApi.rejected, (state, action) => {
        const {status, process, error, statusCode} = action.payload;
        state.response.loading = false;
        console.log(action)
        state.response.status = status;
        state.response.process = process;
        state.response.statusCode = statusCode;
        state.response.error = error ?? "Failed to Ability Operations";
      });
  },
});

export const {
  setAdminInfo,
  setProjectBoxInfo,
  setProjectBoxArray,
  setProjectImageInfo,
  setProjectImageArray,
  setSkillBoxInfo,
  setAbilityBoxInfo,
  setFileInfo,
} = adminSlice.actions;

export default adminSlice.reducer;

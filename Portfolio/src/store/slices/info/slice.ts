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
  StateResponse,
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
        const { status, process, error, statusCode } = action.payload as StateResponse;
        state.response.loading = false;
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
          const { status, process, data, statusCode } = action.payload as StateResponse;

          state.response.loading = false;
          state.response.data = data;
          state.response.statusCode = statusCode;
          state.response.status = status;
          state.response.process = process;
          const confirmedData = data as AdminInfo[];
          
          const parsedData = confirmedData.map(item => {
            return {
              ...item,
              info: {
                ...item.info,
                file: JSON.parse(item.info.file as string),
              },
              fk: state.infos.adminInfo.id,
            }
          });
          console.log(parsedData)
          state.infos.adminInfo = parsedData[0];
        }
      )
      .addCase(adminApi.rejected, (state, action) => {
        const { status, process, error, statusCode } = action.payload as StateResponse;
        state.response.loading = false;
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
          const { status, data, process, statusCode } = action.payload as StateResponse;

          state.response.loading = false;
          state.response.data = data;
          state.response.statusCode = statusCode;
          state.response.status = status;
          state.response.process = process;

          const confirmedData = data as SkillBoxInfo[];

          if (action.payload.process === "getOne") {
            state.infos.skillBoxInfo = confirmedData[0];
          }

          const parsedData = confirmedData.map(item => {
            return {
              ...item,
              info: {
                ...item.info,
                file: JSON.parse(item.info.file as string),
              },
              fk: state.infos.adminInfo.id,
            }
          });
          state.infos.skillBoxArray = [...parsedData];

        }
      )
      .addCase(skillApi.rejected, (state, action) => {
        const { status, process, error, statusCode } = action.payload as StateResponse;
        state.response.loading = false;
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
          const { status, process, statusCode, data } = action.payload as StateResponse;

          state.response.loading = false;
          state.response.statusCode = statusCode;
          state.response.status = status;
          state.response.data = data;
          state.response.process = process;

          const confirmedData = data as ProjectBoxInfo[];

          if (action.payload.process === "getOne") {
            state.infos.projectBoxInfo = confirmedData[0];
          }
          console.log(confirmedData)
          const parsedData = confirmedData.length < 1 ? [] : confirmedData.map(item => {
            return {
              ...item,
              info: {
                ...item.info,
                file: JSON.parse(item.info.file as string)
              }
            }
          })
          state.infos.projectBoxArray = confirmedData.length < 1 ? [] : [...parsedData];
        }
      )
      .addCase(projectApi.rejected, (state, action) => {
        const { status, process, error, statusCode } = action.payload as StateResponse;
        state.response.loading = false;
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
          const { status, process, statusCode, data } = action.payload as StateResponse;
          state.response.loading = false;
          state.response.data = data;
          state.response.status = status;
          state.response.statusCode = statusCode;
          state.response.process = process;

          const confirmedData = data as ProjectBoxInfo[];

          if (process === "getOne") {
            state.infos.projectImageInfo = confirmedData[0];
          }

          const parsedData = confirmedData.map(item => {
            return {
              ...item,
              info: {
                ...item.info,
                file: JSON.parse(item.info.file as string)
              }
            }
          })
          state.infos.projectImageArray = [...parsedData];
        }

      )
      .addCase(projectImageApi.rejected, (state, action) => {
        const { status, process, error, statusCode } = action.payload as StateResponse;
        state.response.loading = false;
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
          const { data, status, process, statusCode } = action.payload as StateResponse;

          state.response.loading = false;
          state.response.data = data;
          state.response.status = status;
          state.response.statusCode = statusCode;
          state.response.process = process;

          const confirmedData = data as AbilityBoxInfo[];  

          if (process === "getOne") {
            state.infos.abilityBoxInfo = confirmedData[0];
          }

          state.infos.abilityBoxArray = [...confirmedData];
        }
      )
      .addCase(abilityApi.rejected, (state, action) => {
        const { status, process, error, statusCode } = action.payload as StateResponse;
        state.response.loading = false;
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

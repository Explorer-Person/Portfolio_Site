import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  AlertInfo,
  ButtonInfo,
  infos,
  MainMediaInfo,
  ProjectDetailInfo,
} from "@src/shared";

interface InitialStateIF {
  confStatus: string;
  projectDetail: ProjectDetailInfo;
  buttonInfo: ButtonInfo;
  pageUrl: string;
  alertInfo: AlertInfo[];
  mainMedia: MainMediaInfo;
}

const initialState: InitialStateIF = {
  confStatus: "inactive",
  projectDetail: {
    status: false,
    projectBoxInfo: infos.projectBoxInfo,
  },
  buttonInfo: {
    buttonType: "",
    inheritor: "",
    process: "",
    id: "",
  },
  pageUrl: "",
  alertInfo: [],
  mainMedia: {
    mediaUrl: "",
    mediaType: "video",
  },
};

const pageSlice = createSlice({
  name: "pageActions",
  initialState,
  reducers: {
    setConfStatus: (state, action: PayloadAction<string>) => {
      state.confStatus = action.payload;
    },
    setProjectDetail: (state, action: PayloadAction<ProjectDetailInfo>) => {
      state.projectDetail = action.payload;
    },
    setButtonInfo: (state, action: PayloadAction<ButtonInfo>) => {
      state.buttonInfo = action.payload;
    },
    setAlertBox: (state, action: PayloadAction<AlertInfo[]>) => {
      console.log(action.payload);
        state.alertInfo = [...action.payload];
    },
    setPageUrl: (state, action: PayloadAction<string>) => {
      state.pageUrl = action.payload;
    },
    setMainMedia: (state, action: PayloadAction<MainMediaInfo>) => {
      state.mainMedia = action.payload;
    },
  },
});

export default pageSlice.reducer;
export const {
  setConfStatus,
  setProjectDetail,
  setAlertBox,
  setButtonInfo,
  setMainMedia,
  setPageUrl,
} = pageSlice.actions;

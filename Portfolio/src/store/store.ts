import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {authReducer, pageReducer, infoReducer} from './slices';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pageActions: pageReducer,
    info: infoReducer,
    //[setAuthStatus.reducerPath]: apiSlice.reducer,
  },
  //middleware: (getDefaultMiddleware) =>
   // getDefaultMiddleware().concat(apiSlice.middleware),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these field paths in the state
        ignoredPaths: ['info.infos.fileInfo', 'payload'],
      },
    }),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

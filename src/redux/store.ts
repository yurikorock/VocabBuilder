//store.ts

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  type PersistConfig,
} from "redux-persist";
import authReducer from "./auth/authSlice";

import storage from "redux-persist/lib/storage";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import modalReducer from "./modal/modalSlice";

interface User {
  _id?: string;
  name: string | null;
  email: string | null;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
}

// Persisting token field from auth slice to localstorage
const authPersistConfig: PersistConfig<AuthState> = {
  key: "auth",
  storage,
  whitelist: ["token", "isLoggedIn", "user"], // зберігаємо не лише токен
};

// ----- Persisted reducer with correct generics -----
const persistedAuthReducer = persistReducer<AuthState>(authPersistConfig, authReducer);

const rootReducer = combineReducers({auth: persistedAuthReducer, modal: modalReducer});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

// ✅ Типізовані хуки для TypeScript
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

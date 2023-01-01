import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { AppThunk } from '../store/store';

const AUTH_TOKEN_KEY = 'authenticationToken';

export const initialState = {
  loading: false,
  isAuthenticated: false,
  loginSuccess: false,
  loginError: false, // Errors returned from server side
  showModalLogin: false,
  account: {} as any,
  sessionHasBeenFetched: false,
};

export type AuthenticationState = Readonly<typeof initialState>;

// Actions

export const getSession = (): AppThunk => async (dispatch, getState) => {
  return dispatch(getAccount());
};

export const getAccount = createAsyncThunk('authentication/get_account', async () =>
  axios.get<any>('api/account')
);

interface IAuthParams {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export const authenticate = createAsyncThunk(
  'authentication/login',
  async (auth: IAuthParams) => axios.post<any>('api/login', auth)
);

export const login =
  (username: string, password: string, rememberMe?: boolean) => async (dispatch) => {
    const result = await dispatch(authenticate({ username, password, rememberMe }));
    const response = result.payload as AxiosResponse;
    const bearerToken = response?.data?.accessToken;
    if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
      const jwt = bearerToken.slice(7, bearerToken.length);
      if (rememberMe) {
        localStorage.setItem(AUTH_TOKEN_KEY, jwt);
      } else {
        sessionStorage.setItem(AUTH_TOKEN_KEY, jwt);
      }
    }
    return dispatch(getSession());
  };

export const clearAuthToken = () => {
  if (localStorage.getItem(AUTH_TOKEN_KEY)) {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
  if (sessionStorage.getItem(AUTH_TOKEN_KEY)) {
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
  }
};

export const logout: () => AppThunk = () => (dispatch) => {
  clearAuthToken();
  dispatch(logoutSession());
};

export const clearAuthentication = (messageKey) => (dispatch) => {
  clearAuthToken();
  dispatch(authError(messageKey));
  dispatch(clearAuth());
};

export const AuthenticationSlice = createSlice({
  name: 'authentication',
  initialState: initialState as AuthenticationState,
  reducers: {
    logoutSession() {
      return {
        ...initialState,
        showModalLogin: true,
      };
    },
    authError(state, action) {
      return {
        ...state,
        showModalLogin: true,
      };
    },
    clearAuth(state) {
      return {
        ...state,
        loading: false,
        showModalLogin: true,
        isAuthenticated: false,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(authenticate.rejected, (state, action) => ({
        ...initialState,
        showModalLogin: true,
        loginError: true,
      }))
      .addCase(authenticate.fulfilled, (state) => ({
        ...state,
        loading: false,
        loginError: false,
        showModalLogin: false,
        loginSuccess: true,
      }))
      .addCase(getAccount.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          sessionHasBeenFetched: true,
          showModalLogin: true,
        };
      })
      .addCase(getAccount.fulfilled, (state, action) => {
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          sessionHasBeenFetched: true,
          account: action.payload.data,
        };
      })
      .addCase(authenticate.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAccount.pending, (state) => {
        state.loading = true;
      });
  },
});

export const { logoutSession, authError, clearAuth } = AuthenticationSlice.actions;

// Reducer
export default AuthenticationSlice.reducer;

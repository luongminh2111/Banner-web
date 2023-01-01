import {AnyAction, configureStore, ThunkAction} from '@reduxjs/toolkit';
import reducer from './reducer';
// ...

const store = configureStore({
    reducer: reducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these field paths in all actions
                ignoredActionPaths: ['payload.config', 'payload.request', 'error', 'meta.arg'],
            },
        })
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    AnyAction>;

export default store;

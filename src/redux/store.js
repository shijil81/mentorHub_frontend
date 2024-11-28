import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice';
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import mentorReducer from './slices/mentorSlice'
import videoReducer from './slices/mentorUploadSlice'

// Persist configuration for the user slice
const userPersistConfig = {
    key: 'user',
    storage,
};

const mentorPersistConfig={
    key:'mentors',
    storage,
}

// Combine reducers
const rootReducer = combineReducers({
    user: persistReducer(userPersistConfig, userReducer),
    mentors: persistReducer(mentorPersistConfig,mentorReducer),
    videos:videoReducer
});

// Create redux store
const store = configureStore({
    reducer:rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],  // Correct typo here
            },
        }),
});

const persistor = persistStore(store);

export { store, persistor };

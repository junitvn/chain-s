import { getApiBaseUrl } from "@/utils/api-config";
import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
    baseURL: getApiBaseUrl().replace(':3001', ':3000'), // Base URL of your Better Auth backend.
    plugins: [
        expoClient({
            scheme: "chains",
            storagePrefix: "chains",
            storage: SecureStore,
        })
    ]
});
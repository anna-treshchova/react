/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BASE_URL: string;

    readonly VITE_DESTINATIONS_URL: string;
    readonly VITE_HOTELS_URL: string;

    readonly VITE_AUTH_SEND_CODE: string;
    readonly VITE_AUTH_VERIFY_CODE: string;
    readonly VITE_AUTH_LOGOUT: string;

    readonly VITE_USER_ME_URL: string;
    readonly VITE_WISHLIST_URL: string;
}
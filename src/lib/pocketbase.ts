import PocketBase from 'pocketbase';

// Backend URL: injected at build time via Vite env (VITE_PB_URL).
// Falls back to the local instance for dev / LAN use.
const PB_URL = import.meta.env.VITE_PB_URL || 'http://localhost:8091';
export const pb = new PocketBase(PB_URL);

// Se quiser que o logout ocorra ao fechar o browser, podemos usar sessionStorage
// O PocketBase permite configurar o armazenamento. Por padrão ele usa localStorage.
// Para mudar para sessionStorage, configuramos o authStore.

// NOTA: Se preferir manter logado mesmo após fechar o browser, use localStorage.
// Como solicitado ("se eu fechar o Browser"), vamos usar sessionStorage:
if (typeof window !== 'undefined') {
    // Sincroniza o authStore do SDK com o sessionStorage
    const authData = window.sessionStorage.getItem('pb_auth');
    if (authData) {
        pb.authStore.loadFromCookie(authData);
    }

    pb.authStore.onChange(() => {
        window.sessionStorage.setItem('pb_auth', pb.authStore.exportToCookie());
    });
}

// Export types if needed
export type AdminRecord = {
    id: string;
    email: string;
    avatar: string;
}

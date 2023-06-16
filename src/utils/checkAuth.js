import { useIsAuthenticated } from 'react-auth-kit';

// Fungsi kustom untuk memeriksa apakah pengguna telah terautentikasi
export const useCheckAuth = () => {
  const { isAuthenticated } = useIsAuthenticated();

  // Mengembalikan nilai true jika pengguna terautentikasi, dan sebaliknya
  return isAuthenticated();
};

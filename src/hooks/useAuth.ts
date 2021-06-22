import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export function useAuthHook() {
  const value = useContext(AuthContext);
  return value;
}

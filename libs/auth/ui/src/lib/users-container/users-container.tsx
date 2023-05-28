import { useEffect, useState } from 'react';

import { Spin } from 'antd';
import UsersList from '../users-list/users-list';
import { Usuario } from '@starter-ws/db';
import { useHttpClient } from '../useHttpClient';

/* eslint-disable-next-line */
export interface UsersContainerProps { }

export function UsersContainer(props: UsersContainerProps) {
  const httpClient = useHttpClient();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [usuarios, setUsuarios] = useState<Array<Usuario>>();

  useEffect(() => {
    httpClient
      .get('/api/usuarios')
      .then((response) => {
        setUsuarios(response.data);
        setLoading(false);
      })
      .catch((error) => { setError(error.message); setLoading(false); });
  }, []);

  if (loading) return <Spin />;
  if (error) return <p>{error}</p>;
  if (!usuarios) return <p>Error interno</p>;

  return <UsersList usuarios={usuarios} />;
}

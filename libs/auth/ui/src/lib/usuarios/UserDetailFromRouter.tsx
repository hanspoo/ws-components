import { Breadcrumb } from 'antd';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '@starter-ws/reductor';
import { UserDetail } from './user-detail/user-detail';
import { crumbs } from './crumbs';

export function UserDetailFromRouter() {
    const { usuarios } = useSelector((state: RootState) => state.usersState);
    const { id } = useParams();

    const usuario = usuarios?.find((u) => u.id === id);
    return (
        <div>
            <Breadcrumb
                items={[...crumbs, { title: usuario?.nombre.toLocaleLowerCase() }]}
            />

            {usuario ? (
                <UserDetail usuario={usuario} />
            ) : (
                <p>Error al recuperar usuario {id} </p>
            )}
        </div>
    );
}

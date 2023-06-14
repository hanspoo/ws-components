import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Usuario } from '@starter-ws/db';

export interface UsuariosState {
  usuarios?: Array<Usuario>;
}

const initialState: UsuariosState = {
  usuarios: undefined,
};

export const usuariosSlice = createSlice({
  name: 'usuarios',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setUsuarios: (state, action: PayloadAction<Array<Usuario>>) => {
      if (!action.payload) {
        console.log('Debe entregar los usuarios');
        return;
      }

      return { ...state, usuarios: action.payload };
    },
    actualizarUsuario: (state, action: PayloadAction<Usuario>) => {
      const usuario = action.payload;
      if (!state.usuarios) return { usuarios: [usuario] };

      return {
        ...state,
        usuarios: state.usuarios.map((u) =>
          u.id === usuario.id ? usuario : u
        ),
      };
    },
  },
});

export const { setUsuarios, actualizarUsuario } = usuariosSlice.actions;

// export default usuariosSlice.reducer;

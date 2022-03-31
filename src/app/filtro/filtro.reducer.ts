import { Action, createReducer, on } from "@ngrx/store";
import * as actions from "./filtro.actions";

export const initialState: actions.filtrosValidos = 'todos' as actions.filtrosValidos;

const _filtroReducer = createReducer(initialState,
    on(actions.setFiltro, (state, { filtro }) => filtro as actions.filtrosValidos)
);

export function filtroReducer(state: actions.filtrosValidos | undefined, action: Action) {
    return _filtroReducer(state, action);
}
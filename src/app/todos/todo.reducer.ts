import { Action, createReducer, on } from "@ngrx/store";
import { Todo } from "./models/todo.model";
import { crear, toggle, editar, borrar, toggleAll, limpiarTodos } from './todo.actions';

export const initialState: Todo[] = [
    new Todo('Conseguir un nuevo empleo'),
    new Todo('Fortalecer conceptos básicos de programación'),
    new Todo('Mejorar el seniority actual!')
];

// Evitar hacer un push o alguna operación que mute directamente el state.
// Se hace la desestructuración del state y se le adiciona un nuevo objeto al array.
const _todoReducer = createReducer(initialState,
     on(crear, (state, { texto }) => [...state, new Todo(texto)]),

     on(toggle, (state, { id }) => {
        return state.map(todo => {
            if(todo.id === id){
                return {
                ...todo,
                completado: !todo.completado
                }
            } else {
                return todo;
            }            
        })
     }),

     on(editar, (state, { id, texto }) => {
        return state.map(todo => {
            if(todo.id === id){
                return {
                ...todo,
                texto: texto
                }
            } else {
                return todo;
            }            
        })
     }),

     on(borrar, (state, { id }) =>  state.filter(todo => todo.id !== id)),

     on(toggleAll, (state, { completado }) => {
        return state.map(todo => {
                return {
                ...todo,
                completado: completado
            }  
        })
     }),

     on(limpiarTodos, state =>  state.filter(todo =>! todo.completado))

);

export function todoReducer(state: Todo[] | undefined, action: Action){
    return _todoReducer(state, action);
}

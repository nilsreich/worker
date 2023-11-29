import { atom } from "jotai";
import { type Data } from './types'


const initTodos: Data = [{
    list: 'Schule',
    todos: [
        { id: '1dsaasd', title: 'nix machen', completed: false },
        { id: '1', title: 'Todo 1', completed: false },
        { id: '2', title: 'Todo 2', completed: true },
        { id: '3', title: 'Todo 3', completed: false }
    ]
},
{
    list: 'Privat',
    todos: [
        { id: '1dsaasd', title: 'arbeiten korrigieren', completed: false },
        { id: 'f4', title: 'Todo 1', completed: false },

    ]
}
]

export const dataAtom = atom<Data>(initTodos)
export const activeListAtom = atom<string>('Schule')
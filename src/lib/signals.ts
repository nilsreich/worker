import { signal } from "@preact/signals-react";
import { type TodoData } from "@/lib/types";
import { Session } from "@supabase/supabase-js";

const initTodos: TodoData = {
  "data":[
     {
        "list":"Schule",
        "todos":[
           {
              "id":"1dsaasd",
              "title":"nix machen",
              "completed":false
           },
           {
              "id":"1",
              "title":"Todo 1",
              "completed":false
           },
           {
              "id":"2",
              "title":"Todo 2",
              "completed":true
           },
           {
              "id":"3",
              "title":"Todo 3",
              "completed":false
           }
        ]
     },
     {
        "list":"Privat",
        "todos":[
           {
              "id":"1dsaasd",
              "title":"arbeiten korrigieren",
              "completed":false
           },
           {
              "id":"f4",
              "title":"Todo 1",
              "completed":false
           }
        ]
     }
  ]
};

export const todosSignal = signal<TodoData>(initTodos);
export const activeListSignal= signal<string>("Schule");
export const sessionSignal = signal<Session|null>(null);
export const sidebarSignal = signal<boolean>(true)

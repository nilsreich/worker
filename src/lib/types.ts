export  type TodoData = {
    data: {
        list: string;
        todos: {
            id: string;
            title: string;
            completed: boolean;
        }[];
    }[];
};
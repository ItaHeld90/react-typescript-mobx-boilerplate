import React from "react";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import { v4 as newUUID } from "uuid";
import "./App.css";

interface TODO {
    id: string;
    text: string;
}

@observer
export class App extends React.Component {
    @observable currentTodoText = "";
    @observable todos: TODO[] = [];

    render() {
        return (
            <div className="app">
                <h2 style={{ textDecoration: "underline" }}>TODO List</h2>
                <div>
                    <input
                        value={this.currentTodoText}
                        onChange={(e) => this.setTodoText(e.target.value)}
                    ></input>
                    <button
                        disabled={!this.currentTodoText}
                        onClick={this.addCurrentTodo}
                    >
                        +
                    </button>
                    <div>
                        {this.todos.map((todo) => (
                            <div className="todo-item">
                                <div style={{ flex: 1 }} key={todo.id}>
                                    {todo.text}
                                </div>
                                <button onClick={() => this.deleteTodo(todo)}>
                                    x
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    @action
    addCurrentTodo = () => {
        const newTodo: TODO = {
            id: newUUID(),
            text: this.currentTodoText,
        };

        this.todos.push(newTodo);

        this.setTodoText("");
    };

    @action
    deleteTodo = (todoToDelete: TODO) => {
        this.todos = this.todos.filter((todo) => todo.id !== todoToDelete.id);
    };

    @action
    setTodoText(text: string) {
        this.currentTodoText = text;
    }
}

export default App;

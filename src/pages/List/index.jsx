import React, { Component } from "react";
import PropTypes from "prop-types";

// 引入组件
import Item from "../Item";

// 引入样式
import "./index.css";

export default class List extends Component {
  // props类型限制
  static propTypes = {
    todos: PropTypes.array.isRequired,
    updateTodo: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired,
  };
  render() {
    // 读取props
    const { todos, updateTodo, delTodo } = this.props;
    return (
      <ul className="todo-main">
        {todos.map((todo) => {
          // 遍历todos
          return <Item key={todo.id} todo={todo} updateTodo={updateTodo} delTodo={delTodo} />;
        })}
      </ul>
    );
  }
}

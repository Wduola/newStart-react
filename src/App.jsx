// 应用主组件
import React from "react";

// 引入组件
import Header from "./pages/Header";
import List from "./pages/List";
import Footer from "./pages/Footer";
import Modal from "./pages/Modal";

// 引入样式
import "./App.css";

// ES6类定义组件
class App extends React.Component {
  // 设置初始化状态state
  state = {
    todos: [
      { id: 1, name: "吃饭", isCompleted: false },
      { id: 2, name: "睡觉", isCompleted: false },
    ],
    visible: false,
  };
  // 设置删除
  handleDel = () => {
    if (this.props.visible) {
      this.setState({
        visible: false,
      });
      this.props.delCompletedTodos();
    }
  };
  // id初始值
  id = 3;
  // 收集数据
  addTodo = (name) => {
    // 读取之前的todos里面的数据
    const { todos } = this.state;
    // 更新state
    this.setState({
      todos: [{ id: this.id++, name, isCompleted: false }, ...todos],
    });
  };
  // 更新列表组件
  updateTodo = (id, isCompleted) => {
    // 读取state数据
    const { todos } = this.state;
    // 更新state数据
    this.setState({
      todos: todos.map((todo) => {
        if (todo.id === id) {
          return {
            id: todo.id,
            name: todo.name,
            isCompleted,
          };
        }
        return todo;
      }),
    });
  };
  // 删除一项
  delTodo = (id) => {
    this.setState({
      todos: this.state.todos.filter((todo) => {
        return todo.id !== id;
      }),
    });
  };
  // 全选
  checkAll = (isCheckAll) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.map((todo) => {
        return {
          id: todo.id,
          name: todo.name,
          isCompleted: isCheckAll,
        };
      }),
    });
  };
  //
  delCompletedTodos = () => {
    this.setState({
      todos: this.state.todos.filter((todo) => {
        return !todo.isCompleted;
      }),
    });
  };
  render() {
    // 读取state
    const { todos } = this.state;
    // 计算总数
    const allCount = todos.length;
    // 计算已经完成的数
    const completedCount = todos.reduce((p, c) => {
      return p + (c.isCompleted ? 1 : 0);
    }, 0);
    return (
      <div className="todo-container">
        <div className="todo-wrap">
          <Header addTodo={this.addTodo} />
          <List todos={todos} updateTodo={this.updateTodo} delTodo={this.delTodo} />
          <Footer checkAll={this.checkAll} allCount={allCount} delCompletedTodos={this.delCompletedTodos} completedCount={completedCount} handleDel={this.handleDel} />
        </div>
      </div>
    );
  }
}

// 默认暴露
export default App;

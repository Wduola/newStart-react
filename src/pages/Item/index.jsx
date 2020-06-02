import React, { Component } from "react";
import PropTypes from "prop-types";

// 引入样式
import "./index.css";

export default class Item extends Component {
  // 设置初始值state
  state = { display: "none" };
  // 限制props类型
  static propTypes = {
    todo: PropTypes.object.isRequired,
    delTodo: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired,
  };
  //
  handleChange = (event) => {
    const { updateTodo, todo } = this.props;
    updateTodo(todo.id, event.target.checked);
  };
  //控制删除按钮的显示
  handleEnter = () => {
    this.setState({
      display: "block",
    });
  };
  //控制删除按钮的隐藏
  handleLeave = () => {
    this.setState({
      display: "none",
    });
  };
  // 删除功能
  handleDel = () => {
    const { id } = this.props.todo;
    if (window.confirm("你确定要删除当前数据吗？")) {
      this.props.delTodo(id);
    }
  };
  render() {
    // 读取props数据
    const { name, isCompleted } = this.props.todo;
    return (
      <li onMouseEnter={this.handleEnter} onMouseLeave={this.handleLeave}>
        <label>
          <input type="checkbox" onChange={this.handleChange} checked={isCompleted} />
          <span>{name}</span>
        </label>
        <button className="btn btn-danger" style={{ display: this.state.display }} onClick={this.handleDel}>
          删除
        </button>
      </li>
    );
  }
}

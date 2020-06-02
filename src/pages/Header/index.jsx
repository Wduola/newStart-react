import React, { Component } from "react";
import PropTypes from "prop-types";

// 引入样式
import "./index.css";

export default class List extends Component {
  // props类型限制
  static propTypes = {
    addTodo: PropTypes.func.isRequired,
  };
  // 设置state
  state = {
    name: "",
  };
  // 收集input数据
  handleChange = (event) => {
    this.setState({
      name: event.target.value.trim(),
    });
    console.log(event.target.value.trim());
  };
  // 提交事件
  handleKeyup = (event) => {
    // 读取state
    const { name } = this.state;
    if (event.keyCode === 13 && name) {
      this.props.addTodo(name);
      // 清空数据
      this.setState({
        name: "",
      });
    }
  };
  render() {
    // 读取state
    const { name } = this.state;
    return (
      <div className="todo-header">
        <input type="text" placeholder="请输入你的任务名称，按回车键确认" onChange={this.handleChange} onKeyUp={this.handleKeyup} value={name} />
      </div>
    );
  }
}

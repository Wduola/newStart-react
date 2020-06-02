import React, { Component } from "react";
import PropTypes from "prop-types";

//引入样式
import "./index.css";
import Modal from "../Modal/index";

export default class Footer extends Component {
  // 设置接收属性类型
  static propTypes = {
    checkAll: PropTypes.func.isRequired,
    allCount: PropTypes.number.isRequired,
    delCompletedTodos: PropTypes.func.isRequired,
    completedCount: PropTypes.number.isRequired,
  };
  // 设置初始装填state
  state = {
    visible: false,
  };
  // 设置全选
  handleChange = (event) => {
    this.props.checkAll(event.target.checked);
  };

  handleDel = () => {
    this.props.delCompletedTodos();
    this.setState({
      visible: false,
    });
  };

  hiddenModal = (visible) => {
    return () => {
      this.setState({
        visible,
      });
    };
  };

  render() {
    // props属性
    const { allCount, completedCount } = this.props;
    return (
      <div className="todo-footer">
        <label>
          <input type="checkbox" checked={!!allCount && completedCount === allCount} onChange={this.handleChange} />
        </label>
        <span>
          <span>已完成{completedCount}</span> / 全部{allCount}
        </span>
        <button className="btn btn-danger" onClick={this.hiddenModal(true)}>
          清除已完成任务
        </button>
        <Modal visible={this.state.visible} onOk={this.handleDel} onCancel={this.hiddenModal(false)} title={<span>删除所选todos</span>} content={<p>您确认要删除所选todos吗？····</p>} />
      </div>
    );
  }
}

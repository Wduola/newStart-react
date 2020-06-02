import React, { Component } from "react";
import PropTypes from "prop-types";

import Modal from "../Modal";
import "./index.css";

export default class Footer extends Component {
  static propTypes = {
    completedCount: PropTypes.number.isRequired,
    allCount: PropTypes.number.isRequired,
    checkAll: PropTypes.func.isRequired,
    delCompletedTodos: PropTypes.func.isRequired,
  };

  state = {
    visible: false,
  };

  handleChange = (e) => {
    this.props.checkAll(e.target.checked);
  };

  handleDel = () => {
    this.props.delCompletedTodos();
    this.setState({
      visible: false
    })
  };

  switchModal = (visible) => {
    return () => {
      this.setState({
        visible,
      });
    };
  };

  render() {
    const { allCount, completedCount, delCompletedTodos } = this.props;
    const { visible } = this.state;

    return (
      <div className="todo-footer">
        <label>
          <input
            type="checkbox"
            checked={!!allCount && completedCount === allCount}
            onChange={this.handleChange}
          />
        </label>
        <span>
          <span>已完成{completedCount}</span> / 全部{allCount}
        </span>
        <button className="btn btn-danger" onClick={this.switchModal(true)}>
          清除已完成任务
        </button>

        <Modal
          title="删除所选todos"
          content="您确认要删除所选todos吗?"
          visible={visible}
          onOk={this.handleDel}
          onCancel={this.switchModal(false)}
        />
      </div>
    );
  }
}

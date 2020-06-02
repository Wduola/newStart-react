import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import "./index.css";

export default class Modal extends Component {
  static propTypes = {
    title: PropTypes.oneOfType([
      PropTypes.string, // 字符串类型
      PropTypes.element, // React元素类型
    ]).isRequired,
    content: PropTypes.oneOfType([
      PropTypes.string, // 字符串类型
      PropTypes.element, // React元素类型
    ]).isRequired,
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
  };

  static defaultValue = {
    onCancel: () => {},
    onOk: () => {},
  };

  constructor() {
    super();
    // 初始化容器 div
    this.div = document.createElement("div");
  }

  componentDidMount() {
    document.body.appendChild(this.div);
  }

  componentWillUnmount() {
    this.div.remove();
  }

  render() {
    // 接受外面传递的数据
    const { title, content, visible, onCancel, onOk } = this.props; // 父组件给子组件传递数据

    // 要渲染的元素
    const Modal = (
      <div className="modal" style={{ display: visible ? "block" : "none" }}>
        <div className="modal-wrap">
          <div className="modal-wrap-header">
            <h3>{title}</h3>
            <button onClick={onCancel}>x</button>
          </div>
          <div className="modal-wrap-content">{content}</div>
          <div className="modal-wrap-footer">
            <button onClick={onCancel}>取消</button>
            <button onClick={onOk}>确认</button>
          </div>
        </div>
        <div className="modal-mask"></div>
      </div>
    );

    // 将 Modal元素渲染到 div 内
    return ReactDOM.createPortal(Modal, this.div);
  }
}

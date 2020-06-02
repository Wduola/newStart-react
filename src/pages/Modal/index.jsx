import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import "./index.css";

export default class Modal extends Component {
  // 设置接收属性类型
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
  };
  // 设置默认属性
  static defaultValue = {
    onCancel: () => {},
    onOk: () => {},
  };
  // ---------------------------1. constructor 创建DOM元素
  constructor() {
    super();
    this.div = document.createElement("div");
  }
  // ---------------------------3.将div插入到body中生效，此时就能看到modal了~
  componentDidMount() {
    document.body.appendChild(this.div);
  }
  // ---------------------------4. 防止组件卸载/重新创建过程中创建多个div
  componentWillUnmount() {
    this.div.remove();
    console.log("移除div");
  }
  render() {
    // 接收外面的的数据
    const { visible, onCancel, onOk, title, content } = this.props;
    // ---------------------------2.要渲染的元素
    const Modal = (
      <div className="ant-modal-root" style={{ display: visible ? "block" : "none" }}>
        <div className="ant-modal-mask"></div>
        <div className="ant-modal-wrap">
          <div className="ant-modal">
            <div className="ant-modal-content">
              <button type="button" className="ant-modal-close" onClick={onCancel}>
                X
              </button>
              <div className="ant-modal-header">
                <div className="ant-modal-title">{title}</div>
              </div>
              <div className="ant-modal-body">{content}</div>
              <div className="ant-modal-footer">
                <button type="button" className="ant-btn" onClick={onCancel}>
                  <span>取 消</span>
                </button>
                <button type="button" className="ant-btn ant-btn-primary" onClick={onOk}>
                  <span>确 定</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    // 将Modal元素渲染到div内
    return ReactDOM.createPortal(Modal, this.div);
  }
}

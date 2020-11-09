import React, { Component } from "react";
import TodoList from "./ToDoList/ToDoList";
import Modal from "../../UI/Modal/CenteredModal";

class ToDoComponent extends Component {
  state = {
    items: [],
    text: "",
    showColumnModal: false,
  };

  handleChange = (e) => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now(),
      likes: 0,
    };
    this.setState((state) => ({
      items: state.items.concat(newItem),
      text: "",
    }));
  };

  likeHandler = (id) => {
    let items = [...this.state.items];
    let item = items[id];
    item.likes += 1;
    items[id] = item;
    this.setState({ items: items });
  };

  handleEdit = (e, index) => {
    let items = [...this.state.items];
    let item = items[index];
    item.text = e.target.value;
    items[index] = item;
    this.setState({ items: items });
  };

  handleDelete = (index) => {
    let items = [...this.state.items];
    items.splice(index, 1);
    this.setState({ items: items });
  };

  render() {
    let data = "";
    if (this.props.columnData) {
      data = this.props.columnData.map((column) => {
        return (
          <div key={column}>
            <h5>
              {column}
              <button
                onClick={() => this.setState({ showColumnModal: true })}
                className="btn btn-default"
              >
                <i className="icon edit outline" />
              </button>
              <Modal
                show={this.state.showColumnModal}
                onHide={() => {
                  this.setState({ showColumnModal: false });
                }}
                change={(e) => this.props.columnNameEdit(e)}
              />
            </h5>
            <TodoList
              items={this.state.items}
              likesHandler={(id) => this.likeHandler(id)}
              handleEdit={(e, index) => this.handleEdit(e, index)}
              handleDelete={(index) => this.handleDelete(index)}
            />
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="new-todo">What needs to be done?</label>
              <input
                className="form-control col-sm-3"
                id="new-todo"
                onChange={this.handleChange}
                value={this.state.text}
              />
              <button className="btn btn-success mt-2">
                Add Note #{this.state.items.length + 1}
              </button>
            </form>
          </div>
        );
      });
    }
    return <div>{data}</div>;
  }
}

export default ToDoComponent;

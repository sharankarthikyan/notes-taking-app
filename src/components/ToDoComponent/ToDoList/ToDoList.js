import React from "react";
import Modal from "../../../UI/Modal/CenteredModal";
import "../../../UI/Fonts/Fonts.css";

class TodoList extends React.Component {
  state = {
    showModal: false,
    index: null,
    columnIndex: this.props.columnIndex,
  };

  render() {
    return (
      <ul className="me">
        {this.props.items === undefined
          ? ""
          : this.props.items.map((item, index) => (
              <li key={index} className="mt-2">
                <p style={{ display: "inline" }}>{item.text} </p>
                <div
                  className="ui vertical pink animated button"
                  tabIndex="0"
                  onClick={() =>
                    this.props.likesHandler(index, this.state.columnIndex)
                  }
                >
                  <div className="hidden content agl">
                    {item.likes} {item.likes > 1 ? "votes" : "vote"}
                  </div>
                  <div className="visible content">
                    <i className="thumbs up icon" />
                  </div>
                </div>
                <div
                  className="ui vertical violet animated button "
                  tabIndex="0"
                  onClick={() =>
                    this.setState({ showModal: true, index: index })
                  }
                >
                  <div className="hidden content agl">Edit</div>
                  <div className="visible content">
                    <i className="edit icon" />
                  </div>
                </div>
                <Modal
                  show={this.state.showModal}
                  onHide={() => {
                    this.setState({ showModal: false });
                  }}
                  change={(e) => {
                    this.props.handleEdit(e, this.state.index);
                  }}
                />
                <div
                  className="ui vertical red animated button"
                  onClick={() => this.props.handleDelete(index)}
                  tabIndex="0"
                >
                  <div className="hidden content agl">Delete</div>
                  <div className="visible content">
                    <i className="trash icon" />
                  </div>
                </div>
                <div className="float-sm-right text-secondary asl">
                  Created on {item.id}
                </div>
              </li>
            ))}
      </ul>
    );
  }
}

export default TodoList;

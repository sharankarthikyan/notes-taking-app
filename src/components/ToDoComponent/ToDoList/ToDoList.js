import React from "react";
import Modal from "../../../UI/Modal/CenteredModal";

class TodoList extends React.Component {
  state = {
    showModal: false,
    index: null,
    columnIndex: this.props.columnIndex,
  };

  render() {
    return (
      <ul>
        {this.props.items === undefined
          ? ""
          : this.props.items.map((item, index) => (
              <li key={item.id} className="mt-2">
                <p style={{ display: "inline" }}>{item.text} </p>
                <div
                  className="ui vertical pink animated button"
                  tabIndex="0"
                  onClick={() =>
                    this.props.likesHandler(index, this.state.columnIndex)
                  }
                >
                  <div className="hidden content">{item.likes} Likes</div>
                  <div className="visible content">
                    <i className="heart icon" />
                  </div>
                </div>
                <div
                  className="ui vertical purple animated button"
                  tabIndex="0"
                  onClick={() =>
                    this.setState({ showModal: true, index: index })
                  }
                >
                  <div className="hidden content">Edit</div>
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
                  <div className="hidden content">Delete</div>
                  <div className="visible content">
                    <i className="trash icon" />
                  </div>
                </div>
                <div className="float-sm-right">{item.id}</div>
              </li>
            ))}
      </ul>
    );
  }
}

export default TodoList;

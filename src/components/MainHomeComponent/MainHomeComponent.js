import React, { Component } from "react";
import Modal from "../../UI/Modal/CenteredModal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./MainHomeComponent.css";
import ToDoComponent from "../ToDoComponent/ToDoComponent";

class MainHomeComponent extends Component {
  state = {
    pageTitle: "Type any name",
    columnData: [],
    text: "",
    columnCount: 0,
    showField: false,
    showPageTitleModal: false,
    showAddColumnModal: false,
  };

  handlePageTitle = (e) => {
    this.setState({ pageTitle: e.target.value });
  };

  addNewColumn = (e) => {
    e.preventDefault();
    let temp = [...this.state.columnData];
    let newColumn = {
      columnTitle: this.state.text,
      columnItemsArray: [],
      itemText: "",
    };
    temp.push(newColumn);
    this.setState({ columnData: temp, text: "" });
    console.log(this.state.columnData);
  };

  handleItemsSubmit = (e, item, index) => {
    e.preventDefault();
    let columnData = [...this.state.columnData];
    let column = columnData[index];
    let items = [...column.columnItemsArray];
    const newItem = {
      text: item,
      id: Date.now(),
      likes: 0,
    };
    items.push(newItem);
    column.columnItemsArray = items;
    column.itemText = "";
    columnData[index] = column;
    this.setState({ columnData: columnData });
  };

  likesHandler = (index, columnIndex) => {
    console.log("Like first " + index + " " + columnIndex);
    let columnData = [...this.state.columnData];
    let column = columnData[columnIndex];
    column.columnItemsArray[index].likes++;
    columnData[columnIndex] = column;
    this.setState({ columnData: columnData });
  };

  handleChange = (e, columnIndex) => {
    let columnData = [...this.state.columnData];
    let column = columnData[columnIndex];
    column.itemText = e.target.value;
    columnData[columnIndex] = column;
    console.log("handle changed " + column);
    this.setState({ columnData: columnData });
  };

  render() {
    let field = "";
    if (this.state.showField) {
      field = (
        <form onSubmit={this.addNewColumn}>
          <input
            type="text"
            value={this.state.text}
            className="form-control mt-2"
            onChange={(e) => this.setState({ text: e.target.value })}
          />
          <p>Press enter to create Row</p>
          <p style={{ color: "red" }}>
            Kindly forgive me. You can able to create one row. If it exceeds it
            will create a issues.
          </p>
        </form>
      );
    }

    return (
      <div className="container mt-4">
        <Row>
          <Col sm={8}>
            <div>
              <h4>
                {this.state.pageTitle}{" "}
                <button
                  onClick={() => this.setState({ showPageTitleModal: true })}
                  className="btn btn-default"
                >
                  <i className="icon edit outline" />
                </button>
                <Modal
                  show={this.state.showPageTitleModal}
                  onHide={() => this.setState({ showPageTitleModal: false })}
                  change={(e) => this.handlePageTitle(e)}
                />
              </h4>
            </div>
          </Col>
          <Col sm={2}>
            <button
              onClick={() =>
                this.setState({
                  showField: !this.state.showField,
                  columnCount: this.state.columnCount + 1,
                })
              }
              className="btn bg-info text-white mt-2"
            >
              <i className="plus circle icon" />
              Add New Row
            </button>
            {field}
          </Col>
          <Col sm={2}>
            <div
              data-tooltip="It is just a dummy button"
              data-position="top left"
            >
              <button className="btn bg-secondary text-white mt-2">
                <i className="file pdf outline icon" />
                Export as PDF
              </button>
            </div>
          </Col>
        </Row>
        <ToDoComponent
          columnData={this.state.columnData}
          handleItemsSubmit={(e, item, index) =>
            this.handleItemsSubmit(e, item, index)
          }
          likesHandler={(index, columnIndex) =>
            this.likesHandler(index, columnIndex)
          }
          handleChange={(e, columnIndex) => this.handleChange(e, columnIndex)}
          handleEdit={(columnData) => this.setState({ columnData: columnData })}
          handleDelete={(columnData) =>
            this.setState({ columnData: columnData })
          }
        />
      </div>
    );
  }
}

export default MainHomeComponent;

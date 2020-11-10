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
    temp.push(this.state.text);
    this.setState({ columnData: temp, text: "" });
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
            <button className="btn bg-secondary text-white mt-2">
              <i className="file pdf outline icon" />
              Export as PDF
            </button>
          </Col>
        </Row>
        <ToDoComponent className="mt-5" columnData={this.state.columnData} />
      </div>
    );
  }
}

export default MainHomeComponent;

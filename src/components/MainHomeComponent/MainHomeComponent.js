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
    columnCount: 0,
    showPageTitleModal: false,
    showAddColumnModal: false,
  };

  handlePageTitle = (e) => {
    this.setState({ pageTitle: e.target.value });
  };

  handleNewColumnTitle = (e) => {
    const title = e.target.value;
    this.setState({ columnData: [title] });
  };

  handleColumnNameEdit = (e) => {
    const newData = [...this.state.columnData];
    newData[0] = e.target.value;
    this.setState({ columnData: [] });
  };

  render() {
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
                  showAddColumnModal: true,
                  columnCount: this.state.columnCount + 1,
                })
              }
              className="btn bg-info text-white mt-2"
            >
              <i className="plus circle icon"></i>Add New Column
            </button>
            <Modal
              show={this.state.showAddColumnModal}
              onHide={() => this.setState({ showAddColumnModal: false })}
              change={(e) => this.handleNewColumnTitle(e)}
            />
          </Col>
          <Col sm={2}>
            <button className="btn bg-secondary text-white mt-2">
              <i className="file pdf outline icon" />
              Export as PDF
            </button>
          </Col>
        </Row>
        <ToDoComponent
          columnData={this.state.columnData}
          columnNameEdit={(e) => this.handleColumnNameEdit(e)}
        />
      </div>
    );
  }
}

export default MainHomeComponent;

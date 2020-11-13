import React, { Component } from "react";
import Modal from "../../UI/Modal/CenteredModal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./MainHomeComponent.css";
import "../../UI/Fonts/Fonts.css";
import ToDoComponent from "../ToDoComponent/ToDoComponent";
import firebase from "firebase";

class MainHomeComponent extends Component {
  state = {
    pageTitle: "Just give a title for this page",
    columnData: [],
    text: "",
    columnCount: 0,
    showField: false,
    showPageTitleModal: false,
    showAddColumnModal: false,
    date: new Date(),
    months: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  };

  updateColumnData = (columnData) => {
    return firebase
      .database()
      .ref("/users/" + this.props.userId + "/columnData")
      .set(columnData);
  };

  updatePageTitle = (pageTitle) => {
    return firebase
      .database()
      .ref("/users/" + this.props.userId + "/pageTitle")
      .set(pageTitle);
  };

  handlePageTitle = (e) => {
    this.setState({ pageTitle: e.target.value });
    this.updatePageTitle(this.state.pageTitle);
  };

  componentDidMount() {
    let ref = firebase
      .database()
      .ref("/users/" + this.props.userId + "/columnData");
    ref.on("value", (snapshot) => {
      const state = snapshot.val();
      if (state !== null) {
        this.setState({ columnData: state });
      }
    });

    let ref2 = firebase
      .database()
      .ref("/users/" + this.props.userId + "/pageTitle");
    ref2.on("value", (snapshot) => {
      const state = snapshot.val();
      if (state !== null) {
        this.setState({ pageTitle: state });
      }
    });
  }

  addNewColumn = (e) => {
    e.preventDefault();
    let columnData = [...this.state.columnData];
    let newColumn = {
      columnTitle: this.state.text,
      columnItemsArray: [],
      itemText: "",
      columnDate:
        this.state.date.getDate() +
        " " +
        this.state.months[this.state.date.getMonth()] +
        " " +
        this.state.date.getFullYear() +
        " at " +
        this.state.date.toLocaleTimeString(),
    };
    columnData.push(newColumn);
    this.setState({ columnData: columnData, text: "" });
    this.updateColumnData(columnData);
  };

  handleItemsSubmit = (e, item, index) => {
    e.preventDefault();
    let columnData = [...this.state.columnData];
    let column = columnData[index];
    if (column.columnItemsArray === undefined) {
      column.columnItemsArray = [];
    }
    let items = [...column.columnItemsArray];
    const newItem = {
      text: item,
      id:
        this.state.date.getDate() +
        " " +
        this.state.months[this.state.date.getMonth()] +
        " " +
        this.state.date.getFullYear() +
        " at " +
        this.state.date.toLocaleTimeString(),
      likes: 0,
    };
    items.push(newItem);
    column.columnItemsArray = items;
    column.itemText = "";
    columnData[index] = column;
    this.setState({ columnData: columnData });
    this.updateColumnData(columnData);
  };

  likesHandler = (index, columnIndex) => {
    let columnData = [...this.state.columnData];
    let column = columnData[columnIndex];
    column.columnItemsArray[index].likes++;
    columnData[columnIndex] = column;
    this.setState({ columnData: columnData });
    this.updateColumnData(columnData);
  };

  handleChange = (e, columnIndex) => {
    let columnData = [...this.state.columnData];
    let column = columnData[columnIndex];
    column.itemText = e.target.value;
    columnData[columnIndex] = column;
    this.setState({ columnData: columnData });
    this.updateColumnData(columnData);
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
            required
          />
          <button className="btn btn-outline-info mt-2">Add row</button>
        </form>
      );
    }
    return (
      <div className="container mt-4">
        <Row>
          <Col sm={8}>
            <div>
              <h3 className="it">
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
              </h3>
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
              className="btn bg-info text-white mt-2 agl"
            >
              <i className="plus circle icon" />
              Add New Row
            </button>
            {field}
          </Col>
          <Col sm={2}>
            <div
              data-tooltip="It is just a dummy button"
              data-position="top center"
            >
              <button className="btn bg-secondary text-white mt-2 agl">
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
          handleEdit={(columnData) => {
            this.setState({ columnData: columnData });
            this.updateColumnData(columnData);
          }}
          handleDelete={(columnData) => {
            this.setState({ columnData: columnData });
            this.updateColumnData(columnData);
          }}
          date={this.state.columnData.columnDate}
        />
        {this.state.userinfo}
      </div>
    );
  }
}

export default MainHomeComponent;

import { useState, useEffect } from "react";
import Modal from "../../UI/Modal/CenteredModal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./MainHomeComponent.css";
import ToDoComponent from "../ToDoComponent/ToDoComponent";
import { getDatabase, ref, set, onValue } from "firebase/database";

const MainHomeComponent = ({ userId }) => {
  const [pageTitle, setPageTitle] = useState("Give a Title to the page");
  const [columnData, setColumnData] = useState([]);
  const [text, setText] = useState("");
  const [columnCount, setColumnCount] = useState(0);
  const [showField, setShowField] = useState(false);
  const [showPageTitleModal, setShowPageTitleModal] = useState(false);
  const [date] = useState(new Date());
  const months = [
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
  ];

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase();
      const columnDataRef = ref(db, `/users/${userId}/columnData`);
      const pageTitleRef = ref(db, `/users/${userId}/pageTitle`);

      // Fetch initial columnData
      onValue(columnDataRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setColumnData(data);
        }
      });

      // Fetch initial pageTitle
      onValue(pageTitleRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setPageTitle(data);
        }
      });
    };

    fetchData();

    // Clean up listener
    return () => {
      // Remove Firebase listeners if needed
    };
  }, [userId]);

  const updateColumnData = (columnData) => {
    const db = getDatabase();
    set(ref(db, `/users/${userId}/columnData`), columnData);
  };

  const updatePageTitle = (pageTitle) => {
    const db = getDatabase();
    set(ref(db, `/users/${userId}/pageTitle`), pageTitle);
  };

  const handlePageTitle = (e) => {
    const newTitle = e.target.value;
    setPageTitle(newTitle); // Update state immediately

    // Update Firebase with the new title
    updatePageTitle(newTitle);
  };

  const addNewColumn = (e) => {
    e.preventDefault();
    const newColumn = {
      columnTitle: text,
      columnItemsArray: [],
      itemText: "",
      columnDate: `${date.getDate()} ${
        months[date.getMonth()]
      } ${date.getFullYear()} at ${date.toLocaleTimeString()}`,
    };

    const updatedColumnData = [...columnData, newColumn];
    setColumnData(updatedColumnData);
    updateColumnData(updatedColumnData);
    setText("");
  };

  const handleItemsSubmit = (e, item, index) => {
    e.preventDefault();
    const updatedColumnData = [...columnData];
    const column = updatedColumnData[index];
    const newItem = {
      text: item,
      id: `${date.getDate()} ${
        months[date.getMonth()]
      } ${date.getFullYear()} at ${date.toLocaleTimeString()}`,
      likes: 0,
    };
    column.columnItemsArray.push(newItem);
    column.itemText = "";
    setColumnData(updatedColumnData);
    updateColumnData(updatedColumnData);
  };

  const likesHandler = (index, columnIndex) => {
    const updatedColumnData = [...columnData];
    updatedColumnData[columnIndex].columnItemsArray[index].likes++;
    setColumnData(updatedColumnData);
    updateColumnData(updatedColumnData);
  };

  const handleChange = (e, columnIndex) => {
    const updatedColumnData = [...columnData];
    updatedColumnData[columnIndex].itemText = e.target.value;
    setColumnData(updatedColumnData);
    updateColumnData(updatedColumnData);
  };

  const deleteColumn = (index) => {
    const updatedColumnData = [...columnData];
    updatedColumnData.splice(index, 1);
    setColumnData(updatedColumnData);
    updateColumnData(updatedColumnData);
  };

  let field = "";
  if (showField) {
    field = (
      <form onSubmit={addNewColumn}>
        <input
          type="text"
          value={text}
          className="form-control mt-2"
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter task title"
          required
        />
        <button className="btn btn-outline-info mt-2">Add Task</button>
      </form>
    );
  }

  return (
    <div className="container mt-4">
      <div className="mb-4">
        <p className="line-1 anim-typewriter me text-info">
          Welcome to Twinkle ToDos
        </p>
      </div>
      <Row>
        <Col sm={8}>
          <div>
            <h3 className="it">
              {pageTitle}{" "}
              <button
                onClick={() => setShowPageTitleModal(true)}
                className="btn btn-default"
              >
                <i className="icon edit outline" />
              </button>
              <Modal
                show={showPageTitleModal}
                onHide={() => setShowPageTitleModal(false)}
                change={(e) => handlePageTitle(e)}
              />
            </h3>
          </div>
        </Col>
        <Col sm={2}>
          <button
            onClick={() => {
              setShowField(!showField);
              setColumnCount(columnCount + 1);
            }}
            className="btn bg-info text-white mt-2 agl"
          >
            <i className="plus circle icon" />
            Add New Task Title
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
        columnData={columnData}
        handleItemsSubmit={(e, item, index) =>
          handleItemsSubmit(e, item, index)
        }
        likesHandler={(index, columnIndex) => likesHandler(index, columnIndex)}
        handleChange={(e, columnIndex) => handleChange(e, columnIndex)}
        handleEdit={(columnData) => {
          setColumnData(columnData);
          updateColumnData(columnData);
        }}
        handleDelete={(columnData) => {
          setColumnData(columnData);
          updateColumnData(columnData);
        }}
        date={`${date.getDate()} ${
          months[date.getMonth()]
        } ${date.getFullYear()} at ${date.toLocaleTimeString()}`}
        deleteColumn={(index) => deleteColumn(index)}
      />
    </div>
  );
};

export default MainHomeComponent;

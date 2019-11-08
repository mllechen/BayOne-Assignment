import React, { Component } from "react";
import TaskList from "./TaskList";
import { DragDropContext } from "react-beautiful-dnd";

// reorder function is provided by react-beautiful-dnd
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class App extends Component {
  // state has two properties, tasks stands for the array of task object, groupNum stands for the number of group of task details in 5.
  // e.g. one group has 5 tasks
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      groupNum: 1
    };
  }
  // fetch the tasks json data from json server and load them into tasks array
  componentDidMount() {
    fetch("http://localhost:3001/tasks")
      .then(res => res.json())
      .then(data => {
        this.setState({
          tasks: data.map(task => ({ ...task, id: String(task.id) }))
        });
      });
  }
  // everytime the show more button is clicked, the groupNum should be incremented by 1
  handleClick = () => {
    this.setState({ groupNum: this.state.groupNum + 1 });
  };

  // onDragEnd is a handler needed by DragDropContext
  onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const tasks = reorder(
      this.state.tasks,
      result.source.index,
      result.destination.index
    );

    this.setState({
      tasks
    });
  };

  // when the checkbox is toggled, the state of the completed of the corresponding task object will be flipped
  handleChange = id => () => {
    this.setState(prevState => ({
      tasks: prevState.tasks.map(task => {
        if (task.id === id) {
          task.completed = !task.completed;
        }
        return task;
      })
    }));
  };

  render() {
    const { groupNum, tasks } = this.state;
    // calculate the total number of tasks that can be displayed according to the current group number
    let itemNum = groupNum * 5;
    // if the total number of tasks is greater or equal to the number of tasks in the tasks array, the show more button should not be displayed
    let buttonStyle = "show";
    if (itemNum >= tasks.length) {
      buttonStyle = "hide";
    }
    return (
      <div>
        {/* data guards if there's no data in tasks array */}
        {tasks.length !== 0 ? (
          <>
            <DragDropContext onDragEnd={this.onDragEnd}>
              <TaskList
                tasks={tasks}
                limit={itemNum}
                handleChange={this.handleChange}
              />
            </DragDropContext>
            <div style={{ margin: "0 auto", width: "fit-content" }}>
              <button
                className={buttonStyle}
                onClick={this.handleClick}
              >
                Show More
              </button>
            </div>
          </>
        ) : (
          <div>JSON data is loading...</div>
        )}
      </div>
    );
  }
}

export default App;

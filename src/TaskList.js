import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";

const grid = 8;

// some basic style when you select one task for drag-n-drop
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
  margin: '0 auto'
});

// the list of tasks detail that should be displayed each time according to the limit
export default ({tasks, limit, handleChange}) => {
  return (
    <Droppable droppableId="droppable">
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          {tasks.map(
            (task, index) =>
              index < limit && (
                <Task key={task.id} task={task} index={index} handleChange={handleChange(task.id)} />
              )
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

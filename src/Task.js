import React from "react";
import { Draggable } from "react-beautiful-dnd";

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `${grid}px`,
  border: '1px dashed SteelBlue',

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "AliceBlue",

  // styles we need to apply on draggables
  ...draggableStyle
});

export default ({ task, index, handleChange }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          {/* one checkbox for each task's details */}
          <input
            type="checkbox"
            id={task.details}
            name="task"
            value={task.details}
            checked={task.completed}
            onChange={handleChange}
          />
          <label htmlFor={task.details}>{task.details}</label>
        </div>
      )}
    </Draggable>
  );
};

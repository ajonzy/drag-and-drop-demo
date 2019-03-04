import React, { Component } from 'react';

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      tasks: [{
              name: "Apples",
              category: "todo",
              bgcolor: "red"},

              {
                name: "Bananas",
                category: "todo",
                bgcolor: "yellow"},

              {
                name: "Oranges",
                category: "complete",
                bgcolor: "orange"}]
    }
  }

  onDragStart = (ev, id) => {
    ev.dataTransfer.setData("id", id) //Sets the data of the event dataTransfer key to the name (id) of what is being dragged
  }

  onDragOver = (ev) => {
    ev.preventDefault() //The defaut is to not allow a drop. This stops that.
  }

  onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id") //Gets the id(name) of what we previously set in onDragStart

    let tasks = this.state.tasks.filter((task) => {
      if(task.name == id) { //Goes through our tasks and fin the one with the name of what we were dragging
        task.category = cat //Updates the category
      }
      return task
    })

    this.setState({
      tasks: tasks //Resets the state with our updated category
    })
  }

  render() {
    const tasks = {
      todo: [],
      complete: []
    }

    this.state.tasks.forEach((t) => {
      tasks[t.category].push(
        <div key={t.name}
          onDragStart = {(e) => this.onDragStart(e, t.name)}
          draggable //This makes an element draggable
          className="draggable" style={{backgroundColor: t.bgcolor}}
        >
          {t.name}
        </div>
      )
    })

    return (
      <div className='app'>
        <h1>Drag-and-Drop Demo</h1>
        <div className="containers">
          <div className="todo"
            onDragOver={(e) => this.onDragOver(e)}
            onDrop={(e) => this.onDrop(e, "todo")}
          >
            <h2>TODO</h2>
            {tasks.todo}
          </div>
          <div className="complete" 
            onDragOver={(e) => this.onDragOver(e)}
            onDrop={(e) => this.onDrop(e, "complete")}
          >
            <h2>Complete</h2>
            {tasks.complete}
          </div>
        </div>
      </div>
    );
  }
}

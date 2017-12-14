import React, { Component } from 'react';
import PagedrawComponent1 from './pagedraw/component_1';
import $ from 'jquery';

const tasksURI = 'http://localhost:5000/todo/api/v1.0/tasks';
const ajax = function(uri, method, data) {
    var request = {
        url: uri,
        type: method,
        contentType: "application/json",
        accepts: "application/json",
        cache: false,
        crossDomain: true,
        dataType: 'json',
        data: JSON.stringify(data),
        error: function(jqXHR) {
            console.log("ajax error " + jqXHR.status);
        }
    };
    return $.ajax(request);
}

const addTask = (task, callback) => {
    ajax(tasksURI, 'POST', task).done(callback);
};

const fetchTasks = (callback) => {
    ajax(tasksURI, 'GET', {}).done(callback);
};

/* React bit */
class App extends Component {
  constructor() {
      super();
      this.state = {
          tasks: []
      }

      this.addNewTask = this.addNewTask.bind(this);
  }

  componentWillMount() {
      fetchTasks((data) => {
          this.setState({tasks: data.tasks});
      });
  }

  addNewTask() {
      addTask({title: "New task!"}, (data) => {
          this.setState({tasks: [].concat(this.state.tasks, [data.task])});
      });
  }

  render() {
    return <PagedrawComponent1 tasks={this.state.tasks} addNewTask={this.addNewTask} />;
  }
}

export default App;

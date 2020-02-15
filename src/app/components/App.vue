<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <a href="/" class="navbar-brand">MEVN Stack</a>
    </nav>
    <div class="container">
      <div class="row pt-5">
        <div class="col-md-5">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="addTask">
                <div class="form-group">
                  <input
                    type="text"
                    v-model="task.title"
                    placeholder="Insert a task"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <textarea
                    v-model="task.description"
                    cols="30"
                    rows="10"
                    class="form-control"
                    placeholder="Insert a description"
                  ></textarea>
                </div>
                <button class="btn btn-primary btn-block">Send</button>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Task</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="task of tasks">
                <td>{{ task.title }}</td>
                <td>{{ task.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts, js'>
import Vue from "vue";
class Task {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
}
export default {
  data() {
    return {
      task: new Task(),
      tasks: []
    };
  },
  created() {
    this.getTasks();
  },
  methods: {
    addTask() {
      fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(this.task),
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        this.getTasks()
      })

      this.task = new Task();
    },
    getTasks() {
      fetch('/api/tasks')
      .then(res => res.json())
      .then(data => {
        this.tasks = data;
        console.log(this.tasks)
      })
    }
  }
};
</script>
//      models/task-model.js
const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
  title: String,
  description: String,
  project: {type: Schema.Types.ObjectId, ref: 'Project'}   //not an array but an object unlike in project model
})

const Task = mongoose.model('Task', taskSchema) //pass the name of the collection and the name of the schema

module.exports = Task  //module.exportSSSSSSSSSSSSS la falta de S es common mistake

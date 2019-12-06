//      models/project-model.js
const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
  title: String,
  description: String,
  tasks: [ {type: Schema.Types.ObjectId, ref: 'Task'} ]
})

const Project = mongoose.model('Project', projectSchema) //pass the name of the collection and the name of the schema

module.exports = Project
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const history = require('connect-history-api-fallback')
const cors = require('cors')

module.exports = (host, port) => {
  const app = express()

  /* ----Mongoose---- */
  const mongoose = require('mongoose')
  /* Mongoose adatbázis-link */
  const DATABASE_ACCES = "mongodb+srv://databaseapp:databaseapp@cluster0.ju1xk.mongodb.net/todoapp?retryWrites=true&w=majority"

  mongoose.set('useNewUrlParser', true);
  mongoose.set('useUnifiedTopology', true);
  mongoose.connect(DATABASE_ACCES, () => console.log("Database Connected"))


  /* Mongoose-model shema */
  const RegModelsCopy = require('../models/RegModel')
  /* ----Mongoose---- */

  const router = new express.Router()
  app.use(cors())
  app.use('/', router)

  // Router config
  router.use(
    bodyParser.urlencoded({ extended: true }), // Parse application/x-www-form-urlencoded
    bodyParser.json() // Parse application/json
  )

  /**
   * Az osszes todo lekerdezese
   */
  router.get('/api/todos', async (req, res) => {
    try {
      /* Todo filter to current day */
      const response = await RegModelsCopy.find({})
      res.status(200).send(response)
    } catch (error) {
      res.send(error)
    }
  });

  /**
   * Todo lekerdezese id alapjan
   */
  router.get('/api/todos/:todoId', async (req, res) => {
    const { todoId } = req.params
    try {
      const response = await RegModelsCopy.findOne({ _id: todoId })
      res.send(response)
    } catch (error) {
      res.send(error)
    }
  });

  /**
   * Todo letrehozasa
   */

  router.post('/api/todos/', async (req, res) => {
    const createTodoModel = new RegModelsCopy({
      ...req.body
    })
    try {
      await createTodoModel.save()
      res.send("Task létrehozva")
    } catch (error) {
      res.send(error)
    }
  });

  /**
   * Todo modositasa
   */

  router.patch('/api/todos/:todoId', async (req, res) => {
    const { todoId } = req.params
    const todo = req.body
    try {
      const response = await RegModelsCopy.findOneAndUpdate({ _id: todoId }, { $set: { ...todo } }, { new: true }) //atomic operators mongodb
      res.send(response)
    } catch (error) {
      res.send(error)
    }
  });

  /**
   * Todo torlese
   */

  router.delete('/api/todos/:todoId', async (req, res) => {
    const { todoId } = req.params
    try {
      await RegModelsCopy.findOneAndDelete({ _id: todoId }) //atomic operators mongodb
      res.send("ok")
    } catch (error) {
      res.send(error)
    }
  });

  // History fallback api
  router.use(history())
  // Kliens kod bundle betoltese, ha van
  router.use('/', express.static(path.join(__dirname, '../../client/build')))

  return app.listen(port, host, () => {
    console.info(`Todo application is running on ${host}:${port}`)
  })
}

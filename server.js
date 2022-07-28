const express = require('express')                                                          //  Creates variable that tells app to require "Express"  
const app = express()                                                                       //  Sets "App" variable to express
const MongoClient = require('mongodb').MongoClient                                          //  Creates variable With MongoDB key
const PORT = 2121                                                                           //  Sets home port for app
require('dotenv').config()                                                                  //  Requires .env config file to function


let db,                                                                                     //  Creates variable "db"
    dbConnectionStr = process.env.DB_STRING,                                                //  Designates Key string code
    dbName = 'todo'                                                                         //  Updates name of DB variable

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })                          //  Use MongoDB client variable to connect to database
    .then(client => {                                                                       //  Upon connection, use "then" function
        console.log(`Connected to ${dbName} Database`)                                      //  Sends a confirmation to user
        db = client.db(dbName)                                                              //  Update DB Name to user's DB name
    })                                                                                      //
                                                                                            //
app.set('view engine', 'ejs')                                                               //  Sets reqs for the application
app.use(express.static('public'))                                                           //
app.use(express.urlencoded({ extended: true }))                                             //  Sets middleware for application
app.use(express.json())                                                                     //


app.get('/',async (request, response)=>{                                                    //  Tells the server what kind of communication to look out for
    const todoItems = await db.collection('todos').find().toArray()                         //  Take the data "todos" from the client's DB, and create a local variable with it (asynchronus Function)
    const itemsLeft = await db.collection('todos').countDocuments({completed: false})       //  Create variable with todos left, and if none, denote false (asynchronus Function) 
    response.render('index.ejs', { items: todoItems, left: itemsLeft })                     //  Render the data from the client DB into the DOM via ejs
    // db.collection('todos').find().toArray()                                              //  Create an Array with client data
    // .then(data => {                                                                      //
    //     db.collection('todos').countDocuments({completed: false})                        //  Count items left on the list, and stop if none
    //     .then(itemsLeft => {                                                             //
    //         response.render('index.ejs', { items: data, left: itemsLeft })               //  Render the remaining data to the DOM
    //     })                                                                               //
    // })                                                                                   //
    // .catch(error => console.error(error))                                                //  If there is an error, alerts the user
})                                                                                          //

app.post('/addTodo', (request, response) => {                                               //  Connect DB to Function "addTodo"
    db.collection('todos').insertOne({thing: request.body.todoItem, completed: false})      //  Adds new item to DB, with pass/fail
    .then(result => {                                                                       //  Take result from last function
        console.log('Todo Added')                                                           //  Alert user that item was added
        response.redirect('/')                                                              //  listen for a response from the server
    })                                                                                      //
    .catch(error => console.error(error))                                                   //  If any errors are found, alert user
})

app.put('/markComplete', (request, response) => {                                           //  Connect DB to Function "Mark Complete"
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{                     //
        $set: {                                                                             //  Command server to update item in the DB as complete
            completed: true                                                                 //
          }                                                                                 //
    },{                                                                                     //
        sort: {_id: -1},                                                                    //  Command DB to remove complete item
        upsert: false                                                                       //
    })                                                                                      //
    .then(result => {                                                                       //  Alert user and DB that item is complete
        console.log('Marked Complete')                                                      //
        response.json('Marked Complete')                                                    //
    })                                                                                      //
    .catch(error => console.error(error))                                                   //  If an error is found, alert user

})                                                                                          //

app.put('/markUnComplete', (request, response) => {                                         //   Connect DB to function "Mark Incomplete".
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{                     //
        $set: {                                                                             //  Command server to update existing list item
            completed: false                                                                //       as incomplete
          }                                                                                 //
    },{                                                                                     //
        sort: {_id: -1},                                                                    //  Adjustments for DB
        upsert: false                                                                       //
    })                                                                                      //
    .then(result => {                                                                       //
        console.log('Marked Complete')                                                      //  Alert user and DB that item has been updated.
        response.json('Marked Complete')                                                    //
    })                                                                                      //
    .catch(error => console.error(error))                                                   //  If there are any errors, alert the user

})                                                                                          //

app.delete('/deleteItem', (request, response) => {                                          //  Connect DB to function "Delete Item".
    db.collection('todos').deleteOne({thing: request.body.itemFromJS})                      //  
    .then(result => {                                                                       //  Command server to delete a list item
        console.log('Todo Deleted')                                                         //
        response.json('Todo Deleted')                                                       //  Alert user and DB of the deletion
    })                                                                                      //
    .catch(error => console.error(error))                                                   //  If there are any errors, alert the user.

})                                                                                          //

app.listen(process.env.PORT || PORT, ()=>{                                                  //  Listen on home port variable
    console.log(`Server running on port ${PORT}`)                                           //  Alert the user
})                                                                                          //

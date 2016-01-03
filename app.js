var express = require('express');  

var session = require('cookie-session'); // This module provides "guest" sessions
var bodyParser =  require('body-parser');  // Load MW to manage settings? 

var urlencodeParser = bodyParsser.urlencoded({ extedned: false});
var app = express();  

/* Using Sessions */
app.use(session({secret: 'todosecret' }))

/* Route Management Below 
A router object is an isolated instance of middleware and routes. 
Think of it as a “mini-app,”capable only of performing middleware and routing functions.
....						*/


/* Create an empty list, if none exists */
.use(function(req, res, next) {
	if (typeof(req.session.todoList) == 'undefined' ) {
	req.session.todoList= [];	
	}
	next();
})

// Display the todo list / form
.get('/todo', function(req, res) {
resrender('todo.ejs', {todoList: req.session.todoList});
})

// Function to add to the TODO
.post('/todo/add', urlencodeParser, function(req, res) {
if (req.body.newtodo != '' ) {
req.session.todoList.push(req.body.newtodo);
}
	res.redirect('/todo'); 
})
// After takes the request, it responds by redirecting user to beginning


//Deletes the item, when not wanted
.get('/todo/delete/:id', function(req, res) {
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.send('ToDo Recorded');
    res.redirect('/todo');
})

/* Redirects to the todo list if the page  is not found */
.use(function(req, res, next){
    res.redirect('/todo');
})

.listen(8080);  

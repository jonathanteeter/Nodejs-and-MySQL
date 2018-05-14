// Then create a Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. 
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazonDB"
});


connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  start();
  afterConnection();
});


// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.
function start() {
    // Running this application will first display all of the items available for sale. 
    // Include the ids, names, and prices of products for sale.
    connection.query("SELECT item_id,product_name,price FROM products", function(err, res) {
        if (err) throw err;
        console.log(res);
    });
};

function afterConnection() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
}
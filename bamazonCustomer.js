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
        
    // afterConnection();

});

// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.
function start() {
    // Running this application will first display all of the items available for sale. 
    // Include the ids, names, and prices of products for sale.
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(res);

        // The app should then prompt users with two messages.
        console.log('\n\nWelcome to BAMazon!');

        inquirer.prompt([
            {
                type: 'input',
                name: 'item',
                message: 'Enter the product (by item_id) you would like to buy: '
            },
            {
                type: 'input',
                name: 'quantity',
                message: 'How many do you need? ',
                validate: function(value) {
                    var valid = !isNaN(parseFloat(value));
                    return valid || 'Please enter a number';
                },
                // filter: Number,
            }
        ]).then(function (answer) {

            for (var i = 0; i < res.length; i++) {
    
                if (res[i].item_id == answer.item) {

                    console.log('item_id = ' + res[i].item_id);
                    console.log('product_name = ' + res[i].product_name);
                    console.log('price = ' + res[i].price);
                    console.log('stock_quantity = ' + res[i].stock_quantity);
                    console.log('quantity = ' + answer.quantity);

                    if (res[i].stock_quantity >= answer.quantity) {

                        var product = res[i].product_name;
                        var newQuantity = res[i].stock_quantity - answer.quantity;
                        var price = res[i].price;
                        console.log('product = ' + product);
                        console.log('new quantity = ' + newQuantity);
                        console.log('price = ' + price);

                        console.log('Your total price today is $' + price * answer.quantity);

                    } else {
                        console.log('There is insufficient quantity for ' + answer.product_name);
                    }
                }


            }
        });
    });
};


function afterConnection() {
    // connection.query("SELECT * FROM products", function(err, res) {
    //   if (err) throw err;

    // NEED TO LIST OUT PRODUCT NAME, ETC.
    // console.log('item = ' + item);
    // connection.query("SELECT item_id,product_name,price FROM products WHERE item_id = " + item, function(err, res) {
    //     if (err) throw err;
    //     console.log(res);
    // }); 

      console.log(res);
      connection.end();
    // });
}
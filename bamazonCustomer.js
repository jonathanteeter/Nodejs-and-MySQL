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
    
    // connection.end();
});

// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.
function start() {
    // Running this application will first display all of the items available for sale. 
    // Include the ids, names, and prices of products for sale.
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(res);  // Display product array

        console.log('\n\nWelcome to BAMazon!');
        // Prompt the users with item and quantity for purchase
        inquirer.prompt([
            {
                type: 'input',
                name: 'item',
                message: 'Enter the product (by item_id) you would like to buy: ',
                // Allow only numbers to be entered
                validate: function(value) {
                    var valid = !isNaN(parseFloat(value));
                    return valid || 'Please enter a number';
                },
            },
            {
                type: 'input',
                name: 'quantity',
                message: 'How many do you need? ',
                // Allow only numbers to be entered
                validate: function(value) {
                    var valid = !isNaN(parseFloat(value));
                    return valid || 'Please enter a number';
                },
                // filter: Number,
            }
        ]).then(function (answer) {

            // Get the right product queued up for customer sale
            for (var i = 0; i < res.length; i++) {
    
                if (res[i].item_id == answer.item) {

                    console.log('\nitem_id = ' + res[i].item_id);
                    console.log('product_name = ' + res[i].product_name);
                    console.log('price = ' + res[i].price);
                    console.log('stock_quantity = ' + res[i].stock_quantity);
                    console.log('quantity to purchase = ' + answer.quantity);

                    if (res[i].stock_quantity >= answer.quantity && answer.quantity > 0) {

                        var product = res[i].product_name;
                        var newQuantity = res[i].stock_quantity - answer.quantity;
                        var price = res[i].price;

                        console.log('product_name = ' + product);
                        console.log('new quantity = ' + newQuantity);

                        // Update the BamazonDB with reduced inventory
                        updateProduct();

                        // Round the price to 2 decimal digits.
                        var cost = (price * answer.quantity).toFixed(2);

                        // Let the customer know the final price
                        console.log('\nYour total price today is $' + cost);

                    // Show error if quantity to purchase <= 0
                    } else if (answer.quantity <= 0) {
                        console.log('\nInvalid entry for quantity to purchase');
                    // Show error is not enough inventory to meet 
                    } else {
                        console.log('\nThere is insufficient quantity for item_id [' + res[i].item_id + ': ' + res[i].product_name + ']');
                        console.log('Inventory available = ' + res[i].stock_quantity);
                    }

                    // After the sale, update the new product inventory
                    function updateProduct() {

                        console.log("Updating inventory...");

                        var query = connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                            stock_quantity: newQuantity
                            },
                            {
                            item_id: answer.item
                            }
                        ],
                        );
                    
                        // logs the actual query being run
                        console.log(query.sql);
                    }
                }
            }
        });
    });
};
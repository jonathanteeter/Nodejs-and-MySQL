# Nodejs-and-MySQL app
This is a Node.js command-line application that creates an Amazon-like storefront.  The application will take an order from the customer and deplete stock from the store's inventory.  MySQL is used to account for product and inventory.

## Design & Technology
* Populate a MySQL database with 12 products with inventory to include these columns:
    * item_id
    * product_name
    * department_name
    * price
    * stock_quantity
* Workflow:
    * The products are displayed on the screen as freshly pulled from the MySQL database.
    * The application prompts the shopper with 2 questions at purchase:
        * The item_id
        * and Quantity
    * Next, the order is submitted.
    * If enough product exists to match the order, a receipt is provided.
    * If product is lacking, the shopper is notified.  No sale is made.
    * Each successful sale will deplete the product's inventory from the MySQL database.
* Key technologies used to build this application are:
    * Node.js
    * JavaScript 
    * NPM (MySQL and Inquirer)

## Challenges
* Node.js is a back-end technology that required practice (like with anything) to get it.
* Using NPM packages required some trial and error.

## Link to [My Portfolio] 
(https://jonathanteeter.github.io/jtPortfolio/)
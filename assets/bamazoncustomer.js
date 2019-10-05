var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",


    port: 3306,


    user: "root",


    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;

});

function showstuff() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(`----------------------
Product ID:       ${res[i].item_id}
Product Title:    ${res[i].product_name}
Department Title: ${res[i].department_name}
Price:            ${res[i].price}
Quantity:         ${res[i].stock_quantity}
----------------------`)
        }
    })
}

showstuff();
connection.end();
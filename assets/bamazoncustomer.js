var mysql = require("mysql");
var inquirer = require("inquirer");
var result = {};
var table;
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

        result = res;

        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
            console.log(`----------------------
Product ID:       ${result[i].item_id}
Product Title:    ${result[i].product_name}
Department Title: ${result[i].department_name}
Price:            ${result[i].price}
Quantity:         ${result[i].stock_quantity}
----------------------`)
        }
        run();
        
    })
};
showstuff();

function run() {
    inquirer.prompt([
        {
            type: "number",
            name: "id number",
            message: "What is the ID of the product you want?"
        }
    ]).then(function (user) {
        connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw err;
            var input = user["id number"];
            var foundSomething = false;
            for (var i = 0; i < res.length; i++) {
                if (input === res[i].item_id) {
                    foundSomething = true;
                    table = `
Product ID:       ${res[i].item_id}
Product Title:    ${res[i].product_name}
Department Title: ${res[i].department_name}
Price:            ${res[i].price}
Quantity:         ${res[i].stock_quantity}
`
                    var userID = res[i].item_id
                    var price = res[i].price;
                    var quantity = res[i].stock_quantity;
                    console.log(table)
                    inquirer.prompt([
                        {
                            type: "number",
                            name: "quantity",
                            message: "How many of this item do you want?"
                        }
                    ]).then(function (user) {
                        if (user.quantity <= quantity) {
                            var total = user.quantity * price
                            var newQuantity = quantity - user.quantity
                            console.log("here ya go!");
                            console.log("your total comes to: $" + total.toFixed(2));
                            function update() {
                                connection.query("UPDATE products SET ? WHERE ?", [
                                    {
                                        stock_quantity: newQuantity
                                    },
                                    {
                                        item_id: userID
                                    }
                                ])
                               console.log("We have " + newQuantity + " of those left!")
                            connection.end();
                            };
                            update();
                           
                        } else {
                            console.log("we dont have enough of that product :(");
                            run();
                        }
                    });


                }
            } if (foundSomething === false) {
                console.log("pick an actual item id!!")
                run();
            }


        });




    });
    
}




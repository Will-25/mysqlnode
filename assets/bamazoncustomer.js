var mysql = require("mysql");
var inquirer = require("inquirer");
var result = {};
var x;
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
                    x = `
Product ID:       ${res[i].item_id}
Product Title:    ${res[i].product_name}
Department Title: ${res[i].department_name}
Price:            ${res[i].price}
Quantity:         ${res[i].stock_quantity}
`
                    var quantity = res[i].stock_quantity
                    console.log(x)
                    inquirer.prompt([
                        {
                            type: "number",
                            name: "quantity",
                            message: "How many of this item do you want?"
                        }
                    ]).then(function(user){
                        
                        if(user > quantity) {
                            console.log("we aint got that")
                        } else {
                            console.log("here yea go")
                        }
                    }) 


                }
            } if (foundSomething === false) {
                console.log("pick an actual item id!!")
            }


        });




    });
}

// run();

// connection.end();
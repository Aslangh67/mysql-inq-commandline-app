const mysql = require("mysql")
const inquirer = require("inquirer")

const connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "password",

    database: "theoffice_db"
})

connection.connect(function (err) {
    if (err) throw err
    start()
})


function start() {
    inquirer.prompt({
        name: "options",
        type: "list",
        message: "Please chose an option?",
        choices: ["Add a department", "Add an employee", "QUIT"]
    }).then(function ({ options }) {
        if (options === "Add a department") {
            addDepartment()
        } else if (options === "Add an employee") {
            addEmployee()
        } else {
            connection.end()
        }
    })
}


function addDepartment() {
    inquirer.prompt({
        name: "name",
        type: "input",
        message: "What is the name of the department you like to add??"
    }).then(function (answers) {
        connection.query("INSERT INTO department SET ?", { title: answers.name }, function (err) {
            if (err) throw err
            start()
        })
    })


}


function addEmployee() {
    connection.query("SELECT * FROM department", function (err, data) {
        if (err) throw err

        let depArr = data.map(function (dep) {
            return {
                name: dep.title,
                value: dep.id
            }
        })



        inquirer.prompt([
            {
                name: "name",
                type: "input",
                message: "What is the name of the employee you like to add??"
            }, {
                name: "cool",
                type: "confirm",
                message: "is this employee cool??"
            }, {
                name: "depId",
                type: "list",
                message: "What is the department of this employee??",
                choices: depArr
            }, {
                name: "salary",
                
                type: "number",
                message: "how much money is this one making??"
            },
        ]).then(function (answers) {
            connection.query("INSERT INTO crew SET ?", {
                name: answers.name,
                cool: answers.cool,
                salary: answers.salary,
                department_id: answers.depId
            }, function (err) {
                if (err) throw err
                start()
            })
        })

    })
}




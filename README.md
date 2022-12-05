# Employee-Tracker

## Description:

A command line application that will allow a business to keep track of their departments, employee roles, and employees

## User Story:

>As a business owner I find myself needing a quick way to view my staff so I can easily view all employees or view them by department or by who manages them. I also need an easy way to be able to update employees, employee roles, and departments that I have.

## Running the Program

> In mysql in terminal to create the database and empty tables

```bash
SOURCE schema.sql
```
>If you want to work with the already created data for the tables, run this next line in mysql after the above

```bash
SOURCE seeds.sql
```
>Then exit from mysql. Inside your regular terminal run the following command to start the program.

```bash
npm start
```

## Screenshots/Demos

#### Demo Video

https://drive.google.com/file/d/1BsH4CDn7vjQ-4HsKow-aPcPttEfjAafb/view

## Credits

* Shanon Holland --GitHub: [sm0526](https://github.com/sm0526)

### Tools

> #### MySQL2 [MySQL2 Package](https://www.npmjs.com/package/mysql2/v/2.1.0)
>
> - MySQL client for Node.js with focus on performance.

> #### Inquirer [Inquirer Package](https://www.npmjs.com/package/inquirer/v/8.2.4)
>
> - An amazing resource, this command line interface for Node.js will allow you to take user input and store it in a variable so that we can use the information in our program.

> #### Console.table [Console.table Package](https://www.npmjs.com/package/console.table/v/0.10.0)
>
> - Utilizes the [Easy-table Package](https://www.npmjs.com/package/easy-table) to print tables in the console.log

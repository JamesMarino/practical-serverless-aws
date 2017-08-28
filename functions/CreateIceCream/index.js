/**
 * @lambda CreateIceCream
 * @description Create Ice Cream
 */

"use strict";

const Database = require("./utilities/database");

function validate(event) {

    return (
        !event.hasOwnProperty("Name") ||
        !event.hasOwnProperty("Flavour") ||
        !event.hasOwnProperty("Rating") ||
        !event.hasOwnProperty("Colour") ||
        !event.hasOwnProperty("NextOrderDate")
    );

}

exports.handler = async (event, context) => {

    let database = null;

    try {

        if (validate(event)) {
            return context.succeed({
                errorMessage: "Invalid Parameters"
            });
        }

        database = new Database();
        await database.connect();

        const values = [
            event.Name,
            event.Flavour,
            event.Rating,
            event.Colour,
            event.NextOrderDate
        ];

        let response  = await database.query("INSERT INTO IceCream (" +
            "Name, Flavour, Rating, Colour, NextOrderDate) " +
            "VALUES (?, ?, ?, ?, ?);", values
        );

        await database.disconnect();

        context.succeed(response);


    } catch (error) {

        if (database) {
            await database.disconnect();
        }

        context.fail(error);
    }

};

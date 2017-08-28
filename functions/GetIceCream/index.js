/**
 * @lambda GetIceCream
 * @description Get Ice Cream
 */

"use strict";

const Database = require("./utilities/database");

exports.handler = async (event, context) => {

    let database = null;

    try {

        database = new Database();
        await database.connect();

        let response  = await database.query("SELECT * FROM IceCream;");

        await database.disconnect();

        context.succeed(response);


    } catch (error) {

        if (database) {
            await database.disconnect();
        }

        context.fail(error);
    }

};

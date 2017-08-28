/**
 * @class Database
 */

const mysql = require("mysql");

class Database {

    constructor() {
        this._Host = process.env.mysql_host;
        this._User = process.env.mysql_user;
        this._Password = process.env.mysql_password;
        this._Database = process.env.mysql_database;
        this._Connection = null;
        this._Pool = null;
    }

    connect() {

        return new Promise((resolve, reject) => {

            const pool = mysql.createPool({
                host: this._Host,
                user: this._User,
                password: this._Password,
                database: this._Database
            });

            this._Pool = pool;

            pool.getConnection((error, connection) => {
                if (error) {
                    reject(error);
                } else {
                    this._Connection = connection;
                    resolve(true);
                }
            });

        });
    }

    disconnect() {

        if (this._Pool) {

            return new Promise((resolve, reject) => {

                this._Pool.end((error) => {
                    if (error) {
                        return reject(error);
                    } else {
                        return resolve(true);
                    }
                })

            })

        }

    }

    query(sql, values, rollback) {

        if (!sql) {
            throw new Error("No SQL Statement Supplied")
        }

        if (!values) {
            values = null;
        }

        return new Promise((resolve, reject) => {

            this._Connection.query(sql, values, (error, results) => {

                if (error) {

                    if (rollback) {
                        this._Connection.rollback(() => {
                            return reject(error);
                        });
                    } else {
                        return reject(error);
                    }

                } else {

                    if (!rollback) {
                        this._Connection.release();
                    }

                    return resolve(results);
                }

            })

        })

    }

}

module.exports = Database;

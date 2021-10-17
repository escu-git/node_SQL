const {mariaDB, sqLite3} = require('../../Database/config/db_config.js')
const db = require('knex');

const productDB = {
    insert: async(table, element)=>{
        let useDB = table=='products' ? mariaDB : sqLite3;
        let newProduct = await db(useDB)(table).insert(element)
        return newProduct
    },

    readAll: async(table, query)=>{
        let useDB = table=='products' ? mariaDB : sqLite3;
        return db(useDB)(table)
        .select(query)
    },

    readOne: async(table, elementId)=>{
        let useDB = table=='products' ? mariaDB : sqLite3;
        return db(useDB)(table)
        .select("*")
        .where('id', elementId)
        .first()
    },
    delete: async(table, elementId)=>{
        let useDB = table=='products' ? mariaDB : sqLite3;
        return db(useDB)(table)
        .where({id:elementId})
        .del()
    },
    update: async(table, id, attr, value)=>{
        let useDB = table=='products' ? mariaDB : sqLite3;
        await db(useDB)(table)
        .where({id:id})
        .update(attr, value)
    }
}

module.exports= productDB;
/* eslint-disable consistent-return */
import {seedGroups, seedRoles, seedPermissions } from './db_tables';
import pool from './connection';
  
const seeders = [seedGroups, seedRoles, seedPermissions];
   
const createSeeders = () =>  new Promise((resolve, reject) => {
    seeders.forEach((queryText, index) => {
        pool.query(queryText)
        .then(() => {
            if (index === seeders.length - 1) {
                return resolve('DB Ready');
            }
        })
        .catch((error) => reject(error.message));
    });
})


export default createSeeders();
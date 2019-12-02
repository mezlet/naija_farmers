/* eslint-disable consistent-return */
import { createUsers, createGroups, createRoles, createPermissions, user_confirmation } from './db_tables';
import pool from './connection';
  
const tables = [createUsers, createGroups, createRoles, createPermissions, user_confirmation];
    
export const createTables = () =>  new Promise((resolve, reject) => {
  tables.forEach((queryText, index) => pool.query(queryText)
    .then(() => {
      if (index === tables.length - 1) {
        return resolve('DB Ready');
      }
    })
    .catch(error => reject(error.message)));
});
      
export default createTables();

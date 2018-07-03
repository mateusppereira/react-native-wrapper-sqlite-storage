/* eslint-disable */
import SQLite from 'react-native-sqlite-storage';
import { generateId } from '../utils'

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const openArgs = { name: '_gixDb_.sqlite' };

export const TABLES = {
  employees: 'EMPLOYEES',
  departments: 'DEPARTMENTS',
};

const tables = [
  {
    name: TABLES.employees,
    fields: [
      {
        name: `id${TABLES.employees}`,
        type: 'VARCHAR(100)',
      },
      {
        name: 'name',
        type: 'VARCHAR(100)',
      },
      {
        name: 'CPF',
        type: 'VARCHAR(100)',
      },
      {
        name: `fk${TABLES.departments}`,
        type: 'VARCHAR(100)',
      },
    ],
  },
  {
    name: TABLES.departments,
    fields: [
      {
        name: `id${TABLES.departments}`,
        type: 'VARCHAR(100)',
      },
      {
        name: 'name',
        type: 'VARCHAR(100)',
      },
    ],
  },
];

let db = null;
// CRIA AS TABELAS
SQLite.openDatabase(openArgs).then((DB) => {
  db = DB;
  tables.map((table) => {
    let fieldsQuery = '';
    table.fields.map((field) => {
      fieldsQuery += `${field.name} ${field.type}, `;
    });

    const queryCreateTable =
      `CREATE TABLE IF NOT EXISTS ${table.name} (${fieldsQuery.slice(0, -2)});`;

    db.executeSql(queryCreateTable)
      .then(() => {
        console.log(`table ${table.name} created`);
      })
      .catch(error => console.log(`erro createTable ${error}`));
  });
}).catch(error => console.log(`erro openDb ${error}`));


export const insertValues = (table, obj) => new Promise((resolve, reject) => {
  let keysStr = '';
  let valStr = '';

  // CRIA QUERY PARA FK
  const fkArr = obj.fk;
  if (!!fkArr) {
    fkArr.map(itemFk => {
      keysStr += `fk${itemFk.table} ,`
      valStr += `'${itemFk.value}' ,`
    });
  }

  // CRIA QUERY PARA OUTROS CAMPOS
  delete obj.fk;
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  keys.map((key) => {
    keysStr += `${key}, `;
  });
  values.map((val) => {
    if (typeof val === 'string') {
      valStr += `'${val}', `;
    } else {
      valStr += `${val}, `;
    }
  });



  const id = generateId();
  const queryInsert = `INSERT INTO ${table} (id${table}, ${keysStr.slice(0, -2)}) VALUES (${id}, ${valStr.slice(0, -2)})`;
  console.log(queryInsert);

  db.executeSql(queryInsert)
    .then(() => resolve(id))
    .catch(erro => reject(erro));
});

export const getAllValues = table => new Promise((resolve, reject) => {
  db.executeSql(`SELECT * FROM ${table}`).then(([results]) => {
    const resp = [];
    const { rows } = results;
    for (let i = 0; i < rows.length; i += 1) {
      resp.push(rows.item(i));
    }
    resolve(resp);
  });
});

export const getFilteredValues = (table, filter) => new Promise((resolve, reject) => {
  db.executeSql(`SELECT * FROM ${table} ${filter}`).then(([results]) => {
    const resp = [];
    const { rows } = results;
    for (let i = 0; i < rows.length; i += 1) {
      resp.push(rows.item(i));
    }
    resolve(resp);
  });
});


// EXEMPLO FK
export const getAllFromEmployee = () => new Promise((resolve, reject) => {
  db.executeSql(`SELECT e.name as nome, e.cpf, d.name FROM EMPLOYEES e, DEPARTMENTS d
                WHERE e.fkDEPARTMENTS = d.idDEPARTMENTS`).then(([results]) => {
    const resp = [];
    const { rows } = results;
    for (let i = 0; i < rows.length; i += 1) {
      resp.push(rows.item(i));
    }
    resolve(resp);
  });
});

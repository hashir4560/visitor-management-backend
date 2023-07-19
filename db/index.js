const { createConnection } = require("mysql2/promise");

class DB {
  constructor() {
    this.connection = createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "Samsung.5s",
      database: "visitor_management_db",
    });
  }

  async connect() {
    const conn = await this.connection;
    conn
      .connect()
      .then(() => {
        console.log("Database connected");
      })
      .catch((error) => {
        console.log("Database connection error: ", error);
      });
  }

  async createAdmin({ first_name, last_name, username }) {
    const conn = await this.connection;

    return conn.query(
      `
        INSERT INTO admin (first_name, last_name, username, password) VALUES (?, ?, ?, ?)
      `,
      [first_name, last_name, username, username]
    );
  }

  async getAdmins() {
    const conn = await this.connection;

    return conn.query(`
      SELECT id, first_name, last_name, username FROM admin
    `);
  }
  async getVisitors() {
    const conn = await this.connection;

    return conn.query(`
      SELECT id, name, cnic,phone  FROM visitor
    `);
  }

  async updatePassword({ username, password }) {
    const conn = await this.connection;
    return conn.query(
      `
      UPDATE admin SET password = ? WHERE username = ? 
    `,
      [password, username]
    );
  }
  async createDepartment({ name }) {
    const conn = await this.connection;

    return conn.query(
      `
        INSERT INTO department(name) VALUES (?)
      `,
      [name]
    );
  }
  async updateName({ dept_id, name }) {
    const conn = await this.connection;
    return conn.query(
      `
      UPDATE department SET name = ? WHERE dept_id = ?
    `,
      [name, dept_id]
    );
  }
  async deleteDepartment({ dept_id }) {
    const conn = await this.connection;
    return conn.query(
      `
      DELETE FROM department WHERE dept_id = ?
    `,
      [dept_id]
    );
  }

  async getDepartments() {
    const conn = await this.connection;
    return conn.query(`
       SELECT * FROM department

    `);
  }
}

const db = new DB();

module.exports = db;

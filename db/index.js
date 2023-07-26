const { createConnection } = require("mysql2/promise");

class DB {
  constructor() {
    this.connection = createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "Samsung.5s",
      //password: "root",
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

  async createAdmin({ email, first_name, last_name, password }) {
    const conn = await this.connection;

    return conn.query(
      `
        INSERT INTO admin ( email,first_name, last_name , password) VALUES (?, ?, ?, ?)
      `,
      [email, first_name, last_name, password]
    );
  }

  async getAdmins() {
    const conn = await this.connection;

    return conn.query(`
      SELECT id, email ,first_name, last_name FROM admin
    `);
  }
  async getVisitors() {
    const conn = await this.connection;

    return conn.query(`
      SELECT id, name, cnic, phone, email FROM visitor
    `);
  }
  async createVisitor({ name, phone, cnic, email }) {
    const conn = await this.connection;

    return conn.query(
      `
        INSERT INTO visitor (name,phone,cnic,email) VALUES (?, ?, ?, ?)
      `,
      [name, phone, cnic, email]
    );
  }

  async updatePassword({ email, password }) {
    const conn = await this.connection;
    return conn.query(
      `
      UPDATE admin SET password = ? WHERE email = ? 
    `,
      [password, email]
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
  async deleteDepartment(dept_id) {
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

  async verifyCredentials({ email, password }) {
    const conn = await this.connection;
    return conn.query(
      `
      CALL verify_credentials(?, ?)
    `,
      [email, password]
    );
  }
  //Visits
  async getVisits() {
    const conn = await this.connection;

    return conn.query(`
      SELECT id,visitor_id,purpose,checkintime,dept_id FROM visit WHERE checkouttime IS NULL
    `);
  }
  async getPastVisits() {
    const conn = await this.connection;

    return conn.query(`
    SELECT id,visitor_id,purpose,checkintime,checkouttime,dept_id FROM visit WHERE checkouttime IS NOT NULL`);
  }

  async createVisit({ visitor_id, purpose, dept_id }) {
    const conn = await this.connection;
    return conn.query(
      `
      INSERT INTO visit(visitor_id, purpose, checkintime,  dept_id) VALUES (?, ?,CURRENT_TIMESTAMP(), ?)

      `,
      [visitor_id, purpose, dept_id]
    );
  }
  async checkout(id) {
    const conn = await this.connection;
    return conn.query(
      `
    UPDATE visit SET checkouttime = CURRENT_TIMESTAMP() WHERE id=? AND checkouttime IS NULL 
    `,
      [id]
    );
  }
  async deleteVisit(id) {
    const conn = await this.connection;
    return conn.query(
      `
      DELETE FROM visit WHERE id = ?
    `,
      [id]
    );
  }
}

const db = new DB();

module.exports = db;

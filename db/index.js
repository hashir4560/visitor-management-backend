const { createConnection } = require("mysql2/promise");

class DB {
  constructor() {
    this.connection = createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: "visitor_management_db",
      multipleStatements: true,
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

  async updatePassword({ email, password, oldPassword }) {
    const conn = await this.connection;
    return conn.query(
      `
      UPDATE admin SET password = ? WHERE email = ? AND password=sha1(unhex(sha1(?)))
    `,
      [password, email, oldPassword]
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
  async deleteVisitor(id) {
    const conn = await this.connection;
    return conn.query(
      `
    DELETE FROM visitor WHERE id = ?
    `,
      [id]
    );
  }
  async deleteVisitors(ids = []) {
    const conn = await this.connection;
    return conn.query(
      `
    DELETE FROM visitor WHERE id IN (0, ${ids.join(", ")})`
    );
  }
  async deleteDepartments(ids = []) {
    const conn = await this.connection;
    return conn.query(
      `
    DELETE FROM department WHERE dept_id IN (0, ${ids.join(", ")})`
    );
  }
  async getStats() {
    const conn = await this.connection;
    return conn.query(`
      SELECT COUNT(DISTINCT id) 
      AS currentVisits
      FROM visit 
      WHERE (
        checkintime > DATE_SUB(
          NOW(), INTERVAL 1 DAY
        )
      ) 
      AND checkouttime IS NULL;  
      
      SELECT COUNT(DISTINCT id) 
      AS pastVisits
      FROM visit 
      WHERE (
        checkouttime > DATE_SUB(
          NOW(), INTERVAL 1 DAY
        )
      );
    `);
  }
}

const db = new DB();

module.exports = db;

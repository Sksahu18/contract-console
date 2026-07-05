const pool = require("../config/db");
const { v4: uuid } = require("uuid");
const audit = require("../services/audit.service");

exports.create = async (req, res) => {
  const id = uuid();

  const result = await pool.query(
    `INSERT INTO contracts
    (id, organisation_id, client_name, po_ref_no, po_date, status, field_data)
    VALUES ($1,$2,$3,$4,$5,'DRAFT',$6)
    RETURNING *`,
    [
      id,
      req.orgId,
      req.body.client_name,
      req.body.po_ref_no,
      req.body.po_date,
      req.body
    ]
  );

  await audit.logEvent(id, req.orgId, "CREATE", null, result.rows[0]);

  res.json(result.rows[0]);
};

exports.getAll = async (req, res) => {
  const { status, search, id, page = 1, limit = 10 } = req.query;

  let query = `SELECT * FROM contracts WHERE organisation_id=$1`;
  let values = [req.orgId];

  if (status) {
    values.push(status);
    query += ` AND status=$${values.length}`;
  }

  if (search) {
    values.push(`%${search}%`);
    query += ` AND client_name ILIKE $${values.length}`;
  }

  if (id) {
    values.push(id);
    query += ` AND id=$${values.length}`;
  }

  query += ` ORDER BY created_at DESC LIMIT ${limit} OFFSET ${(page - 1) * limit}`;

  const result = await pool.query(query, values);

  res.json(result.rows);
};

exports.getOne = async (req, res) => {
  const result = await pool.query(
    `SELECT * FROM contracts WHERE id=$1 AND organisation_id=$2`,
    [req.params.id, req.orgId]
  );

  res.json(result.rows[0]);
};

exports.update = async (req, res) => {
  const existing = await pool.query(
    `SELECT * FROM contracts WHERE id=$1 AND organisation_id=$2`,
    [req.params.id, req.orgId]
  );

  const contract = existing.rows[0];

  if (!contract || contract.status !== "DRAFT") {
    return res.status(400).json({ error: "Only draft editable" });
  }

  const updated = await pool.query(
    `UPDATE contracts
     SET field_data=$1, client_name=$2
     WHERE id=$3 RETURNING *`,
    [req.body, req.body.client_name, req.params.id]
  );

  await audit.logEvent(
    req.params.id,
    req.orgId,
    "UPDATE",
    contract,
    updated.rows[0]
  );

  res.json(updated.rows[0]);
};

exports.delete = async (req, res) => {
  const existing = await pool.query(
    `SELECT * FROM contracts WHERE id=$1 AND organisation_id=$2`,
    [req.params.id, req.orgId]
  );

  const contract = existing.rows[0];

  if (!contract || contract.status !== "DRAFT") {
    return res.status(400).json({ error: "Only draft deletable" });
  }

  await pool.query(`DELETE FROM contracts WHERE id=$1`, [req.params.id]);

  await audit.logEvent(req.params.id, req.orgId, "DELETE", contract, null);

  res.json({ message: "Deleted" });
};

exports.updateStatus = async (req, res) => {
  const { status } = req.body;

  const result = await pool.query(
    `SELECT * FROM contracts WHERE id=$1 AND organisation_id=$2`,
    [req.params.id, req.orgId]
  );

  const contract = result.rows[0];

  if (!contract) {
    return res.status(404).json({ error: "Contract not found" });
  }

  const allowed = {
    DRAFT: ["FINALIZED"],
    FINALIZED: ["ARCHIVED"]
  };

  if (!allowed[contract.status]?.includes(status)) {
    return res.status(409).json({ error: "Invalid transition" });
  }

  const updated = await pool.query(
    `UPDATE contracts SET status=$1 WHERE id=$2 RETURNING *`,
    [status, req.params.id]
  );

  await audit.logEvent(
    req.params.id,
    req.orgId,
    "STATUS_CHANGE",
    contract,
    updated.rows[0]
  );

  // ✅ Real-time event
  req.app.get("io").emit("contractUpdated", {
    id: req.params.id,
    status
  });

  res.json(updated.rows[0]);
};

exports.getEvents = async (req, res) => {
  const result = await pool.query(
    `SELECT * FROM contract_events
     WHERE contract_id=$1 AND organisation_id=$2
     ORDER BY created_at DESC`,
    [req.params.id, req.orgId]
  );

  res.json(result.rows);
};
const pool = require("../config/db");
const { v4: uuid } = require("uuid");

exports.logEvent = async (contractId, orgId, type, oldVal, newVal) => {
  await pool.query(
    `INSERT INTO contract_events
     (id, contract_id, organisation_id, event_type, old_value, new_value)
     VALUES ($1,$2,$3,$4,$5,$6)`,
    [uuid(), contractId, orgId, type, oldVal, newVal]
  );
};
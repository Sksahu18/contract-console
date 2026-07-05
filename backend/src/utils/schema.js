module.exports = {
  type: "object",
  required: ["client_name", "po_ref_no", "po_date", "items"],
  properties: {
    client_name: { type: "string" },
    po_ref_no: { type: "string" },
    po_date: { type: "string" },
    payment_terms: { type: "string" },
    delivery_terms: { type: "string" },
    items: {
      type: "array",
      items: {
        type: "object",
        required: ["description", "quantity", "unit_price"],
        properties: {
          description: { type: "string" },
          quantity: { type: "number", minimum: 1 },
          unit_price: { type: "number", minimum: 0 }
        }
      }
    }
  }
};
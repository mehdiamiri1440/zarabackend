const ticketMetadata = {
  fields: {
    replies: {
      type: "set",
      typeDef: "<frozen<ticket_info>>"
    },
    subject: "text",
    ticket_id: "text",
    created_date: {
      type: "timestamp",
      default: { $db_function: "toTimestamp(now())" }
    },
    status: {
      type: "frozen",
      typeDef: "<general_info>"
    },
    type: {
      type: "frozen",
      typeDef: "<general_info>"
    },
    user_id: "int",
    user_operator_id: "int",
    id: {
      type: "uuid",
      default: { $db_function: "uuid()" }
    }
  },
  key: ["id"],
  indexes: ["user_id", "user_operator_id", "status"]
};
module.exports = ticketMetadata;

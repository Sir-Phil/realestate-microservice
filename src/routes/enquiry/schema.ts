
  // Define the constant and freeze it
  const property = Object.freeze({
    type: "object",
    properties: {
      name: { type: "string" },
      property_id: { type: "string" }
    }
  });

  const users = Object.freeze({
    type: "object",
    properties: {
        from: {
            user_id: {type: "string"},
            keep: { type: "boolean"}
        },
        to: {
            user_id: {type: "string"},
            keep: {type: "boolean"}
        }
    }
  })

  const replyTo = Object.freeze({
    type: "object",
    properties: {
      enquiry_id: { type: "string" },
      title: { type: "string" },
      topic: { type: "string" },
    },
  });
 
const enquiryProperties = Object.freeze({
    type: "object",
    properties: {
      enquiry_id: { type: "string" },
      content: { type: "string" },
      email: { type: "string" },
      title: { type: "string" },
      topic: { type: "string" },
      read: { type: "boolean" },
      property,
      replyTo,
      users,
      createdAt: { type: "string" },
      updatedAt: { type: "string" },
    },
  });

  export default enquiryProperties


// multiple users
const usersProperties = Object.freeze({
    user_id: {type: "string"},
    email: {type: "string"},
    fullName: {type: "string"},
})

//single user
const userProperties = Object.freeze({
    ...usersProperties,
    properties: {
        type: "array"
    }
});
export {
    userProperties,
    usersProperties
}
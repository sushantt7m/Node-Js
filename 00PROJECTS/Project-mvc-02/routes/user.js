const express = require("express");
const {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser,
} = require("../controllers/user");

const router = express.Router();

// router.get("/", async (req, res) => {
//     const allDbUsers = await User.find({});
//     const html = `
//         <ul>
//             ${allDbUsers.map((users) => `<li>${users.firstName}-${users.email}</li>`).join("")}
//         </ul>
//     `;
//     res.send(html);
// });

router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

router
    .route("/:id")
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById);

module.exports = router;

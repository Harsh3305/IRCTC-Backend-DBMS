const router = require("express").Router();
const { verifyUserAccessToken } = require("./../verify_access_token");
// book ticket cluster
router.post("/bookTicketCluster", verifyUserAccessToken, async (req, res) => {

});
// delete ticket cluster if user
// get all ticket cluster of user
// get all vacant seats of train
router.get("/getAllVacentSeatsOfTrain/:train_id", verifyUserAccessToken, async (req, res) => {
    try { }
    catch (error) { }
});
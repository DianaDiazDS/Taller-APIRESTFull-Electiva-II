const router = require("express").Router();

const {findAll, findById, save, update, drop} = require("../controllers/appointment")

router.get("/", findAll);
router.get("/:id", findById);
router.post("/:id", save);
router.put("/:idAppointment", update);
router.delete("/:idAppointment", drop);

module.exports = router;

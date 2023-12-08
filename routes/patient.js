const router = require("express").Router();

const {
  findAll,
  findById,
  save,
  update,
  drop,
} = require("../controllers/patient");

router.get("/", findAll);
router.get("/:id", findById);
router.post("/", save);
router.put("/:idPatient", update);
router.delete("/:idPatient", drop);

module.exports = router;

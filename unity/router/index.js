const { Router } = require("express");
const {
  listEvent,
  editEvent,
  deleteEvent,
  createEvent,
  listProject,
  createProject,
  detailEvent,
} = require("../controller/timesheet.js");

const router = Router();

// Event
router.get("/event", listEvent);
router.get("/event-detail/:uuid", detailEvent);
router.post("/event", createEvent);
router.patch("/event/:uuid", editEvent);
router.delete("/event/:uuid", deleteEvent);
// END Event

// Project
router.get("/project", listProject);
router.post("/project", createProject);
// END Project

module.exports = router;

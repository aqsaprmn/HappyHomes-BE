const logger = require("../logger/index.js");
const { v4: uuidv4 } = require("uuid");
const Event = require("../models/event.js");
const Project = require("../models/project.js");
const { DateTime } = require("luxon");

const createEvent = async (req, res) => {
  const loggerId = uuidv4();

  const activity = "Create Event";

  const metaDataInit = {
    timestamp: Math.floor(Date.now() / 1000),
  };

  try {
    const data = {
      metadata: {
        timeInsert: DateTime.now(),
        timeUpdate: DateTime.now(),
      },
      uuid: uuidv4(),
      ...req.body,
    };

    const insEvent = await Event.create(data);

    if (!insEvent) {
      logger.info("[" + loggerId + `] [${activity}] Insert event failed.`);

      const resRequiredFieldCheck = {
        ...metaDataInit,
        success: false,
        message: "Insert event failed.",
      };

      return res.status(403).json(resRequiredFieldCheck);
    }

    const responseGo = {
      ...metaDataInit,
      success: true,
      message: "Insert event success.",
      data: insEvent,
    };

    logger.info("[" + loggerId + `] [${activity}] Insert event success.`);

    res.status(200).json(responseGo);
  } catch (err) {
    const resRequiredFieldCheck = {
      ...metaDataInit,
      success: false,
      message: "Something wrong.",
      error: err.message,
    };

    logger.info(
      "[" + loggerId + `] [${activity}] Something wrong: ${err.message}`
    );

    res.status(400).json(resRequiredFieldCheck);
  }
};

const editEvent = async (req, res) => {
  const loggerId = uuidv4();

  const activity = "Edit Event";

  const metaDataInit = {
    timestamp: Math.floor(Date.now() / 1000),
  };

  try {
    const data = {
      ...req.body,
    };

    const uuid = req.params.uuid;

    const updEvent = await Event.updateOne({ uuid }, data);

    if (!updEvent) {
      logger.info("[" + loggerId + `] [${activity}] Edit data event failed.`);

      const resRequiredFieldCheck = {
        ...metaDataInit,
        success: false,
        message: "Edit data event failed.",
      };

      return res.status(403).json(resRequiredFieldCheck);
    }

    const responseGo = {
      ...metaDataInit,
      success: true,
      message: "Edit data event success.",
      data: updEvent,
    };

    logger.info("[" + loggerId + `] [${activity}] Edit data event success.`);

    res.status(200).json(responseGo);
  } catch (err) {
    const resRequiredFieldCheck = {
      ...metaDataInit,
      success: false,
      message: "Something wrong.",
      error: err.message,
    };

    logger.info(
      "[" + loggerId + `] [${activity}] Something wrong: ${err.message}`
    );

    res.status(400).json(resRequiredFieldCheck);
  }
};

const deleteEvent = async (req, res) => {
  const loggerId = uuidv4();

  const activity = "Delete Event";

  const metaDataInit = {
    timestamp: Math.floor(Date.now() / 1000),
  };

  try {
    const uuid = req.params.uuid;

    const delEvent = await Event.deleteOne({ uuid });

    if (!delEvent) {
      logger.info("[" + loggerId + `] [${activity}] Delete data event failed.`);

      const resRequiredFieldCheck = {
        ...metaDataInit,
        success: false,
        message: "Delete data event failed.",
      };

      return res.status(403).json(resRequiredFieldCheck);
    }

    const responseGo = {
      ...metaDataInit,
      success: true,
      message: "Delete data event success.",
      data: delEvent,
    };

    logger.info("[" + loggerId + `] [${activity}] Delete data event success.`);

    res.status(200).json(responseGo);
  } catch (err) {
    const resRequiredFieldCheck = {
      ...metaDataInit,
      success: false,
      message: "Something wrong.",
      error: err.message,
    };

    logger.info(
      "[" + loggerId + `] [${activity}] Something wrong: ${err.message}`
    );

    res.status(400).json(resRequiredFieldCheck);
  }
};

const listEvent = async (req, res) => {
  const loggerId = uuidv4();

  const activity = "List Event";

  const metaDataInit = {
    timestamp: Math.floor(Date.now() / 1000),
  };

  try {
    const filter = req.query.search;

    let listEvent;

    if (filter) {
      listEvent = await Event.find({
        $or: [
          { eventTitle: { $regex: filter } },
          { projectName: { $regex: filter } },
        ],
      }).lean();
    } else {
      listEvent = await Event.find({}).lean();
    }

    if (!listEvent) {
      logger.info("[" + loggerId + `] [${activity}] Show event failed.`);

      const resRequiredFieldCheck = {
        ...metaDataInit,
        success: false,
        message: "Show event failed.",
      };

      return res.status(403).json(resRequiredFieldCheck);
    }

    const responseGo = {
      ...metaDataInit,
      success: true,
      message: "Show event success.",
      data: listEvent,
    };

    logger.info("[" + loggerId + `] [${activity}] Show event success.`);

    res.status(200).json(responseGo);
  } catch (err) {
    const resRequiredFieldCheck = {
      ...metaDataInit,
      success: false,
      message: "Something wrong.",
      error: err.message,
    };

    logger.info(
      "[" + loggerId + `] [${activity}] Something wrong: ${err.message}`
    );

    res.status(400).json(resRequiredFieldCheck);
  }
};

const detailEvent = async (req, res) => {
  const loggerId = uuidv4();

  const activity = "Detail Event";

  const metaDataInit = {
    timestamp: Math.floor(Date.now() / 1000),
  };

  try {
    const uuid = req.params.uuid;

    const detailEvent = await Event.findOne({ uuid }).lean();

    if (!detailEvent) {
      logger.info("[" + loggerId + `] [${activity}] Show event failed.`);

      const resRequiredFieldCheck = {
        ...metaDataInit,
        success: false,
        message: "Show event failed.",
      };

      return res.status(403).json(resRequiredFieldCheck);
    }

    const responseGo = {
      ...metaDataInit,
      success: true,
      message: "Show event success.",
      data: detailEvent,
    };

    logger.info("[" + loggerId + `] [${activity}] Show event success.`);

    res.status(200).json(responseGo);
  } catch (err) {
    const resRequiredFieldCheck = {
      ...metaDataInit,
      success: false,
      message: "Something wrong.",
      error: err.message,
    };

    logger.info(
      "[" + loggerId + `] [${activity}] Something wrong: ${err.message}`
    );

    res.status(400).json(resRequiredFieldCheck);
  }
};

const createProject = async (req, res) => {
  const loggerId = uuidv4();

  const activity = "Create Project";

  const metaDataInit = {
    timestamp: Math.floor(Date.now() / 1000),
  };

  try {
    const data = {
      metadata: {
        timeInsert: DateTime.now(),
        timeUpdate: DateTime.now(),
      },
      uuid: uuidv4(),
      ...req.body,
    };

    const insProject = await Project.create(data);

    if (!insProject) {
      logger.info("[" + loggerId + `] [${activity}] Insert project failed.`);

      const resRequiredFieldCheck = {
        ...metaDataInit,
        success: false,
        message: "Insert project failed.",
      };

      return res.status(403).json(resRequiredFieldCheck);
    }

    const responseGo = {
      ...metaDataInit,
      success: true,
      message: "Insert project success.",
      data: insProject,
    };

    logger.info("[" + loggerId + `] [${activity}] Insert project success.`);

    res.status(200).json(responseGo);
  } catch (err) {
    const resRequiredFieldCheck = {
      ...metaDataInit,
      success: false,
      message: "Something wrong.",
      error: err.message,
    };

    logger.info(
      "[" + loggerId + `] [${activity}] Something wrong: ${err.message}`
    );

    res.status(400).json(resRequiredFieldCheck);
  }
};

const listProject = async (req, res) => {
  const loggerId = uuidv4();

  const activity = "List Project";

  const metaDataInit = {
    timestamp: Math.floor(Date.now() / 1000),
  };

  try {
    const listProject = await Project.find().lean();

    if (!listProject) {
      logger.info("[" + loggerId + `] [${activity}] Show project failed.`);

      const resRequiredFieldCheck = {
        ...metaDataInit,
        success: false,
        message: "Show project failed.",
      };

      return res.status(403).json(resRequiredFieldCheck);
    }

    const responseGo = {
      ...metaDataInit,
      success: true,
      message: "Show project success.",
      data: listProject,
    };

    logger.info("[" + loggerId + `] [${activity}] Show project success.`);

    res.status(200).json(responseGo);
  } catch (err) {
    const resRequiredFieldCheck = {
      ...metaDataInit,
      success: false,
      message: "Something wrong.",
      error: err.message,
    };

    logger.info(
      "[" + loggerId + `] [${activity}] Something wrong: ${err.message}`
    );

    res.status(400).json(resRequiredFieldCheck);
  }
};

module.exports = {
  createEvent,
  editEvent,
  deleteEvent,
  listEvent,
  detailEvent,
  createProject,
  listProject,
};

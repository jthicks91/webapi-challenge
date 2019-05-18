const express = require("express");
const router = express.Router();
const projectModel = require("../data/helpers/projectModel");

router.get("/", (req, res) => {
  projectModel
    .get()
    .then(projects => res.status(200).json(projects))
    .catch(err =>
      res.status(500).json({
        error: "Information Cannot Be Retrieved From Server: We Suck."
      })
    );
});

router.get("/:id", async (req, res) => {
  try {
    const project = await projectModel.get(req.params.id);
    project
      ? res.status(200).json(project)
      : res
          .status(404)
          .json({ message: "No Project with that ID can be found" });
  } catch (err) {
    res.status(500).json({
      error:
        "The Project information could not be retrieved, we are beating our developers until this is fixed"
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const newProject = await projectModel.insert(req.body);
    const project = await projectModel.get(newProject.id);
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({
      error: "Could not add that project, it probably wasn't important anyway"
    });
  }
});

router.get("/:id/actions", async (req, res) => {
  try {
    const actions = await projectModel.getProjectActions(req.params.id);
    actions
      ? res.status(200).json(actions)
      : res.status(404).json({
          message: "Actions for that project number could not be found"
        });
  } catch (err) {
    res
      .status(500)
      .json({ error: "The actions information could not be retrieved." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const count = await projectModel.remove(req.params.id);
    count
      ? res
          .status(200)
          .json({ message: "The project was deleted.", id: `${req.params.id}` })
      : res.status(404).json({
          message:
            "a user with that ID could not be found. Call the Police and warn his next of kin"
        });
  } catch (err) {
    res.status(500).json({ error: "could not complete the request" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const count = await projectModel.update(req.params.id, req.body);
    if (count) {
      const project = await projectModel.get(req.params.id);
      res.status(200).json(project);
    } else {
      res
        .status(404)
        .json({ message: "a project with that ID could not be found" });
    }
  } catch (err) {
    res.status(500).json({ error: "the project could not be updated" });
  }
});

//export
module.exports = router;

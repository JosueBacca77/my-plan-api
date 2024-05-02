"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const muscularGroupsRoutes = express.Router();
muscularGroupsRoutes
    .route("/")
    .get(getAllMuscularGroups)
    .post((0, celebrate_1.celebrate)({ body: newMuscularGroupSchema }), postMUscularGroup);
muscularGroupsRoutes
    .route("/:id")
    .get(getMuscularGroup)
    .patch(patchMuscularGroup)
    .delete(deleteMuscularGroup);
exports.default = muscularGroupsRoutes;

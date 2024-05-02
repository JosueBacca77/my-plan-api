import { celebrate } from "celebrate";

const muscularGroupsRoutes = express.Router();

muscularGroupsRoutes
  .route("/")
  .get(getAllMuscularGroups)
  .post(celebrate({ body: newMuscularGroupSchema }), postMUscularGroup);

muscularGroupsRoutes
  .route("/:id")
  .get(getMuscularGroup)
  .patch(patchMuscularGroup)
  .delete(deleteMuscularGroup);

export default muscularGroupsRoutes;

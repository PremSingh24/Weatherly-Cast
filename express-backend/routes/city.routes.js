import { Router } from "express";
import authenticateJwt from "../middleware/auth.js";
import {
  getFavCityHandler,
  addCityToFavouriteHandler,
  removeCityFromFavouriteHandler,
} from "../controllers/city.controller.js";

const router = Router();

router.route("/add").post(authenticateJwt, addCityToFavouriteHandler);
router.route("/get").get(authenticateJwt, getFavCityHandler);
router.route("/remove").post(authenticateJwt, removeCityFromFavouriteHandler);

export default router;

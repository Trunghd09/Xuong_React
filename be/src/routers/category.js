import { Router } from "express";
import {
  create,
  deleteCategoryById,
  getAll,
  getCategoryById,
  updateCategoryById,
} from "../controllers/category";

const router = Router();
router.get("/category", getAll);
router.get("/category/:id", getCategoryById);
router.delete("/category/:id", deleteCategoryById);
router.put("/category/:id", updateCategoryById);
router.post("/category", create);
export default router;

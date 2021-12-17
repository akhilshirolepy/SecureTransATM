import { Router } from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getAccountDetails,
  createAccountRequest,
  approveCreateAccountRequest,
} from "../controllers/accountController.js";

const router = Router();

router
  .get("/:userId", protect, getAccountDetails)
  .post("/", protect, createAccountRequest)
  .put("/:id", protect, approveCreateAccountRequest);

export default router;

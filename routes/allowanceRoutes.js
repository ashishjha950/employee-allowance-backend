import express from "express";
import { createRequest, getRequests, updateRequestStatus, deleteRequest } from "../controllers/allowanceController.js";

const router = express.Router();

router.get("/", getRequests);
router.post("/", createRequest);
router.put("/:id", updateRequestStatus);
router.delete("/:id", deleteRequest);

export default router;

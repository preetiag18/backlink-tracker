import { Router } from "express";
import { getBackLinks, addBackLink } from "../controller/backLinkController";

const router = Router();

router.get("/", getBackLinks);
router.post("/addNew", addBackLink);

export { router as backLinkRouter };

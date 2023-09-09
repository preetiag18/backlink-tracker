import { model, Schema } from "mongoose";
import { BackLink } from "./types/backlink";

const backLinkSchema = new Schema<BackLink>({
  name: { type: String, required: true },
  dr: { type: String, required: true },
  email: { type: String, required: true },
  price: { type: String, required: true },
  linkUrl: { type: String, required: true },
  anchorText: { type: String, required: true },
  targetUrl: { type: String, required: true },
  added: { type: String, required: true },
  status: { type: String, required: false },
});

const BackLinkModel = model<BackLink>("backlink", backLinkSchema);

export default BackLinkModel;

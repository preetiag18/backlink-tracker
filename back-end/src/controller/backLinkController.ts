import { RequestHandler } from "express";
import { createSuccessMessage } from "../utils/message";
import { StatusCode_Success } from "../utils/statusCode";
import BackLinkModel from "../model/BackLinkModel";
import { getLinkStatus } from "../utils/linkUtils";
import { Request } from "express";
import { BackLink } from "../model/types/backlink";

export const getBackLinks: RequestHandler = async (req, res, next) => {
  try {
    const backLinkList = await BackLinkModel.find();
    return createSuccessMessage(
      { msg: "success", status: StatusCode_Success.REQUEST_CREATED },
      res,
      backLinkList,
    );
  } catch (error) {
    next(error);
  }
};

export const addBackLink: RequestHandler = async (
  req: Request<{}, {}, BackLink>,
  res,
  next,
) => {
  try {
    const currentDate = new Date().toISOString().slice(0, 10);
    const linkStatus = await getLinkStatus(
      req.body.linkUrl,
      req.body.targetUrl,
      req.body.anchorText,
    );
    const newBackLink = new BackLinkModel({
      ...req.body,
      added: currentDate,
      status: linkStatus,
    });
    await newBackLink.save();
    return createSuccessMessage(
      { msg: "success", status: StatusCode_Success.REQUEST_CREATED_NO_CONTENT },
      res,
    );
  } catch (error) {
    next(error);
  }
};

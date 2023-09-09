import BackLinkModel from "../model/BackLinkModel";
import { BackLink } from "../model/types/backlink";
import { getLinkStatus } from "../utils/linkUtils";

export const updateBackLinkStatusInDb = async (
  backLink: BackLink,
  newStatus: string,
) => {
  try {
    if (backLink._id) {
      await BackLinkModel.updateOne(
        { _id: backLink._id },
        { $set: { status: newStatus } },
      );
    } else {
      throw Error("Missing backlink id during DB update");
    }
  } catch (error: any) {
    console.log(error.message);
  }
};

export const updateLinkStatus = async () => {
  try {
    const backLinks = await BackLinkModel.find();
    for (const backLink of backLinks) {
      console.log(
        "checking status of " + backLink.targetUrl + " on " + backLink.linkUrl,
      );
      const newStatus = await getLinkStatus(
        backLink.linkUrl,
        backLink.targetUrl,
        backLink.anchorText,
      );
      console.log(
        "updating status as " +
          newStatus +
          " for " +
          backLink.targetUrl +
          " on " +
          backLink.linkUrl,
      );
      await updateBackLinkStatusInDb(backLink, newStatus);
    }
  } catch (error: any) {
    console.error(error.message);
  }
};

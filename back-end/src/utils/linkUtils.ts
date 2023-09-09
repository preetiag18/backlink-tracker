import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

export const getLinkStatus = async (
  linkUrl: string,
  targetUrl: string,
  anchorText: string,
): Promise<string> => {
  try {
    const browser = await puppeteer.launch({
      headless: "new",
      executablePath: '/usr/bin/google-chrome',
      args: [
          "--no-sandbox",
          "--disable-gpu",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-accelerated-2d-canvas",
          "--no-first-run",
          "--no-zygote",
          "--single-process"
      ]
    });
    const page = await browser.newPage();
    await page.goto(linkUrl, {waitUntil: 'domcontentloaded'})
    await new Promise(r => setTimeout(r, 3000));
    const domContent = await page.content();
    await browser.close();

    const api = cheerio.load(domContent);
    const matchingA = api(`a[href="${targetUrl}"]`).filter(
      (_i, elem) => api(elem).text() === anchorText,
    );
    if (matchingA.length > 0) {
      return "active";
    } else {
      return "inactive";
    }
  } catch (error: any) {
    console.log(error.message);
    return "inactive";
  }
}
import "expect-puppeteer";
import * as utils from "@zappar/jest-console-logs";

import { toMatchImageSnapshot } from "jest-image-snapshot";
// eslint-disable-next-line @typescript-eslint/no-var-requires

expect.extend({ toMatchImageSnapshot });

jest.setTimeout(600000);

const testName = "billboard_jest";

const test = (url: string, description: string) => {
  describe(`${description}`, () => {
    it("billboard faces camera", async () => {
      const page = await browser.newPage();
      page.goto(url, { timeout: 0 });
      await utils.expectLogs({
        expected: [
          /Zappar JS v\d*.\d*.\d*/,
          /Zappar CV v\d*.\d*.\d*/,
          "[Zappar] INFO html_element_source_t initialized",
          "[Zappar] INFO camera_source_t initialized",
          "[Zappar] INFO pipeline_t initialized",
          "[Zappar] INFO image_tracker_t initialized",
          "[Zappar] INFO loading target from memory: 236297 bytes",
          "[Zappar] INFO image target loaded",
          "Anchor is visible",
        ],
        page,
        timeoutMs: 120000,
      });

      const screenshot = await page.screenshot();
      expect(screenshot).toMatchImageSnapshot({
        customDiffConfig: {
          threshold: 0.02,
        },
        failureThreshold: 0.02,
        failureThresholdType: "percent",
      });
      // Avoid premature exit
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await page.close();
    });
  });
};

test(`https://127.0.0.1:8085/${testName}.html`, `module ${testName}`);

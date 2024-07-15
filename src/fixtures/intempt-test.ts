import { test as base } from "@playwright/test";
import { attachScreenshotOnFailure } from "../hooks/screenshotHook";
import { JourneyPage } from "../pages/JourneyPage";

type Pages = {
    journeyPage: JourneyPage
};

export const test = base.extend<Pages>({
    journeyPage: async ({ page, baseURL }, use) => {
        const journeyPage = new JourneyPage(page, baseURL);
        await journeyPage.navigate();
        await use(journeyPage);
    }
});

test.afterEach(attachScreenshotOnFailure);
export { expect } from "@playwright/test";

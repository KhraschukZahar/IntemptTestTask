import { randomUUID } from 'crypto';
import { BasePage } from '../pages/BasePage';
import { Page } from 'playwright';

export const attachScreenshotOnFailure = async ({ page }, testInfo: any) => {
  if (testInfo.status !== testInfo.expectedStatus || testInfo.status === 'skipped') {
    let screenshotPath = `test-results/screenshots/screenshot-${randomUUID()}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });
    testInfo.annotations.push({ type: 'testrail_attachment', description: screenshotPath });
  }
};

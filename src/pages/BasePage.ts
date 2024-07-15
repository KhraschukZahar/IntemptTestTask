import { Page } from "playwright";
import { expect } from "playwright/test";

const LOADING_ICON = `div.dx-loadindicator-icon`;
const PENDING_ICON = `i.dx-icon-clock.pending-icon`;

export class BasePage {

  constructor(readonly page: Page) {
  }

  async close() {
    this.page.close;
  }
  async getPage(): Promise<Page> {
    return this.page;
  }
  async setZoomLevel(zoomLevel: number) {
    await this.page.evaluate(`document.body.style.zoom=${zoomLevel}`);
  }

  async doWait(milis: number) {
    await this.page.waitForTimeout(milis);
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }


}

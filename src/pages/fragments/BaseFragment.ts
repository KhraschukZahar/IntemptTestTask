import { Page, Locator } from "playwright";
import { expect } from "playwright/test";

export class BaseFragment {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}

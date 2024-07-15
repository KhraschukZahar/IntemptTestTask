import { Page } from "playwright";
import { BasePage } from "./BasePage";
import { readFileSync } from "fs";


const CREATE_JOURNEY = `//p[contains(text(), ' Create journey ')]`;
const SELECT_JOURNEY = `//div[@class="fromScratch"]//p[text() =' Create a journey ']`
const INPUT_JOURNEY = `input[placeholder="Enter journey name here"]`;
const CONFIRMATION_BUTTON = `//div[contains(@class, 'footer')]//p[contains(text(), 'Create journey')]`;
const TOOL_BAR_ITEMS = `//div[@class="v-toolbar__content"]//p`;
// const SEND_EMAIL_ACTION = "(//div[@class='transformersDrawer__body__transformerType']/p[contains(text(), 'Actions')]/parent::div)//div[@class='transformersDrawer__body__transformerType__transformer'][1]";
// const SEND_EMAIL_ACTION2 = "(//div[@class='transformersDrawer__body__transformerType']/p[contains(text(), 'Actions')]/parent::div)//div[@class='transformersDrawer__body__transformerType__transformer'][2]";

//const CANVAS_JOURNEY = '//div[@class="align-stretch d-flex flex-nowrap flex-row justify-start"]';
const CANVAS_JOURNEY = "//div[@class='x6-graph-scroller-content']"

export class JourneyPage extends BasePage {
    public readonly BASE_URL: string | undefined;
    constructor(page: Page, baseUrl: string | undefined) {
        super(page);
        this.BASE_URL = baseUrl;
    }
    async navigate() {
        await this.navigateTo(`https://${this.BASE_URL}/journeys`);
        await this.page.click(CREATE_JOURNEY);
        await this.page.click(SELECT_JOURNEY);
    }
    async createJourney(name: string) {
        const inputJourney = this.page.locator(INPUT_JOURNEY);
        await inputJourney.fill(name);
        await this.page.click(CONFIRMATION_BUTTON);
    }
    async isToolBarJourneyEquals(name: string): Promise<boolean> {
        try {
            const element = await this.page.locator(TOOL_BAR_ITEMS).first();
            if (!element) {
                throw new Error('Element not found');
            }

            const textContent = await element.textContent();
            return textContent !== null && textContent.trim() === name.trim();
        } catch (error) {
            console.error('Error in isToolBarJourneyEquals:', error);
            return false; // Return false if there's an error
        }
    }

    //     async dragAndDropSendEmailActionToCanvas() {
    //     await this.page.locator(SEND_EMAIL_ACTION).dragTo(this.page.locator(CANVAS_JOURNEY));
    // }
    
    async dragAndDropSendEmailActionToCanvas() {
        const sendEmail = this.page.locator(SEND_EMAIL_ACTION);
        const sendEmail2 = this.page.locator(SEND_EMAIL_ACTION2);

        const canvas = this.page.locator(CANVAS_JOURNEY);

        // await this.page.locator(CANVAS_JOURNEY).hover();
        // await this.page.mouse.up();
        // await this.page.dp
        // await this.page.locator(SEND_EMAIL_ACTION).hover();
        //await sendEmail.dragTo(canvas)
        await sendEmail.hover();
        await this.page.mouse.down()
        await sendEmail2.hover()
        await this.doWait(5000)
       // await sendEmail.dragTo(canvas)
       
        await this.doWait(3000)



        // const sendEmailBox = await sendEmail.boundingBox();
        // const canvasBox = await canvas.boundingBox();

        // if (sendEmailBox && canvasBox) {
        //     //Calculate start and end points for the drag operation
        //     const startX = sendEmailBox.x + sendEmailBox.width / 2;
        //     const startY = sendEmailBox.y + sendEmailBox.height / 2;
        //     const endX = canvasBox.x + canvasBox.width / 3;
        //     const endY = canvasBox.y + canvasBox.height / 3;

        //     //Perform the drag and drop simulation using mouse actions
        //     // await this.page.mouse.move(startX, startY,{ steps: 5 });
        //     // await this.page.mouse.move(startX, startY,{ steps: 5 });
        //     await this.page.locator(SEND_EMAIL_ACTION).hover();
        //     await this.page.mouse.down();
        //     await this.page.mouse.move(endX, endY,{ steps: 5 });
        //     await this.page.mouse.move(endX, endY,{ steps: 5 });
        //     await this.page.mouse.up();
        //     await this.doWait(2000)
        // } else {
        //     throw new Error('Unable to perform drag and drop: Element bounding boxes not found.');
        // }
    }

}    
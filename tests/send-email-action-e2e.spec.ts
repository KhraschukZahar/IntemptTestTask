import { test, expect } from "../src/fixtures/intempt-test";
import { randomUUID } from 'crypto';

test.describe('Deleting "Send email" Action in Journeys', () => {
    test('Delete "Send email" Action from canvas', async ({ journeyPage }) => {
        const RANDOM_UUID = randomUUID();
        await journeyPage.createJourney(RANDOM_UUID);
        await journeyPage.doWait(3000);
        expect(await journeyPage.isToolBarJourneyEquals(RANDOM_UUID), `Tool bar name isn't the same as creation`).toBe(true);
        await journeyPage.dragAndDropSendEmailActionToCanvas();
    });
});

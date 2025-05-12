import express from 'express';
import bodyParser from 'body-parser';
import EVENTS from './events.js';
import { register, unregister, triggerEvent } from './webhookManager.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.js';

const app = express();
app.use(bodyParser.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


/**
 * @openapi
 * /webhooks/register:
 *   post:
 *     summary: Register a new webhook
 *     description: Register a new webhook for a specific event.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: The URL to send the webhook to.
 *               event:
 *                 type: string
 *                 description: The event to trigger the webhook for.
 *     responses:
 *       201:
 *         description: Webhook registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the registered webhook.
 *       400:
 *         description: Bad request. URL and event are required.
 *       500:
 *         description: Internal server error.
 */
app.post('/webhooks/register', async (req, res) => {
    const { url, event } = req.body;
    if (!url || !event) {
        return res.status(400).json({ error: 'URL and event are required' });
    }
    
    try {
        const id = await register(url, event);
        res.status(201).json({ id });
    } catch (error) {
        console.error('Error registering webhook:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    }
);


/**
 * @openapi
 * /webhooks/unregister:
 *   post:
 *     summary: Unregister a webhook URL for an event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *               event:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully unregistered
 *       500:
 *         description: Internal server error
 */
app.post('/webhooks/unregister', async (req, res) => {
    const { url, event } = req.body;
  try {
    await unregister(url, event);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @openapi
 * /ping:
 *   post:
 *     summary: Trigger a test webhook event (invoice.paid)
 *     responses:
 *       200:
 *         description: Webhooks triggered
 */
app.post('/ping', async (req, res) => {
    try {
      const notified = await triggerEvent("invoice.paid", { test: "ping - Great succes" });
      res.json({ success: true, notified });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

/**
 * @openapi
 * /simulate/{event}:
 *   post:
 *     summary: Simulate a webhook event
 *     description: Simulate triggering a specific webhook event with custom data.
 *     parameters:
 *       - in: path
 *         name: event
 *         required: true
 *         schema:
 *           type: string
 *         description: The event to simulate.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: The data to send with the simulated event.
 *             example:
 *               key: value
 *     responses:
 *       200:
 *         description: Event successfully triggered.
 *       400:
 *         description: Invalid event specified.
 *       500:
 *         description: Internal server error.

 */
app.post('/simulate/:event', async (req, res) => {
    const { event } = req.params;
    if (!EVENTS.includes(event)) {
        return res.status(400).json({ error: 'Invalid event' });
    }
    const data = req.body;
    try {
        await triggerEvent(event, data);
        res.json({ success: true });
    } catch (error) {
        console.error('Error triggering event:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
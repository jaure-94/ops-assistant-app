import type { Request, Response } from 'express';

export const getLandingPage = (req: Request, res: Response) => {
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Ops Assistant API | Mission Control</title>
        <style>
            body { font-family: sans-serif; line-height: 1.6; max-width: 800px; margin: 40px auto; padding: 20px; background: #f4f7f9; color: #333; }
            .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            code { background: #2d2d2d; color: #f8f8f2; padding: 15px; border-radius: 5px; display: block; overflow-x: auto; margin: 10px 0; }
            h1 { color: #0070f3; }
            .tag { background: #0070f3; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.8em; }
        </style>
    </head>
    <body>
        <div class="card">
            <h1>🤖 Automated Ops Assistant API</h1>
            <p>The system is <strong>Live</strong>. Use the endpoints below to test the Triage and Reporting engine via a tool like Postman.</p>
            <h3>1. Create a Ticket <span class="tag">POST</span></h3>
            <code>POST /tickets</code>
            <h3>2. Daily Report <span class="tag">GET</span></h3>
            <code>GET /reports</code>
            <h3>3. Knowledge Base <span class="tag">POST</span></h3>
            <code>POST /kb</code>
            <hr>
            <p>View the <a href="https://github.com/jaure-94/ops-assistant-app">Full Documentation on GitHub</a>.</p>
        </div>
    </body>
    </html>
  `);
};
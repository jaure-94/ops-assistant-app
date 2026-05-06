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
        <h1>🤖 Automated Ops Assistant API</h1>
        <p>The API is live. Please test it using Swagger at the endpoint below:</p>
        <p><a href="https://ops-assistant-app.onrender.com/api-docs/">https://ops-assistant-app.onrender.com/api-docs/</a></p>
        <p>If you want to explore endpoints manually, open the Swagger UI and use the interactive docs there.</p>
    </body>
    </html>
  `);
};
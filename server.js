import express from 'express';
import { handler as ssrHandler } from './dist/server/entry.mjs';

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static assets from the client build directory
// These are files like images, fonts, and client-side JS/CSS
app.use(express.static('dist/client'));

// Security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    next();
});

// Use the Astro SSR handler
// This handles all the dynamic pages and API routes
app.use((req, res, next) => {
    const locals = {
        // Pass any local variables to Astro here
    };
    ssrHandler(req, res, next, locals);
});

app.listen(PORT, () => {
    console.log(`RG Detailing Server running on port ${PORT}`);
});

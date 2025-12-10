// api/gemini.js  (Vercel / Serverless)
export default async function handler(req, res) {
    if (req.method === "OPTIONS") {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
      res.status(204).end();
      return;
    }
  
    try {
      const apiKey = process.env.GEMINI_KEY;
      if (!apiKey) return res.status(500).json({ error: "Missing GEMINI_KEY" });
  
      const resp = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(req.body),
        }
      );
  
      const data = await resp.json();
      res.status(resp.status || 200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Proxy failed", details: String(err) });
    }
  }
  
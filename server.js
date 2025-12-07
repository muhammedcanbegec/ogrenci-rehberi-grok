const express = require("express");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get("/api/cevap", async (req, res) => {
  const soru = req.query.soru;
  if (!soru) return res.json({ cevap: "Lütfen bir soru yazın." });

  try {
    const resp = await fetch("https://api.x.ai/v1/grok3/chat", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROK_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ model: "grok-3", prompt: soru })
    });

    const json = await resp.json();
    res.json({ cevap: json.choices[0].text });
  } catch {
    res.json({ cevap: "AI ile bağlantı kurulamadı." });
  }
});

app.listen(PORT, () => console.log(`Sunucu çalışıyor: http://localhost:${PORT}`));

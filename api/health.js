// Caso você queira adicionar mais endpoints no futuro
// api/health.js
export default function handler(req, res) {
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'ViewPage Browser AI API'
    });
  }
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token gerekli" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // payload: { userId, role, iat, exp }
        // normalize ederek tek bir isim kullanalım:
        req.user = { id: decoded.userId, role: decoded.role };
        next();
    } catch (err) {
        return res.status(403).json({ message: "Geçersiz token" });
    }
}

module.exports = { authMiddleware };
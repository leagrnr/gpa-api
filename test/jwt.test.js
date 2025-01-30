const jwt = require("jsonwebtoken");

describe("JWT Tests", () => {
  const secretKey = "your-secret-key";
  const payload = { id: 1, username: "testuser" };

  it("should generate a valid JWT", () => {
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
    expect(token).toBeDefined();
  });

  it("should verify a valid JWT", () => {
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
    const decoded = jwt.verify(token, secretKey);
    expect(decoded).toMatchObject(payload);
  });

  it("should fail to verify an invalid JWT", () => {
    const invalidToken = "invalid.token.here";
    expect(() => jwt.verify(invalidToken, secretKey)).toThrow();
  });
});

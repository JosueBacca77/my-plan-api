const crypto = require("crypto");

/**
 * Generates a random token and its hashed version.
 *
 * @return {Object} An object containing the token and its hashed version.
 */
export const generateToken = () => {
  const token = crypto.randomBytes(32).toString("hex");

  //We shouldn't save this plain text token in DB
  //hash the token
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  return {
    token,
    hashedToken,
  };
};

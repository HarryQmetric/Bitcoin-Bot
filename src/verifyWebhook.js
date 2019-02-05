function verifyWebhook (body) {
  if (!body || body.token !== "3FIjjMTBXUYXOQio6CYYxK3TN4bKE8XVAsBUGWbV-Rk=") {
    const error = new Error('Invalid credentials');
    error.code = 401;
    throw error;
  }
}

module.exports = verifyWebhook;
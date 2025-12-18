const bcrypt = require("bcryptjs");

(async () => {
  const plainPassword = "Admin@123";
  const saltRounds = 10;

  const hash = await bcrypt.hash(plainPassword, saltRounds);
  console.log(hash);
})();

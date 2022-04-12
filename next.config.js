const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        APP_URL: "http://localhost:3000",
      },
    };
  }

  return {
    env: {
      APP_URL: "nextjs-inventory-manager-mfdb1p0ep-ibrahimg88.vercel.app",
    },
  };
};

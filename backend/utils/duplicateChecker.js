// ✅ 4️⃣ DUPLICATE ISSUE DETECTION (SMART AI)
// 🧠 What this means (baby version)

// If someone reports:

// same category

// very near location

// System says:

// “This issue already exists nearby.”

// That avoids spam.

// 🎯 Logic we use

// Same category

// Latitude & longitude within ~100 meters

// 🧩 Step 1: Create duplicate check file

// Create:

// backend/utils/duplicateChecker.js


// Paste this 👇


const Issue = require("../models/Issue");

async function checkDuplicate(category, latitude, longitude) {
  const nearbyIssue = await Issue.findOne({
    category,
    "location.latitude": {
      $gte: latitude - 0.001,
      $lte: latitude + 0.001,
    },
    "location.longitude": {
      $gte: longitude - 0.001,
      $lte: longitude + 0.001,
    },
  });

  return nearbyIssue;
}

module.exports = checkDuplicate;


// 🧩 Step 2: Use it when creating issue

// In issueController.js
// At the top:

// const checkDuplicate = require("../utils/duplicateChecker");


// Inside createIssue function, before saving:

// const duplicate = await checkDuplicate(
//   category,
//   latitude,
//   longitude
// );

// if (duplicate) {
//   return res.status(409).json({
//     message: "Similar issue already reported nearby",
//   });
// }


// That’s it. 🔥
// 🎯 Goal

// User writes description → AI predicts category
// Even if user selects wrong category.

// 📁 Step 1: Create AI file

// Create:

// backend/utils/aiCategorizer.js

// 📌 Step 2: Paste this code (FINAL)


function predictCategory(text) {
  const t = text.toLowerCase();

  if (t.includes("pothole") || t.includes("road") || t.includes("crack"))
    return "Road";

  if (t.includes("garbage") || t.includes("trash") || t.includes("waste"))
    return "Garbage";

  if (t.includes("water") || t.includes("leak") || t.includes("pipe"))
    return "Water";

  if (t.includes("light") || t.includes("electric") || t.includes("power"))
    return "Electricity";

  return "Other";
}

module.exports = predictCategory;




// 📌 Step 3: Use it while creating issue

// In issueController.js:

// const predictCategory = require("../utils/aiCategorizer");

// const aiCategory = predictCategory(description);


// Then save:

// category: aiCategory,



// Got it 👍 I’ll only tell you where to put the new lines, not rewrite everything.

// 1️⃣ At the top of issueController.js

// Right below this line:

// const Issue = require("../models/Issue");


// 👉 Add this line:

// const predictCategory = require("../utils/aiCategorizer");

// 2️⃣ Inside createIssue function

// Find this line inside try:

// const { title, description, category, latitude, longitude, imageUrl } = req.body;


// 👉 Immediately BELOW it, add:

// const aiCategory = predictCategory(description);

// 3️⃣ When creating the issue

// Find the Issue.create({ ... }) block and locate:

// category,


// 👉 REPLACE that line with:

// category: aiCategory,
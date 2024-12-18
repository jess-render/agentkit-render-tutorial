import "dotenv/config";

import { searchHackerNews } from "./lib/searchHackerNews";
import {
  connectToDatabase,
  storeStories,
  disconnectFromDatabase,
  getInterests,
} from "./lib/db";

async function main() {
  try {
    // Connect to the database
    await connectToDatabase();

    // Get all interests from the database
    const interests = await getInterests();

    // Search and store stories for each interest
    for (const interest of interests) {
      // Search for stories
      const results = await searchHackerNews(interest.name);

      // Store stories in the database
      await storeStories(results);

      console.info(
        `Successfully processed ${results.length} stories for interest: ${interest.name}`
      );
    }

    await disconnectFromDatabase();
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main();

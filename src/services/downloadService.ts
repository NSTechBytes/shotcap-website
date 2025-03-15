
import { createClient } from '@libsql/client';

// Get environment variables with fallbacks for development
const TURSO_DATABASE_URL = import.meta.env.VITE_TURSO_DATABASE_URL || "libsql://ng-nasir.turso.io";
const TURSO_AUTH_TOKEN = import.meta.env.VITE_TURSO_AUTH_TOKEN || "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NDIwNDg0NTksImlkIjoiZjgyNmFhMDctYjA4OC00NDQ0LWFkNDAtY2I5ZDIwNDA5YjVmIn0.hctzk_dRMdn93UOJQBjeSfMnF7H2wGC2QAjMrS4YR_etLlSLE0GAkvKFW2ZUhZXY_u2jhmJLV38wgebdZcCNAw";

const db = createClient({
  url: TURSO_DATABASE_URL,
  authToken: TURSO_AUTH_TOKEN,
});

const APP_NAME = "shot_cap";

export async function getTotalDownloads(): Promise<number> {
  try {
    const result = await db.execute({
      sql: "SELECT download_count FROM total_downloads WHERE app_name = ?",
      args: [APP_NAME]
    });
    
    if (result.rows.length > 0) {
      return result.rows[0].download_count as number;
    }
    return 0;
  } catch (error) {
    console.error("Error retrieving download count:", error);
    return 12548; // Fallback default value
  }
}

export async function incrementDownloadCount(): Promise<number> {
  try {
    await db.execute({
      sql: "UPDATE total_downloads SET download_count = download_count + 1 WHERE app_name = ?",
      args: [APP_NAME]
    });
    
    // Get and return the updated count
    return await getTotalDownloads();
  } catch (error) {
    console.error("Error incrementing download count:", error);
    return 12548; // Fallback default value
  }
}

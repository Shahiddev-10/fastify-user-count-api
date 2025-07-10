const http = require("http");

const API_BASE_URL = "http://localhost:6776";

function makeRequest(url, method = "GET") {
  return new Promise((resolve, reject) => {
    const req = http.request(url, { method }, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const parsedData = JSON.parse(data);
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: parsedData,
          });
        } catch (error) {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: data,
          });
        }
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.end();
  });
}

async function testHealthEndpoint() {
  console.log("🔍 Testing Health Check Endpoint...");

  try {
    const response = await makeRequest(`${API_BASE_URL}/`);

    if (response.statusCode === 200) {
      console.log("✅ Health check passed");
      console.log("   Response:", JSON.stringify(response.data, null, 2));
      return true;
    } else {
      console.log("❌ Health check failed");
      console.log("   Status Code:", response.statusCode);
      console.log("   Response:", response.data);
      return false;
    }
  } catch (error) {
    console.log("❌ Health check failed with error:", error.message);
    return false;
  }
}

async function testUserCountEndpoint() {
  console.log("🔍 Testing User Count Endpoint...");

  try {
    const response = await makeRequest(`${API_BASE_URL}/api/usercount`);

    if (response.statusCode === 200) {
      console.log("✅ User count endpoint passed");
      console.log("   Response:", JSON.stringify(response.data, null, 2));

      if (response.data && typeof response.data.totalUsers === "number") {
        console.log("✅ Response structure is valid");
        console.log(`   Total users in database: ${response.data.totalUsers}`);
        return true;
      } else {
        console.log("❌ Invalid response structure");
        return false;
      }
    } else {
      console.log("❌ User count endpoint failed");
      console.log("   Status Code:", response.statusCode);
      console.log("   Response:", response.data);
      return false;
    }
  } catch (error) {
    console.log("❌ User count endpoint failed with error:", error.message);
    return false;
  }
}

async function testInvalidEndpoint() {
  console.log("🔍 Testing Invalid Endpoint (404 handling)...");

  try {
    const response = await makeRequest(`${API_BASE_URL}/api/invalid`);

    if (response.statusCode === 404) {
      console.log("✅ 404 handling works correctly");
      return true;
    } else {
      console.log("❌ Expected 404 but got:", response.statusCode);
      return false;
    }
  } catch (error) {
    console.log("❌ Invalid endpoint test failed with error:", error.message);
    return false;
  }
}

async function runTests() {
  console.log("🧪 Starting API Tests for Fastify User Count API\n");
  console.log("🔗 Testing server at:", API_BASE_URL);
  console.log("📅 Test started at:", new Date().toISOString());
  console.log("=".repeat(60));

  const results = [];

  console.log("⏳ Waiting for server to be ready...\n");
  await new Promise((resolve) => setTimeout(resolve, 1000));

  results.push(await testHealthEndpoint());
  console.log("");

  results.push(await testUserCountEndpoint());
  console.log("");

  results.push(await testInvalidEndpoint());
  console.log("");

  console.log("=".repeat(60));
  console.log("📊 Test Results Summary:");
  console.log("=".repeat(60));

  const passed = results.filter((r) => r).length;
  const total = results.length;
  const failed = total - passed;

  console.log(`✅ Passed: ${passed}/${total}`);
  console.log(`❌ Failed: ${failed}/${total}`);
  console.log(`📈 Success Rate: ${((passed / total) * 100).toFixed(1)}%`);

  if (passed === total) {
    console.log("\n🎉 All tests passed! Your API is working correctly.");
  } else {
    console.log(
      "\n⚠️  Some tests failed. Please check the server and database setup."
    );
    console.log("\nTroubleshooting tips:");
    console.log("• Make sure the server is running: npm start");
    console.log("• Make sure the database is set up: npm run setup-db");
    console.log("• Check if port 6776 is available");
  }

  console.log("\n📅 Test completed at:", new Date().toISOString());
}

async function checkServerStatus() {
  try {
    await makeRequest(`${API_BASE_URL}/`);
    return true;
  } catch (error) {
    return false;
  }
}

async function main() {
  const serverRunning = await checkServerStatus();

  if (!serverRunning) {
    console.log("❌ Server is not running at", API_BASE_URL);
    console.log("🚀 Please start the server first with: npm start");
    console.log("📋 Also ensure database is set up with: npm run setup-db");
    process.exit(1);
  }

  await runTests();
}

main().catch((error) => {
  console.error("💥 Test runner crashed:", error);
  process.exit(1);
});

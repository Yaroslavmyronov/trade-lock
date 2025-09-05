import type { NextConfig } from "next";
import fs from "fs";

function readSecret(secretName: string, fallbackEnv: string): string
{
  try
  {
    return fs.readFileSync(`/run/secrets/${secretName}`, "utf8").trim();
  }
  catch
  {
    return process.env[fallbackEnv] || "";
  }
}

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: readSecret("market_api_url", "API_URL"),
    NEXT_PUBLIC_WS_URL: readSecret("market_ws_url", "WS_URL"),
    NEXT_PUBLIC_MARKETPLACE_ADDRESS: readSecret("market_contract_address", "CONTRACT_ADDRESS"),
  },
};

export default nextConfig;

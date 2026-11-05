"use client";

import { useEffect } from "react";
import { CHAT_API_URL } from "@/lib/chat-api";

const HEALTH_CHECK_INTERVAL = 10 * 60 * 1000;

export default function BackendHealthCheck() {
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch(`${CHAT_API_URL}/health`, {
          cache: "no-store",
          signal: AbortSignal.timeout(60000),
        });

        if (!response.ok) {
          console.error(
            "Chat backend health check failed:",
            response.status,
            response.statusText,
          );
        }
      } catch (error) {
        console.error("Could not reach chat backend health endpoint:", error);
      }
    };

    void checkHealth();
    const intervalId = window.setInterval(() => {
      void checkHealth();
    }, HEALTH_CHECK_INTERVAL);

    return () => window.clearInterval(intervalId);
  }, []);

  return null;
}

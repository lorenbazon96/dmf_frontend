import { AxiosError } from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";
import api, { normalizeApiError } from "./index";

describe("API error handling", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it("normalizes server and network errors", () => {
    expect(normalizeApiError({ response: { status: 422, data: { error: "Invalid" } } })).toMatchObject({
      status: 422, userMessage: "Invalid", isApiError: true,
    });
    expect(normalizeApiError({ code: "ERR_NETWORK", message: "Network Error" }).userMessage)
      .toContain("poslužiteljem");
  });

  it("clears both auth stores and emits one session event on 401", async () => {
    localStorage.setItem("dmf_token", "local");
    sessionStorage.setItem("dmf_user", "user");
    const listener = vi.fn();
    window.addEventListener("dmf:session-expired", listener, { once: true });
    api.defaults.adapter = config => Promise.reject(new AxiosError(
      "Unauthorized", "ERR_BAD_REQUEST", config, null, { status: 401, data: {}, headers: {}, config },
    ));

    await expect(api.get("/private")).rejects.toMatchObject({ status: 401, isApiError: true });
    expect(localStorage.getItem("dmf_token")).toBeNull();
    expect(sessionStorage.getItem("dmf_user")).toBeNull();
    expect(listener).toHaveBeenCalledTimes(1);
  });
});

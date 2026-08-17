import { AxiosError } from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";
import api, { normalizeApiError } from "./index";
import i18n from "../i18n";

describe("API error handling", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    i18n.global.locale = "hr";
  });

  it("normalizes server and network errors", () => {
    expect(normalizeApiError({ response: { status: 422, data: { error: "Invalid" } } })).toMatchObject({
      status: 422, userMessage: "Uneseni podaci nisu ispravni.", isApiError: true,
    });
    expect(normalizeApiError({ code: "ERR_NETWORK", message: "Network Error" }).userMessage)
      .toContain("poslužiteljem");
  });

  it("localizes coded API errors using the active language", () => {
    const apiError = () => ({
      response: { status: 409, data: { error: "Insufficient available stock", code: "INSUFFICIENT_AVAILABLE_STOCK" } },
    });
    expect(normalizeApiError(apiError()).userMessage).toContain("skladištu");
    i18n.global.locale = "en";
    expect(normalizeApiError(apiError()).userMessage).toContain("warehouse");
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

  it("does not expire the session for a public login 401", async () => {
    localStorage.setItem("dmf_token", "existing");
    const listener = vi.fn();
    window.addEventListener("dmf:session-expired", listener);
    api.defaults.adapter = config => Promise.reject(new AxiosError(
      "Unauthorized", "ERR_BAD_REQUEST", config, null, { status: 401, data: {}, headers: {}, config },
    ));

    await expect(api.post("/auth/login", {}, { suppressGlobalError: true }))
      .rejects.toMatchObject({ status: 401, isApiError: true });
    expect(localStorage.getItem("dmf_token")).toBe("existing");
    expect(listener).not.toHaveBeenCalled();
    window.removeEventListener("dmf:session-expired", listener);
  });

  it("suppresses the global error event when the caller handles the error", async () => {
    const listener = vi.fn();
    window.addEventListener("dmf:api-error", listener);
    api.defaults.adapter = config => Promise.reject(new AxiosError(
      "Failed", "ERR_BAD_RESPONSE", config, null, { status: 500, data: {}, headers: {}, config },
    ));

    await expect(api.get("/private", { suppressGlobalError: true }))
      .rejects.toMatchObject({ status: 500, isApiError: true });
    expect(listener).not.toHaveBeenCalled();
    window.removeEventListener("dmf:api-error", listener);
  });
});

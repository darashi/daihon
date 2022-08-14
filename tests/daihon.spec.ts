import { test, expect } from "@playwright/test";

test("/ shows EMOTION100_001 at the first visit", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("EMOTION100_001 | daihon");

  await expect(page.locator(".badge")).toHaveText("EMOTION100_001");

  await expect(page.locator("p.text-2xl")).toHaveText("えっ嘘(うそ)でしょ。");
  await expect(page.locator("p.text-2xl > ruby > rp:first-child")).toHaveText(
    "("
  );
  await expect(page.locator("p.text-2xl > ruby > rp:last-child")).toHaveText(
    ")"
  );
  await expect(page.locator("p.text-2xl > ruby > rt")).toHaveText("うそ");

  await expect(page.locator("p.text-sm")).toHaveText("エッウソデショ。");

  const linkToCorpus = page.locator("p.italic a");
  await expect(linkToCorpus).toHaveText("ITAコーパス");
  await expect(linkToCorpus).toHaveAttribute(
    "href",
    "https://github.com/mmorise/ita-corpus"
  );
});

test("next button and prev button", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator(".badge")).toHaveText("EMOTION100_001");

  await page.locator("text=Next »").click();

  await expect(page.locator(".badge")).toHaveText("EMOTION100_002");

  await page.locator("text=« Prev").click();

  await expect(page.locator(".badge")).toHaveText("EMOTION100_001");
});

test("prev button does nothing on the first page", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator(".badge")).toHaveText("EMOTION100_001");

  await page.locator("text=« Prev").click();

  await expect(page.locator(".badge")).toHaveText("EMOTION100_001");
});

test("reload does not reset the cursor", async ({ page }) => {
  await page.goto("/");

  await page.locator("text=Next »").click();
  await page.locator("text=Next »").click();

  await expect(page.locator(".badge")).toHaveText("EMOTION100_003");

  await page.reload();

  await expect(page.locator(".badge")).toHaveText("EMOTION100_003");
});

test("jump to ROHAN4600 using dropdown menu", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator(".badge")).toHaveText("EMOTION100_001");

  await page.locator(".dropdown > .btn-square").click();
  await page.locator("text=ROHAN4600").click();

  await expect(page.locator(".badge")).toHaveText("ROHAN4600_0001");

  const linkToCorpus = page.locator("p.italic a");
  await expect(linkToCorpus).toHaveText("ROHAN4600");
  await expect(linkToCorpus).toHaveAttribute(
    "href",
    "https://github.com/mmorise/rohan4600"
  );
});

test("shortcut keys", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" }); // wait until handlers are set up

  await expect(page.locator(".badge")).toHaveText("EMOTION100_001");

  await page.keyboard.press("ArrowRight");

  await expect(page.locator(".badge")).toHaveText("EMOTION100_002");

  await page.keyboard.press("ArrowLeft");

  await expect(page.locator(".badge")).toHaveText("EMOTION100_001");
});

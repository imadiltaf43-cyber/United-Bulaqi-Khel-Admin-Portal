import test from "node:test";
import assert from "node:assert/strict";

import { normalizeJobPayload, normalizeApplicationPayload, normalizeEntityPayload } from "./careersPayload.js";

test("normalizes empty job response objects into an empty array", () => {
  const result = normalizeJobPayload({
    success: true,
    jobs: {},
    page: 1,
    pages: 0,
    total: 0,
  });

  assert.deepEqual(result.jobs, []);
  assert.equal(result.pages, 1);
  assert.equal(result.total, 0);
});

test("normalizes nested application payloads", () => {
  const result = normalizeApplicationPayload({
    success: true,
    data: {
      applications: [{ _id: "1", status: "Pending" }],
    },
  });

  assert.equal(result.applications.length, 1);
  assert.equal(result.applications[0].status, "Pending");
});

test("normalizes singular entity payloads", () => {
  const result = normalizeEntityPayload({
    success: true,
    data: {
      job: { _id: "job-1", title: "Designer" },
    },
  }, "job");

  assert.equal(result._id, "job-1");
  assert.equal(result.title, "Designer");
});

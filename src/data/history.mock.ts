import type { JobStatusResponse } from "@/api/types";

export const historyItems: JobStatusResponse[] = [
  {
    job_id: "job-1",
    status: "completed",
    input_type: "link",
    created_at: "2026-01-11T14:30:00Z",
    updated_at: "2026-01-11T14:31:00Z",
    completed_at: "2026-01-11T14:31:00Z",
    result: {
      scores: {
        source_reliability: 12,
        source_consistency: 8,
        anonymous_sources: 6,
        fact_verifiability: 10,
        logical_consistency: 7,
        emotional_language: 3,
        evidence_level: 9,
        title_body_consistency: 4,
        language_quality: 8,
        ad_spam: 1,
      },
      total_score: 68,
      risk_level: "medium",
      summary: "Example summary for a link analysis.",
      recommendations: ["Verify sources", "Cross-check facts", "Avoid sensational claims"],
    },
  },
  {
    job_id: "job-2",
    status: "completed",
    input_type: "image",
    created_at: "2026-01-12T09:10:00Z",
    updated_at: "2026-01-12T09:12:00Z",
    completed_at: "2026-01-12T09:12:00Z",
    result: {
      scores: {
        source_reliability: 10,
        source_consistency: 7,
        anonymous_sources: 5,
        fact_verifiability: 9,
        logical_consistency: 6,
        emotional_language: 2,
        evidence_level: 8,
        title_body_consistency: 3,
        language_quality: 7,
        ad_spam: 2,
      },
      total_score: 59,
      risk_level: "low",
      summary: "Example summary for an image analysis.",
      recommendations: ["Request original source", "Check metadata", "Use reverse image search"],
    },
  },
];

export const historyDetail = historyItems;

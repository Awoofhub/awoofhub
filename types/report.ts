export interface CreateReportData {
  type: string;
  targetType: "offer" | "user";
  targetId: string;
  description?: string;
}

export interface Report {
  id: string;
  type: string;
  targetType: "offer" | "user";
  targetId: string;
  description?: string;
  createdAt: string;
}
import { apiClient } from "@/lib/apiClient";
import { ApiResponse } from "@/types/api-response";
import { CreateReportData, Report } from "@/types/report";

async function createReport(payload: CreateReportData): Promise<ApiResponse<Report>> {
  const res: ApiResponse<Report> = await apiClient.post("/reports", payload);
  return res;
}

const ReportService = {
  createReport,
};

export default ReportService;
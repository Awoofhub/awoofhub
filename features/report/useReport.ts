import ReportService from "@/services/report-service";
import { CreateReportData } from "@/types/report";
import { useMutation } from "@tanstack/react-query";

export const useReport = () => {
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: (payload: CreateReportData) =>
      ReportService.createReport(payload),
  });

  return {
    submit: mutate,
    isPending,
    isSuccess,
    isError,
    error,
  };
};
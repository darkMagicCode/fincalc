import type { FieldPath, FieldValues, UseFormSetError } from "react-hook-form";
import type { ZodIssue } from "zod";

export function applyZodIssues<T extends FieldValues>(
  setError: UseFormSetError<T>,
  issues: ZodIssue[],
): void {
  for (const issue of issues) {
    const path = issue.path.join(".") as FieldPath<T>;
    setError(path, { type: issue.code, message: issue.message });
  }
}

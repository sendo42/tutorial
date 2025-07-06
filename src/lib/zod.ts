import { z } from "zod";

export const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_type) {
    if (issue.expected === "string") {
      return { message: "文字列を入力してください" };
    }

    if (issue.expected === "number") {
      return { message: "数値を入力してください" };
    }
  }

  if (issue.code === z.ZodIssueCode.too_small) {
    return { message: `${issue.minimum}文字以上で入力してください` }
  }

  if (issue.code === z.ZodIssueCode.too_big) {
    return { message: `${issue.maximum}文字以下で入力してください` }
  }

  if (issue.code === z.ZodIssueCode.invalid_string) {
      if (issue.validation === "email") {
          return { message: "メールアドレスの形式で入力してください" };
        }
        if (issue.validation === "url") {
            return { message: "URLの形式で入力してください" };
        }
    } 
  
  return { message: ctx.defaultError };
};

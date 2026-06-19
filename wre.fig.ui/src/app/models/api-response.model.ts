/**
 * Standard API response envelope returned by the WRE.Cloud.Fig API
 * (mirrors the server-side Response<T>). The UI reads `success` + `message`
 * to show proper feedback instead of relying on HTTP status codes alone.
 */
export interface ApiResponse<T> {
  data:          T | null;
  success:       boolean;
  message:       string | null;
  messageHeader: string | null;
  messageType:   number;   // 0 Success, 1 Info, 2 Warning, 3 Error
  errors:        string[];
}

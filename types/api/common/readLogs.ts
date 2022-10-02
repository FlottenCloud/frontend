export interface ReadLogsResponse {
  log: Array<Log>;
}

export interface Log {
  id: number;
  log: string;
  log_time: string;
  user_id_id: string;
}

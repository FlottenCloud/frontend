import { ActivatedType } from "types/common/activatedType";
import { LicenseType } from "types/common/licenseType";
export interface ReadUserLogsResponse {
  items: Array<Log>;
  total: number;
  page: number;
  size: number;
}

export interface Log {
  activator: Activator;
  giver: null;
  license_spec: LicenseSpec;
  log_type: string;
  receiver: null;
  sub: string;
  timestamp: string;
  user: string;
}

interface Activator {
  company_name: string;
  email: string;
  is_reseller: boolean;
  sub: string;
}

interface LicenseSpec {
  activated: ActivatedType;
  algo_node_count: number;
  allow_features: Array<string>;
  created_at: string;
  exp: string;
  gpu_algo_node_count: number;
  iat: string;
  license_str: string;
  license_type: LicenseType;
  lidar_count: number;
  machine_id: string;
  max_argos_session_count: number;
  multiple: number;
  name: string;
  nbf: string;
  sensors: Array<string>;
  sub: string;
  user: string;
}

export interface ReadAllUserResponse {
  items: Array<User>;
  total: number;
  page: number;
  size: number;
}

export interface User {
  email: string;
  is_reseller: true;
  path: string;
  perpetual: {
    sensors: Array<any>;
    allow_features: Array<any>;
    lidar_count: number;
    gpu_algo_node_count: number;
    algo_node_count: number;
    max_argos_session_count: number;
  };
  trial: {
    sensors: Array<any>;
    allow_features: Array<any>;
    lidar_count: number;
    gpu_algo_node_count: number;
    algo_node_count: number;
    max_argos_session_count: number;
  };
  normal: {
    sensors: Array<any>;
    allow_features: Array<any>;
    lidar_count: number;
    gpu_algo_node_count: number;
    algo_node_count: number;
    max_argos_session_count: number;
  };
  sub: string;
}

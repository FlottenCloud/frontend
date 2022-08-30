export interface ReadInstanceResponse {
  instances: Array<Instance>;
}

export interface Instance {
  disk_size: number;
  flavor_name: string;
  instance_name: string;
  ip_address: string;
  ram_size: number;
  status: string;
  image_name: string;
  instance_id: string;
  num_cpu: number;
  stack_id: string;
  stack_name: string;
  user_id_id: string;
}

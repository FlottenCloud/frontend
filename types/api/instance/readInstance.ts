export interface ReadInstanceResponse {
  instances: Array<Instance>;
}

export interface Instance {
  instance_pk: number;
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
  backup_completed_time: string;
  backup_time: number;
  next_backup_time: string;
}

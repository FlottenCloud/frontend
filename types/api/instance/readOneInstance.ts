export interface ReadOneInstanceResponse {
  backup_time: number;
  backup_completed_time: string;
  disk_size: number;
  flavor_name: string;
  image_name: string;
  instance_id: string;
  instance_name: string;
  instance_pk: number;
  ip_address: string;
  num_cpu: number;
  os: string;
  ram_size: number;
  stack_id: string;
  stack_name: string;
  status: string;
  update_image: null;
  user_id: string;
  // expected_data_size: number;
  package: string;
  // num_people: number;
  pc_spec: string;
}

import { useMutation, useQueryClient } from "react-query";
import { DefaultParams } from "types/api/common/params";
import { DefaultAxiosService } from "types/defaultAxiosService";

export enum Packages {
  APACHE = "apache2",
  DEFAULT_JDK = "default_jdk",
  FTP = "ftp",
  LIBGUESTFS_TOOLS = "libguestfs-tools",
  NET_TOOLS = "net-tools",
  PASTEBINIT = "pastebinit",
  PWGEN = "pwgen",
  VIM = "vim",
}

export enum OS {
  CENTOS = "centos",
  FEDORA = "fedora",
  UBUNTU = "ubuntu",
}

export enum PCspecs {
  LOW = "low",
  MIDDLE = "middle",
  HIGH = "high",
}

export interface CreateInstanceParams extends DefaultParams {
  // system_num: number;
  os: string;
  package: Array<Packages>;
  // num_people: number;
  // data_size: number;
  pc_spec: string;
  instance_name: string;
  backup_time: number;
}

const createInstance = async (params: CreateInstanceParams) => {
  const url = `/openstack/`;
  const { data } = await DefaultAxiosService.instance.post(url, {
    os: params.os,
    package: params.package,
    // num_people: params.num_people,
    // data_size: params.data_size,
    pc_spec: params.pc_spec,
    instance_name: params.instance_name,
    backup_time: params.backup_time,
  });
  return data;
};

const useCreateInstance = () => {
  const queryClient = useQueryClient();
  return useMutation((params: CreateInstanceParams) => createInstance(params), {
    onMutate: (variables) => {},
    onSuccess: (res, variables, context) => {
      queryClient.invalidateQueries("read_instance");
      //   queryClient.invalidateQueries("read_all_license");
      //   queryClient.invalidateQueries("read_license_summary");
      variables.successCallback && res && variables.successCallback(res);
    },
    onError: (err, variables, context) => {
      variables.errorCallback && err && variables.errorCallback(err);
      window.alert(err?.response?.data?.message);
    },
  });
};

export default useCreateInstance;

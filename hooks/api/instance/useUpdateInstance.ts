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

export interface UpdateInstanceParams extends DefaultParams {
  // system_num: number;
  instance_pk: number;
  package: Array<string>;
  // num_people: number;
  // data_size: number;
  pc_spec: string;
  backup_time: number;
}

const updateInstance = async (params: UpdateInstanceParams) => {
  const url = `/openstack/`;
  const { data } = await DefaultAxiosService.instance.patch(url, {
    instance_pk: params.instance_pk,
    package: params.package,
    // num_people: params.num_people,
    // data_size: params.data_size,
    pc_spec: params.pc_spec,
    backup_time: params.backup_time,
  });
  return data;
};

const useUpdateInstance = () => {
  const queryClient = useQueryClient();
  return useMutation((params: UpdateInstanceParams) => updateInstance(params), {
    onMutate: (variables) => {},
    onSuccess: (res, variables, context) => {
      queryClient.invalidateQueries("read_instance");
      //   queryClient.invalidateQueries("read_all_license");
      //   queryClient.invalidateQueries("read_license_summary");
      variables.successCallback && res && variables.successCallback(res);
    },
    onError: (err, variables, context) => {
      variables.errorCallback && err && variables.errorCallback(err);
    },
  });
};

export default useUpdateInstance;

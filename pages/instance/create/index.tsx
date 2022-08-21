import Flex from "components/common/Flex";
import useCreateInstance, {
  CreateInstanceParams,
} from "hooks/api/instance/useCreateInstance";
import { useCallback, useState } from "react";
import _ from "lodash-es";

const InstanceCreate = () => {
  const createInstance = useCreateInstance();
  const [token, setToken] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [imageRef, setImageRef] = useState<string>("");
  const [flavorRef, setFlavorRef] = useState<string>("");
  const [network, setNetwork] = useState<string>("");
  const [networks, setNetworks] = useState<Array<any>>([]);

  const handleCreateClick = useCallback(
    (e: any) => {
      e.preventDefault();
      const networksParams = networks.map((item) => {
        return {
          uuid: item,
        };
      });
      const createParams: CreateInstanceParams = {
        token,
        name,
        imageRef,
        flavorRef,
        networks: networksParams,
      };
      createInstance.mutate(createParams);
    },
    [createInstance, name, imageRef, flavorRef, networks]
  );

  const handleAddNetworkClick = useCallback(
    (e) => {
      e.preventDefault();
      setNetworks((prev) => {
        const newNetworks = [...prev];
        newNetworks.push(network);
        setNetwork("");
        return newNetworks;
      });
    },
    [network]
  );

  return (
    <Flex>
      <form onSubmit={handleCreateClick}>
        <div>
          <span>token</span>
          <input value={token} onChange={(e) => setToken(e.target.value)} />
        </div>
        <div>
          <span>name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <span>imageRef</span>
          <input
            value={imageRef}
            onChange={(e) => setImageRef(e.target.value)}
          />
        </div>
        <div>
          <span>flavorRef</span>
          <input
            value={flavorRef}
            onChange={(e) => setFlavorRef(e.target.value)}
          />
        </div>
        <div>
          <span>network</span>
          <input value={network} onChange={(e) => setNetwork(e.target.value)} />
          <button onClick={handleAddNetworkClick}>네트워크 추가</button>
          {networks.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
        <button>생성</button>
      </form>
    </Flex>
  );
};

export default InstanceCreate;

import { useContext } from "react";

import { StaticsContext } from "./provider";

const useStatics = () => { return useContext(StaticsContext); };

export default useStatics;

import { useAppDispatch, useAppSelector } from "@src/store/hook";
import { setAlertBox } from "@src/store/slices/page/slice";
import { RootState } from "@src/store/store";
import { useEffect } from "react";

const ValidationAlert = () => {
  const dispatch = useAppDispatch();
  const { data, process } = useAppSelector((state: RootState) => state.info.response);
  const confirmedData = data as any;
  useEffect(() => {
    if (process === 'validation' && Array.isArray(confirmedData.message)) {
        dispatch(setAlertBox(confirmedData.message));
    }
  }, [data, process, dispatch]);  
  return null;
}

export default ValidationAlert;

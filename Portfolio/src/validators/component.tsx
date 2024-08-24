import { useAppDispatch, useAppSelector } from "@src/store/hook";
import { setAlertBox } from "@src/store/slices/page/slice";
import { RootState } from "@src/store/store";
import { useEffect } from "react";

const ValidationAlert = () => {
  const dispatch = useAppDispatch();
  const { data, process } = useAppSelector((state: RootState) => state.info.response);
  useEffect(() => {
    if (process === 'validation' && Array.isArray(data.message)) {
      data.message.forEach(message => {
        dispatch(setAlertBox((prevAlertBox: any) => [
          ...prevAlertBox,
          {
            status: false,
            process: false,
            content: message.msg,
          }
        ]));
      });
    }
  }, [data, process, dispatch]);  
  return null;
}

export default ValidationAlert;

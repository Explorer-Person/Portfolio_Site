import { setMainMedia } from "@src/store";
import { useAppDispatch } from "@src/store/hook";

const HandleMediaHook = () => {
  const dispatch = useAppDispatch();
  

    return (mediaUrl: string, mediaType: 'video' | 'image')=>{
         dispatch(setMainMedia({
          mediaUrl: mediaUrl,
          mediaType: mediaType
         }))
    }
};

  export default HandleMediaHook;
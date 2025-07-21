import { MenuView } from "@react-native-menu/menu";
import { useRef } from "react";

export const TypeButtonMenu = ({ children }) => {
  const ref = useRef(null);
  return (
    <MenuView
      ref={ref}
      actions={[
        { id: "text", title: "text" },
        { id: "SOME", title: "some" },
      ]}
      shouldOpenOnLongPress={true}
    >
      {children}
    </MenuView>
  );
};

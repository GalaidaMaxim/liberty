import { MenuView } from "@react-native-menu/menu";

export const TypeButtonMenu = ({ children }) => {
  return (
    <MenuView
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

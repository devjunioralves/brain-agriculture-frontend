import { Link } from "@chakra-ui/react";

import { Link as RouterLink } from "react-router-dom";

const menuItems = [{ name: "Produtores", to: "/producers" }];

const NavIconsComponent: Function = (): JSX.Element[] => {
  return menuItems?.map((item: any, index: number) => (
    <Link
      key={index}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: "#24434b",
      }}
      as={RouterLink}
      to={item.to}
    >
      {item.name}
    </Link>
  ));
};

export default NavIconsComponent;

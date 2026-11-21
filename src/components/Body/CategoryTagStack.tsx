import {
  Box,
  Flex,
  Icon,
  LightMode,
  SimpleGrid,
  Tag,
  TagLabel,
  TagLeftIcon,
} from "@chakra-ui/react";
import React from "react";
import { BiCircle } from "react-icons/bi";
import { RiFocus2Line, RiFocusLine } from "react-icons/ri";
import * as C from "../../constants";
import { GraphContext } from "../../MapContext";

// Componente para mostrar/ocultar grupos de materias
// Arriba va la leyenda, que no se puede apagar (el color de las habilitadas y los grupos de obligatorias),
// y abajo los grupos que se pueden abrir/cerrar
const CategoryTagStack = () => {
  const { toggleGroup, groupStatus, getters } = React.useContext(GraphContext);
  const leyenda = React.useMemo(
    () => ["Habilitadas", ...getters.GruposObligatorias()],
    [getters],
  );
  const grupos = React.useMemo(() => getters.SelectableGrupos(), [getters]);
  const size = { base: "sm", md: "md" };

  return (
    <LightMode>
      <Box mb={2} ml={2} bottom={0} position="absolute" maxW="60%">
        <Flex wrap="wrap" gap={2} mb={grupos.length ? 2 : 0}>
          {leyenda.map((c) => (
            // @ts-ignore
            <Tag bg={C.GRUPOS[c]?.color} key={c} size={size}>
              <TagLabel>{c === "Habilitadas" ? "Habilitadas" : c}</TagLabel>
            </Tag>
          ))}
        </Flex>
        <SimpleGrid columns={grupos.length > 4 ? 2 : 1} spacing={2}>
          {grupos.map((c) => (
            <Tag
              cursor="pointer"
              // @ts-ignore
              bg={C.GRUPOS[c]?.color}
              key={c}
              size={size}
              onClick={() => {
                toggleGroup(c);
              }}
            >
              <TagLeftIcon
                as={() => {
                  switch (groupStatus(c)) {
                    case "hidden":
                      return (
                        <Icon boxSize={"1.3em"} as={BiCircle} mr="0.5rem" />
                      );
                    case "partial":
                      return (
                        <Icon boxSize={"1.3em"} as={RiFocusLine} mr="0.5rem" />
                      );
                    case "shown":
                      return (
                        <Icon boxSize={"1.3em"} as={RiFocus2Line} mr="0.5rem" />
                      );
                    default:
                      return <></>;
                  }
                }}
              />
              <TagLabel>{c}</TagLabel>
            </Tag>
          ))}
        </SimpleGrid>
      </Box>
    </LightMode>
  );
};

export default CategoryTagStack;

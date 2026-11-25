import React from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Icon,
  Input,
  Link,
  Tooltip,
  Box,
  Flex,
  Text,
  Badge,
  useColorModeValue,
  BadgeProps,
} from "@chakra-ui/react";
import { useCombobox } from "downshift";
import { CARRERAS } from "../../carreras";
import { FACULTADES, Plan, TODOS_LOS_PLANES } from "../../facultades";
import { GraphContext, UserContext } from "../../MapContext";

const AnoBadge = ({
  ano,
  active,
  ...rest
}: { ano: number; active: boolean } & BadgeProps) => {
  const activeVariant = useColorModeValue("solid", "subtle");
  const commonProps = {
    mx: 1,
    variant: active ? activeVariant : "outline",
    textAlign: "center" as const,
    // Centrado con el texto (sino queda apoyado en la linea base, mas abajo que el titulo)
    verticalAlign: "middle",
    colorScheme: "gray",
    ...rest,
  };
  return (
    <Badge {...commonProps} fontSize="small">
      {ano}
    </Badge>
  );
};

const normalizar = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

// Componente para elegir carrera
const DropdownCarreras = () => {
  const { user } = React.useContext(UserContext);
  const { changeCarrera } = React.useContext(GraphContext);
  const [busqueda, setBusqueda] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const carrera = React.useMemo(() => {
    const plan = TODOS_LOS_PLANES.find((p) =>
      p.planes.includes(user.carrera.id),
    );
    const { nombre = "", nombrecorto = "" } = plan || {};
    return { nombre, nombrecorto, plan };
  }, [user.carrera.id]);

  // La facultad de la carrera actual va primera, y la carrera actual primera dentro de ella
  const facultades = React.useMemo(() => {
    const esActual = (p: Plan) => p === carrera.plan;
    return FACULTADES.map((f) => ({
      ...f,
      planes: [
        ...f.planes.filter(esActual),
        ...f.planes.filter((p) => !esActual(p)),
      ],
    })).sort(
      (a, b) =>
        Number(b.planes.some(esActual)) - Number(a.planes.some(esActual)),
    );
  }, [carrera.plan]);

  const filtradas = facultades
    .map((f) => ({
      nombre: f.nombre,
      planes: f.planes.flatMap((p) =>
        normalizar(`${f.nombre} ${f.nombrecorto} ${p.nombre}`).includes(
          normalizar(busqueda),
        )
          ? p.planes.map((id) => ({ id, nombre: p.nombre }))
          : [],
      ),
    }))
    .filter((f) => f.planes.length);
  const items = filtradas.flatMap((f) => f.planes);

  // Downshift maneja el teclado (flechas, Enter, Escape) y abrir/cerrar
  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getInputProps,
    getItemProps,
    highlightedIndex,
    setInputValue,
  } = useCombobox({
    items,
    selectedItem: null,
    itemToString: () => "",
    defaultHighlightedIndex: 0,
    onInputValueChange: ({ inputValue }) => setBusqueda(inputValue ?? ""),
    onSelectedItemChange: ({ selectedItem }) =>
      selectedItem && changeCarrera(selectedItem.id),
  });

  React.useEffect(() => {
    if (isOpen) inputRef.current?.focus();
    else setInputValue("");
  }, [isOpen, setInputValue]);
  const menuBg = useColorModeValue("white", "gray.700");
  const highlightBg = useColorModeValue("gray.100", "whiteAlpha.200");

  const groupTitleProps = {
    textTransform: "uppercase" as const,
    letterSpacing: "wider",
    fontSize: "0.65rem",
    fontWeight: "semibold",
    color: useColorModeValue("gray.500", "gray.400"),
    mb: 1,
  };

  return (
    <Box minW={0} display="flex" alignItems="center">
      <Box minW={0} position="relative">
        <Tooltip
          placement="bottom"
          label={
            user.carrera.beta && (
              <Box fontSize="xs">
                <Text>Los planes nuevos cambian todo el tiempo.</Text>
                <Text>
                  Esto puede estar desactualizado frente a los últimos anuncios.
                </Text>
                <Text>
                  Haceme saber si falta alguna actualización sustancial del
                  plan.
                </Text>
              </Box>
            )
          }
        >
          <Button
            {...getToggleButtonProps()}
            colorScheme="whiteAlpha"
            variant="outline"
            color="white"
            borderRadius="md"
            size={{ base: "sm", md: "md" }}
            mr={{ base: 0, md: 2 }}
            maxW="100%"
            rightIcon={<ChevronDownIcon />}
          >
            {user.carrera.beta && (
              <Badge variant="subtle" mr={1} colorScheme="purple">
                BETA
              </Badge>
            )}
            <Box
              as="span"
              overflow="hidden"
              textOverflow="ellipsis"
              display={{ base: "inline", md: "none" }}
            >
              {carrera.nombrecorto}
            </Box>
            <Box
              as="span"
              overflow="hidden"
              textOverflow="ellipsis"
              display={{ base: "none", md: "inline" }}
            >
              {carrera.nombre}
            </Box>
            <AnoBadge ano={user.carrera.ano} active={true} />
          </Button>
        </Tooltip>
        <Box
          display={isOpen ? "block" : "none"}
          position="absolute"
          right={0}
          mt={1}
          zIndex="dropdown"
          w="28rem"
          maxW="95vw"
          py={2}
          bg={menuBg}
          borderRadius="md"
          borderWidth={1}
          boxShadow="lg"
        >
          <Box px={3} pb={2}>
            <Input
              {...getInputProps({ ref: inputRef })}
              size="sm"
              placeholder="Buscar carrera o facultad"
            />
          </Box>
          <Box
            {...getMenuProps()}
            as="ul"
            maxH={{ base: "50vh", md: "70vh" }}
            overflowY="auto"
          >
            {filtradas.map((f) => (
              <Box as="li" key={f.nombre} listStyleType="none">
                <Text {...groupTitleProps} px={3} pt={2}>
                  {f.nombre}
                </Text>
                {f.planes.map((item) => {
                  const index = items.indexOf(item);
                  const active = item.id === user.carrera.id;
                  return (
                    <Flex
                      {...getItemProps({ item, index })}
                      key={item.id}
                      align="center"
                      justify="space-between"
                      gap={4}
                      px={3}
                      py={1.5}
                      cursor="pointer"
                      bg={highlightedIndex === index ? highlightBg : undefined}
                    >
                      <Text
                        fontWeight={active ? "bold" : "normal"}
                        noOfLines={1}
                      >
                        {item.nombre}
                      </Text>
                      <AnoBadge
                        flexShrink={0}
                        active={active}
                        ano={CARRERAS.find((c) => c.id === item.id)?.ano ?? 0}
                      />
                    </Flex>
                  );
                })}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Tooltip
        closeOnClick
        hasArrow
        label="Plan de Estudios"
        placement="bottom"
      >
        <Link
          display={{ base: "none", md: "inline" }}
          color="white"
          href={user.carrera.link}
          isExternal
        >
          <Icon boxSize={{ base: 5, md: 6 }} viewBox="0 0 512 512">
            <path
              fill="currentColor"
              d="M496 128v16a8 8 0 0 1-8 8h-24v12c0 6.627-5.373 12-12 12H60c-6.627 0-12-5.373-12-12v-12H24a8 8 0 0 1-8-8v-16a8 8 0 0 1 4.941-7.392l232-88a7.996 7.996 0 0 1 6.118 0l232 88A8 8 0 0 1 496 128zm-24 304H40c-13.255 0-24 10.745-24 24v16a8 8 0 0 0 8 8h464a8 8 0 0 0 8-8v-16c0-13.255-10.745-24-24-24zM96 192v192H60c-6.627 0-12 5.373-12 12v20h416v-20c0-6.627-5.373-12-12-12h-36V192h-64v192h-64V192h-64v192h-64V192H96z"
            />
          </Icon>
        </Link>
      </Tooltip>
    </Box>
  );
};

export default DropdownCarreras;

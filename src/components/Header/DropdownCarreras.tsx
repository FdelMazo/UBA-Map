import React from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuList,
  Tooltip,
  Box,
  Text,
  Badge,
  MenuItem,
  MenuGroup,
  MenuDivider,
  useColorModeValue,
  BadgeProps,
} from "@chakra-ui/react";
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
    colorScheme: "gray",
    ...rest,
  };
  return (
    <Badge {...commonProps} fontSize="small">
      {ano}
    </Badge>
  );
};

// Una carrera del dropdown, con un badge por cada plan
const CarreraItem = ({
  plan,
  active = false,
}: {
  plan: Plan;
  active?: boolean;
}) => {
  const { user } = React.useContext(UserContext);
  const { changeCarrera } = React.useContext(GraphContext);

  return (
    <MenuItem
      display="flex"
      justifyContent="space-between"
      gap={4}
      {...(plan.planes.length === 1
        ? { onClick: () => changeCarrera(plan.planes[0]!) }
        : { cursor: "default", closeOnSelect: false })}
    >
      <Text fontWeight={active ? "bold" : "normal"}>{plan.nombre}</Text>
      <Box ml={4} flexShrink={0}>
        {plan.planes.map((c) => {
          const p = CARRERAS.find((carrera) => carrera.id === c);
          if (!p) return null;
          const isActive = user.carrera.id === c;
          return (
            <AnoBadge
              key={c}
              ano={p.ano}
              active={isActive}
              cursor="pointer"
              onClick={() => changeCarrera(c)}
              _hover={
                !isActive && plan.planes.length > 1 ? { border: "1px" } : {}
              }
            />
          );
        })}
      </Box>
    </MenuItem>
  );
};

// Componente para elegir carrera
const DropdownCarreras = () => {
  const { user } = React.useContext(UserContext);

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

  const groupTitleProps = {
    textTransform: "uppercase" as const,
    letterSpacing: "wider",
    fontSize: "0.65rem",
    fontWeight: "semibold",
    color: useColorModeValue("gray.500", "gray.400"),
    mb: 1,
  };

  return (
    <Box
      key={user.carrera.id}
      flexShrink={0}
      display="flex"
      alignItems="center"
    >
      <Menu placement="bottom" isLazy>
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
          <MenuButton
            colorScheme="whiteAlpha"
            variant="outline"
            color="white"
            borderRadius="md"
            as={Button}
            size={{ base: "sm", md: "md" }}
            mr={2}
            rightIcon={<ChevronDownIcon />}
          >
            {user.carrera.beta && (
              <Badge variant="subtle" mr={1} colorScheme="purple">
                BETA
              </Badge>
            )}
            <Box as="span" display={{ base: "inline", md: "none" }}>
              {carrera.nombrecorto}
            </Box>
            <Box as="span" display={{ base: "none", md: "inline" }}>
              {carrera.nombre}
            </Box>
            <AnoBadge ano={user.carrera.ano} active={true} />
          </MenuButton>
        </Tooltip>
        <MenuList overflowY="auto" maxHeight="70vh" py={1}>
          {facultades.map((f, i) => (
            <React.Fragment key={f.nombrecorto}>
              {i > 0 && <MenuDivider />}
              <MenuGroup title={f.nombre} {...groupTitleProps}>
                {f.planes.map((p) => (
                  <CarreraItem
                    key={p.nombrecorto}
                    plan={p}
                    active={p === carrera.plan}
                  />
                ))}
              </MenuGroup>
            </React.Fragment>
          ))}
        </MenuList>
      </Menu>
      <Tooltip
        closeOnClick
        hasArrow
        label="Plan de Estudios"
        placement="bottom"
      >
        <Link color="white" href={user.carrera.link} isExternal>
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

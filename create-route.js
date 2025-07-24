const readline = require("readline");
const fs = require("fs");
const path = require("path");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function formatComponentNameForRoute(name) {
  return name.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
}

function updateRotesJson(routeName) {
  const rotesJsonPath = path.join(process.cwd(), "rotes.json");

  try {
    let rotes = [];
    if (fs.existsSync(rotesJsonPath)) {
      const fileContent = fs.readFileSync(rotesJsonPath, "utf8");
      rotes = fileContent ? JSON.parse(fileContent) : [];
    }

    const newRoute = `/${routeName}`;
    if (!rotes.includes(newRoute)) {
      rotes.push(newRoute);
      fs.writeFileSync(rotesJsonPath, JSON.stringify(rotes, null, 2));
      console.log(`Rota '${newRoute}' adicionada a rotes.json.`);
    } else {
      console.log(
        `Rota '${newRoute}' já existe em rotes.json. Nenhuma alteração feita.`
      );
    }
  } catch (error) {
    console.error(`Erro ao atualizar rotes.json: ${error.message}`);
  }
}
rl.question(
  "Qual o nome do componente que você quer testar? ",
  (componentName) => {
    const routeName = formatComponentNameForRoute(componentName);
    const routePath = path.join(process.cwd(), "app", routeName);

    if (fs.existsSync(routePath)) {
      console.error(`Erro: A rota '${routeName}' já existe em '${routePath}'.`);
      rl.close();
      return;
    }

    fs.mkdirSync(routePath, { recursive: true });
    console.log(`Diretório da rota criado: ${routePath}`);

    const layoutContent = `import { Slot } from "expo-router";
import React from "react";
import { Platform } from "react-native";

const Con =
  Platform.OS === "web"
    ? require("@mobilestock-native/container").Container.Main
    : require("@mobilestock-native/container").Container.Main;

export default function Layout() {
  return (
    <Con>
      <Slot />
    </Con>
  );
}

`;

    const indexContent = `import React from 'react';
import { styled } from 'styled-components/native';

const FallbackContainer = styled.View\`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
\`;

const FallbackText = styled.Text\`
  font-size: 24px;
  color: #333;
\`;

export default function Index() {
  return (
    <FallbackContainer>
      <FallbackText>Fallback para ${componentName}</FallbackText>
    </FallbackContainer>
  );
}
`;

    const androidContent = `import React from 'react';
import { Typography } from "@mobilestock-native/typography";
import { Container } from "@mobilestock-native/container";

export default function IndexAndroid() {
  return (
    <Container.Vertical>
      <Typography>Rota Android para ${componentName}</Typography>
    </Container.Vertical>
  );
}
`;

    const webContent = `import React from 'react';
import { Typography } from "@mobilestockweb/typography";
import { Container } from "@mobilestockweb/container";

export default function IndexWeb() {
  return (
    <Container.Vertical>
      <Typography>Rota Web para ${componentName}</Typography>
    </Container.Vertical>
  );
}
`;

    fs.writeFileSync(path.join(routePath, "_layout.tsx"), layoutContent);
    fs.writeFileSync(path.join(routePath, "index.tsx"), indexContent);
    fs.writeFileSync(path.join(routePath, "index.android.tsx"), androidContent);
    fs.writeFileSync(path.join(routePath, "index.web.tsx"), webContent);

    console.log("Arquivos de rota criados com sucesso:");
    console.log(`- ${path.join(routeName, "_layout.tsx")}`);
    console.log(`- ${path.join(routeName, "index.tsx")}`);
    console.log(`- ${path.join(routeName, "index.android.tsx")}`);
    console.log(`- ${path.join(routeName, "index.web.tsx")}`);

    rl.close();

    updateRotesJson(routeName);
  }
);

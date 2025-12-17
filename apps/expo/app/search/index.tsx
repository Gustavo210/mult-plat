import { Container } from "@mobilestock-native/container";
import { Typography } from "@mobilestock-native/typography";
import { Search } from "../../components/Search/src";

const data = [
  {
    pessoas: ["Pessoa A", "Pessoa B"],
    batata: {
      cebola: {
        teste: "Teste profundo",
      },
    },
    batatinha: [
      {
        tipo: "Tipo 1",
        sabor: "Sabor A",
      },
      {
        tipo: "Tipo 2",
        sabor: "Sabor B",
      },
    ],
    teste: "Sugestao 1",
    valor: 123,
    nulo: null,
  },
  {
    pessoas: ["Pessoa 1", "Pessoa 2"],
    batata: {
      cebola: {
        teste: "Outro teste profundo",
      },
    },
    batatinha: [
      {
        tipo: "Tipo 3",
        sabor: "Sabor C",
      },
      {
        tipo: "Tipo 4",
        sabor: "Sabor D",
      },
    ],
    teste: "Sugestao 2",
    valor: 456,
    nulo: null,
  },
  {
    pessoas: ["Pessoa 3", "Pessoa 4"],
    batata: {
      cebola: {
        teste: "Mais um teste profundo",
      },
    },
    batatinha: [
      {
        tipo: "Tipo 5",
        sabor: "Sabor E",
      },
      {
        tipo: "Tipo 6",
        sabor: "Sabor F",
      },
    ],
    teste: "Sugestao 3",
    valor: 789,
    nulo: null,
  },
];

export default function Index() {
  return (
    <Container.Vertical>
      <Typography>Rota para search</Typography>
      <Search
        // defaultData={data}
        // nao renderizar suggestions
        valueSuggestionKey="batata.cebola.teste"
        variant="attached"
        iconSearchButton="ArrowRight"
        fetchOnQuery={async (query, signal) => {
          return new Promise<typeof data>((resolve, reject) => {
            const timeout = setTimeout(() => {
              resolve(data);
            }, 2000);

            signal?.addEventListener("abort", () => {
              clearTimeout(timeout);
              reject();
            });
          });
        }}
      />
    </Container.Vertical>
  );
}

import { PieChart, Pie, Label, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer } from "@/components/ui/chart";

const methodMapping = {
  1: "Efectivo",
  2: "Transferencia",
  3: "Débito",
  4: "Crédito",
};

// Mapea los métodos de pago a colores
const colorMapping = {
  Efectivo: "hsl(191, 100%, 41%)",
  Transferencia: "hsl(193, 69%, 53%)",
  Débito: "hsl(190, 100%, 35%)",
  Crédito: "hsl(195, 100%, 31%)",
};

// Configuración del gráfico
const chartConfig = {
  quantity: {
    label: "Cantidad",
  },
  payment_method_id: {
    label: "Método de Pago",
  },
};

// Función para transformar los datos de ventas
const transformSalesData = (sales) => {
  const groupedSales = sales.reduce((acc, sale) => {
    const method = methodMapping[sale.payment_method_id];

    if (!acc[method]) {
      acc[method] = { quantity: 0 };
    }

    acc[method].quantity += 1;

    return acc;
  }, {});

  return Object.keys(groupedSales).map((method) => ({
    payment_method_id: method,
    quantity: groupedSales[method].quantity,
    fill: colorMapping[method],
  }));
};

export function ChartPie({ data, totalAmount }) {
  // Transformar los datos de ventas
  const chartData = transformSalesData(data);

  // Calcular el total de cantidad
  const totalQuantity = chartData.reduce(
    (sum, entry) => sum + entry.quantity,
    0
  );

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Ventas en total</CardTitle>
        <CardDescription>7 de Julio de 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart
            width={400}
            height={400}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <Tooltip cursor={false} />
            <Pie
              data={chartData}
              dataKey="quantity"
              nameKey="payment_method_id"
              innerRadius={60}
              strokeWidth={5}
              labelLine={false}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalQuantity.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Ventas
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          El monto total es de: {totalAmount}
        </div>
        <div className="leading-none text-muted-foreground">
          <Button>Generar PDF</Button>
        </div>
      </CardFooter>
    </Card>
  );
}

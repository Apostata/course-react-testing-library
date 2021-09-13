import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3030/scoops", (req, resp, ctx) => {
    //handler para chamada a /scoops
    return resp(
      ctx.json([
        { name: "Chocolate", imagePath: "/images/chocolate.png" },
        { name: "Vanilla", imagePath: "/images/vanilla.png" },
      ])
    );
  }),

  rest.get("http://localhost:3030/toppings", (req, resp, ctx) => {
    //handler para chamada a /toppings
    return resp(
      ctx.json([
        { name: "Cherries", imagePath: "/images/cherries.png" },
        { name: "M&Ms", imagePath: "/images/m-and-ms.png" },
        { name: "Hot fudge", imagePath: "/images/hot-fudge.png" },
      ])
    );
  }),

  rest.post("http://localhost:3030/order", (req, resp, ctx) => {
    //handler para chamada a /toppings
    const orderNumber = Math.floor(Math.random() * 10000000000);
    return resp(ctx.status(201), ctx.json({ orderNumber }));
  }),
];

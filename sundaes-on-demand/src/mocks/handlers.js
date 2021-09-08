import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3030/scoops", (req, resp, ctx) => {
    //handler para chamada a /scoops
    return resp(
      ctx.json([
        { name: "chocolate", imagePath: "/images/chocolate.png" },
        { name: "Vanilla", imagePath: "/images/vanillar.png" },
      ])
    );
  }),
];

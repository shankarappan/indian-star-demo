# Indian Star — client demo

[Open the website](https://shankarappan.github.io/indian-star-demo/)

Responsive restaurant concept with 89 menu dishes, dietary filters, spice and quantity choices, basket, 10% pickup calculation and simulated checkout. Includes restaurant story, awards, contact details and the supplied staff photograph.

This is a demonstration. Orders, payments, bookings and enquiry messages are not transmitted. Personal form values and baskets remain in browser memory and reset on reload.

## Development

```sh
npm ci
npm run dev
```

## Verification

```sh
npm run build
node --test tests/order.test.mjs
npm run test:sites
```

Pushes to main automatically publish dist/client to GitHub Pages. Vite uses relative asset paths for project-page hosting.

Content is based on indianstar.co.nz. Some food and spice images are AI-generated concept imagery. Prices, business hours, dietary details and production integrations require client verification before commercial launch. This is a client design demonstration, not the official restaurant website.

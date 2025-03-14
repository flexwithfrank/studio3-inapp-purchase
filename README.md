# Studio3 In-App Purchase WebView

This is a Next.js application designed to be used as an in-app browser for the Studio3 fitness app. It provides a mobile-friendly landing page for the 7-day gym trial offer.

## Features

- Mobile-responsive design optimized for in-app browser viewing
- Integration with Mindbody widget for seamless purchasing
- Modern UI with smooth animations and gradients
- Dynamic content rendering

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Pages

- **Home Page** (`/`): Simple landing page with a link to the trial offer
- **Trial Page** (`/trial`): 7-day gym trial offer with Mindbody widget integration

## Mindbody Integration

The application integrates with Mindbody using their widget script:

```html
<script src="https://widgets.mindbodyonline.com/javascripts/healcode.js" type="text/javascript"></script>
<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="30089" data-mb-site-id="686934" data-service-id="101246" data-bw-identity-site="false" data-type="pricing-link" data-inner-html="Buy Now" />
```

## Deployment

The application can be deployed to any platform that supports Next.js applications, such as Vercel, Netlify, or a custom server.

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Mindbody Widget Documentation](https://developers.mindbodyonline.com/PublicDocumentation/V6)
- [Tailwind CSS](https://tailwindcss.com/docs)

## License

This project is proprietary and owned by Studio3.

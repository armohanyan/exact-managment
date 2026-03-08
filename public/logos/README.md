# Logos

Copy your brand logo files from the project root `logos/` folder into this `public/logos/` folder so they are served by the site.

For the header logo, place `image.png` (or your main logo file) here and update `src/components/Header.tsx` to use:

```tsx
<Image src="/logos/image.png" alt="Exact Management" width={140} height={44} className="h-9 w-auto" priority />
```

Ensure the Header component imports `Image` from `next/image` when you add the logo image.

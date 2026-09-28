# Website images

All website image paths, alt text, and fallback labels are managed in
`content/site-content.ts`, under `siteContent.images`. Edit that file when a
filename or image description changes.

Every image lives in `public/images/`. For files already present, replacing the
existing file with another file using the same filename is sufficient; no code
or settings change is needed. Keep the same file format and approximate aspect
ratio to preserve the current layout.

| Settings key | Physical filename | Where it appears | Recommended size / aspect ratio |
| --- | --- | --- | --- |
| `images.branding.headerLogo` | `header-logo-small.webp` | Site header | Transparent lossless WebP, 256 × 256 px |
| `images.branding.footerLogo` | `footer-logo-small.webp` | Site footer | Transparent lossless WebP, 256 × 256 px |
| `images.branding.favicon` | `favicon-128.png` | Browser tab | Transparent PNG, 128 × 128 px |
| `images.branding.pageBackground` | `page-background.png` | Background across all pages | 1024 × 1536 px |
| `images.homePage.hero` | `home-hero.png` | Home-page hero | Approximately 1600 × 700 px |
| `images.homePage.anxietyService` | `home-anxiety.png` | Home Anxiety service row | Approximately 800 × 600 px |
| `images.homePage.depressionService` | `home-depression.png` | Home Depression service row | Approximately 800 × 600 px |
| `images.homePage.familyTherapyService` | `home-family.png` | Home Family therapy service row | Approximately 800 × 600 px |
| `images.aboutPage.clinicianPortrait` | `dr-yana-romanov.png` | About-page portrait | Approximately 900 × 1200 px |
| `images.servicesPage.individualTherapy` | `service-individual.png` | Individual Therapy section | Approximately 1200 × 700 px |
| `images.servicesPage.couplesTherapy` | `service-couples.png` | Couples Therapy section | Approximately 1200 × 700 px |
| `images.servicesPage.teenAndFamilyTherapy` | `service-family.png` | Teen and Family Therapy section | Approximately 1200 × 700 px |
| `images.servicesPage.therapyIntensive` | `service-intensive.png` | Therapy Intensive section | Approximately 1200 × 700 px |
| `images.servicesPage.filmConsultation` | `service-film.png` | Film consultation section | Approximately 1200 × 700 px |
| `images.feesPage.growth` | `fees-growth.png` | Fees page | Approximately 800 × 1000 px |
| `images.blogPage.articleOne` | `blog-1.jpg` | First temporary Blog card | Square |
| `images.blogPage.articleTwo` | `blog-2.jpg` | Second temporary Blog card | Square |
| `images.blogPage.articleThree` | `blog-3.jpg` | Third temporary Blog card | Square |

The three Blog images are intentionally absent and display the existing styled
fallback placeholders until the later Medium integration work is undertaken.
Adding each file under the documented filename is sufficient to make it appear.

The original `header-logo.png`, `header-logo.webp`, `footer-logo.png`,
`footer-logo.webp`, and `favicon.png` files are retained as full-resolution
source assets. The site uses the smaller filenames documented above.

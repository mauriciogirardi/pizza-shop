[![ci](https://github.com/mauriciogirardi/pizza-shop/actions/workflows/ci.yml/badge.svg)](https://github.com/mauriciogirardi/pizza-shop/actions/workflows/ci.yml)

<div align="center">
  <img src=".github/imgs/logo.svg" width="400px"/>
</div>

<br/>
<br/>
<br/>

This project has the intuition to create a Dashboard for food logists, the logist will be able to follow the metrics such as monthly orders and diaries and individually monitors each order and manages the status of the order

##### layout page dashboard

![Layout dashboard dark theme!](.github/imgs/dash-dark.png)
![Layout dashboard dark theme!](.github/imgs/dash-light.png)

##### Main Technologies

| Packages           | Version | Packages                  | Version |
| ------------------ | ------- | ------------------------- | ------- |
| vite               | 5.0.10  | vitest                    | 1.0.1   |
| react              | 18.2.0  | @testing-library/jest-dom | 6.1.5   |
| react-dom          | 18.2.0  | @testing-library/react    | 14.1.2  |
| React-helmet-async | 5.0.10  | jsdom                     | 23.0.1  |
| tailwindcss        | 3.4.0   | sonner                    | 1.2.4   |
| typescript         | 5.2.2   | playwright                | 1.41.2  |
| zod                | 3.22.4  | date-fns                  | 3.2.0   |
| recharts           | 2.10.3  | clsx                      | 2.0.0   |
| react-hook-form    | 7.49.2  | tailwindcss-merge         | 2.2.0   |
| react-router-dom   | 6.21.1  | axios                     | 1.6.5   |
| shadcn/ui          | 0.5.0   | vitest                    | 1.1.0   |
| pnpm               | 8+      | msw                       | 2.1.6   |
| node               | 18+     | husky                     | 8.0.0   |

##### How clone and run this project

```bash
# clone
git clone https://github.com/mauriciogirardi/pizza-shop.git

# open folder
cd pizza-shop

# install dependencies
pnpm install

# Create a file .env.local and add this env
  VITE_API_URL="http://localhost:3333"
  VITE_TEST_API_URL="http://localhost:50789"
  VITE_ENABLE_API_DELAY=true

# run
pnpm dev
```

---

[LICENSE](/LICENSE)

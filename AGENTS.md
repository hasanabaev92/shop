# Agent Guidelines for shop-proj

## Build Commands

```bash
npm run dev          # Start development server with HMR
npm run build        # TypeScript check + production build
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

Note: No test framework is currently configured.

## Project Stack

React 19 + TypeScript 5.9 + Vite 7, React Router 7, Zustand, TanStack React Query/Form, Zod, CSS modules, @faker-js/faker, ESLint.

## File Organization

```
src/
├── components/ComponentName/ComponentName.tsx (and .css)
├── pages/PageName/PageName.tsx (and .css)
├── store/storeName.ts
├── types/{typeName.ts,schemas/schemaName.schema.ts}
├── mock/mockName.ts
├── routes/routes.ts
├── Layout.tsx
└── main.tsx
```

## Code Style Guidelines

### Imports
Order: third-party packages → internal modules (relative paths) → CSS. Use `import type { ... }` for type-only imports.

```tsx
import { useQuery } from "@tanstack/react-query"
import { useForm } from "@tanstack/react-form"
import type { ProductT } from "../../types/productType"
import "./ProductMiniCard.css"
```

### Naming Conventions
- **Types**: Suffix with `T` (e.g., `ProductT`, `CartT`, `AddProductT`)
- **Components**: PascalCase (e.g., `ProductMiniCard`)
- **Functions**: camelCase (e.g., `addToCart`, `getProductById`)
- **Constants**: camelCase (e.g., `productsDataBase`)
- **Event Handlers**: Prefix with `handle` (e.g., `handleAddCart`)
- **Boolean Props/Variables**: `is...` prefix (e.g., `isInCart`, `isPending`)

### Type Definitions
Define types in `src/types/`. Use Zod schemas for form validation in `src/types/schemas/`. Export inferred types: `export type AddProductT = z.infer<typeof AddProductSchema>`

```ts
export type ProductT = { id: string; name: string; price: number; lost: number }
export const AddProductSchema = z.object({ name: z.string().min(3), price: z.int().min(1), lost: z.int().min(1) })
```

### Components
Functional components only. Define props as `ComponentNameContract`. Use TypeScript for all props. Export as default.

```tsx
type ProductMiniCardContract = { product: ProductT; onclickFn: () => void }
function ProductMiniCard({ product, onclickFn }: ProductMiniCardContract) { return <div>{product.name}</div> }
export default ProductMiniCard
```

### State Management (Zustand)
Stores in `src/store/`. Use selectors: `const addToCart = useCartStore((state) => state.addToCart)`

```ts
export const useCartStore = create<CartStoreT>((set, get) => ({
  productList: {},
  addToCart: (product) => { /* ... */ },
  isInCart: (id) => !!get().productList[id],
}))
```

### Data Fetching (TanStack Query)
Query keys as arrays (e.g., `["PRODUCTS"]`, `["BIGPRODUCT", id]`). Mock data in `src/mock/`. Destructure `isPending`, `error`, `data`.

```tsx
const { isPending, error, data } = useQuery({ queryKey: ["PRODUCTS"], queryFn: getProducts })
if (isPending) return <div>Загрузка...</div>
if (error) return <div>Ошибка загрузки</div>
```

### Forms (TanStack Form + Zod)
```tsx
const form = useForm({
  defaultValues: { name: "", price: 1 } as AddProductT,
  onSubmit: async ({ value }) => { await mutate.mutateAsync(value) },
  validators: { onChange: AddProductSchema },
})
```

### Routing
Router in `src/routes/routes.ts`. Use `<Outlet />` for nested routes. Access params with `useParams()`.

```tsx
const params = useParams()
const { data } = useQuery({ queryKey: ["PRODUCT", params.id], queryFn: () => getProductById(params.id) })
```

### Error Handling
Use try/catch for async operations. Return error states in UI. Log errors in mutation callbacks with `console.log(error)`. Show user-friendly messages in Russian.

### Styling
One CSS file per component: `ComponentName.css`. Import in component. Use semantic class names (e.g., `card-mini`, `layout`).

### UI Language
User-facing text must be in Russian. Comments can be English or Russian.

## TypeScript Configuration
Strict mode enabled, no implicit any, all files must have `.ts` or `.tsx` extension.

## Linting
ESLint configured for TypeScript and React. Run `npm run lint` before committing.

## Before Making Changes
1. Read existing code to understand patterns
2. Check if similar functionality already exists
3. Follow established file organization
4. Use TypeScript for type safety
5. Ensure consistent naming conventions
6. Run lint command to verify code quality

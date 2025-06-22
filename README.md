# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# React Item Management App

This is a simple React-based application that allows users to:
- Add items with details and images.
- View the list of added items.
- Enquire about an item by sending an email to the provided email address.

## Features

- **Add Item**: Add items with name, type, description, cover image, and additional images.
- **View Items**: View all added items with their name and cover image.
- **Email Enquiry**: Click "Enquire" to send an email to the item's contact email.
- **Sidebar Navigation**: Easily switch between Add and View pages via the sidebar.

## Tech Stack

- **React** with `useState`, `useRef`
- **React Router DOM** for routing
- **Tailwind CSS** for styling
- **Lucide React** icons
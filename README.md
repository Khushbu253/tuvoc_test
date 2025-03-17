
# E-Commerce App for Tovoc technologies

## Overview
This is a modern eCommerce web application built using React, TypeScript, Redux Toolkit, Tailwind CSS, and the FakeStore API. The project provides a seamless shopping experience with product listings, cart management, and a responsive design.

## Features
- Display products from FakeStore API
- fetch cart product with redux 
- Manage cart state with Redux Toolkit
- Responsive UI using Tailwind CSS
- Type-safe development with TypeScript
- applied sorting with price low to high and high to low 

## Tech Stack
- **React** - Frontend framework
- **TypeScript** - Strongly typed JavaScript
- **Redux Toolkit** - State management
- **Tailwind CSS** - Utility-first styling
- **FakeStore API** - Mock product data

## Installation

### Prerequisites
Make sure you have Node.js and npm installed on your system.

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/Khushbu253/tuvoc_test.git
   cd ecommerce-app
   ```
2. Install dependencies:
   ```sh
   npm install
    or
    npm isatall --legacy-peer-deps
   ```
3. Start the development server:
   ```sh
   npm start
   or
   npm run dev
   ```
4. Open the app in your browser at `http://localhost:3000`

## API Usage
This project uses the [FakeStore API](https://fakestoreapi.com/) to fetch product data.

## Folder Structure
```
├── src
│   ├── components   # Reusable UI components
│   ├── pages        # Page components
│   ├── slices       # Redux Toolkit slices
│   ├── app          # Redux Toolkit store
│   ├── styles       # Tailwind styles
│   ├── services     # cart services
│   ├── App.tsx      # Root component
│   ├── main.tsx     # Entry point
├── public           # Static assets
├── package.json     # Project metadata
├── tailwind.config.js # Tailwind configuration
```

## Contributing
1. Fork the project
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature-name`
5. Create a Pull Request

## License
This project is licensed under the MIT License.

## Contact
For any questions or suggestions, reach out via [your email] or open an issue.






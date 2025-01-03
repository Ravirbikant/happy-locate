# FE Assignment - Responsive React Web App

This project is a Frontend Assignment for creating a responsive React web application as per the given design and functionality requirements. The application allows users to manage house details, filter inventory, and view selected items, with state management handled using Redux.

## Features

- **House Details Input**: Users can specify the number of rooms, balconies, and other house details.
- **Inventory Filtering**: Users can filter inventory by room and overall category, and provide quantities for selected inventory items.
- **Inventory Overview**: Users can view a summary of the selected inventory.
- **Responsive Design**: The app is fully responsive for both web and mobile screen sizes.

## Design Reference

The app design can be found on Figma: [Design Link](https://www.figma.com/design/sTzNt9b64ritsotvtGNh67/HL-FE-Assignment?node-id=0-1&amp;t=iiSBHeRUe3ukEmdC-1)

## Technologies Used

- **React**: For building the user interface with reusable components.
- **React Redux**: For global state management and smooth data flow across the app.
- **Material UI (MUI)**: For modern, responsive design and styling.

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js**: [Download Node.js](https://nodejs.org)
- **npm** (comes with Node.js) or **yarn**: [Install Yarn](https://yarnpkg.com/)

## Setup Instructions

1. **Extract the Project**
   - Extract the provided zip file into your desired directory.

2. **Navigate to the Project Directory**
   ```bash
   cd happy-locate
   ```

3. **Install Dependencies**
   Run the following command to install all required dependencies:
   ```bash
   npm install
   ```
   or, if you prefer yarn:
   ```bash
   yarn install
   ```

4. **Run the Application**
   Start the development server using:
   ```bash
   npm start
   ```
   or, with yarn:
   ```bash
   yarn start
   ```

   The app will be accessible at `http://localhost:3000` in your browser.

5. **Build the Application (Optional)**
   To create a production build, use:
   ```bash
   npm run build
   ```
   or:
   ```bash
   yarn build
   ```

## Project Structure

```
project-directory-name/
├── public/           # Public assets and HTML file
├── src/              # Source code
│   ├── pages/   # Reusable React components/pages
│   ├── redux/        # Redux store and slices
│   ├── styles/       # Custom styles and themes
│   ├── App.js        # Main App component
│   └── index.js      # Entry point
├── package.json      # Dependencies and scripts
└── README.md         # Project documentation
```

## Acknowledgments

- **Design Inspiration**: [Figma Design](https://www.figma.com/design/sTzNt9b64ritsotvtGNh67/HL-FE-Assignment?node-id=0-1&amp;t=iiSBHeRUe3ukEmdC-1)
- **React Redux Documentation**: [React Redux](https://react-redux.js.org/)
- **Material UI Documentation**: [Material UI](https://mui.com/)


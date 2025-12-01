# 📉 React Price Tracker

A modern, responsive web application built with **Next.js 16** and **React 19** to track product prices, visualize price history trends, and calculate potential savings.

## ✨ Features

* **Real-time Dashboard**: View key metrics like total items tracked, price drops, alerts triggered, and total money saved.
* **Interactive Charts**: Visualize price history trends using beautiful line charts (powered by Recharts).
* **Product Management**: 
    * Add new products via a modal form.
    * Edit current prices manually.
    * Remove products from the tracking list.
* **Smart Alerts**: Visual indicators when a product hits its target price or drops below the original price.
* **Modern UI**: Built with **shadcn/ui** and **Tailwind CSS v4** for a clean, accessible, and responsive interface.
* **Dark Mode Support**: Fully themed for both light and dark modes.

## 🛠️ Tech Stack

* **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
* **Library**: [React 19](https://react.dev/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI)
* **Charts**: [Recharts](https://recharts.org/)
* **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** installed. This project prefers **pnpm**, but you can use npm or yarn.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/react-price-tracker.git](https://github.com/your-username/react-price-tracker.git)
    cd react-price-tracker
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    # or
    npm install
    ```

3.  **Run the development server:**
    ```bash
    pnpm dev
    # or
    npm run dev
    ```

4.  **Open your browser:**
    Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## Bd Project Structure

```text
├── app/                  # Next.js App Router directory
│   ├── layout.tsx        # Root layout and font configuration
│   ├── page.tsx          # Main dashboard view and state logic
│   └── globals.css       # Tailwind v4 imports and CSS variables
├── components/           # React components
│   ├── ui/               # Reusable UI components (shadcn/ui)
│   ├── dashboard.tsx     # Main dashboard layout
│   ├── price-chart.tsx   # Recharts visualization component
│   ├── product-card.tsx  # Individual product display card
│   └── add-product-modal.tsx # Form modal for new items
├── lib/
│   └── utils.ts          # Utility functions (cn helper)
└── public/               # Static assets
```
## 📝 Usage Notes

  * **Data Persistence**: Currently, the application uses local state (`useState`) within `app/page.tsx`. This means if you refresh the page, the data will reset to the default mock data.
  * **Backend Integration**: This project is set up as a frontend UI. To make it fully functional, you would typically integrate this with a backend (like Node.js, Python, or Go) that performs the actual web scraping and stores data in a database (PostgreSQL/MongoDB).

## 🎨 Customization

This project uses **Tailwind CSS v4**. You can customize the theme colors in `app/globals.css`. The color palette uses `oklch` values for better color space interpolation.


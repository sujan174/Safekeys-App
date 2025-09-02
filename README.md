# Secrets Vault Dashboard

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)<br>
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)<br>
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)<br>
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)<br>
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)

A sleek and modern web interface for securely viewing secrets from a vault server. This application provides a secure authentication front-end and a clean, responsive dashboard to display sensitive data fetched from an API endpoint. The UI is designed with a "glassmorphism" aesthetic for a contemporary look and feel.

## Key Features

- **Secure Authentication**: A dedicated login page to authenticate against a vault server using a Server URL and an API Key.
- **Session Management**: User credentials are stored securely in the browser's session storage for the duration of the session.
- **Dynamic Data Dashboard**: Fetches and displays a list of secrets in a clean, readable table.
- **Real-time Refresh**: A dedicated refresh button to re-fetch the latest secrets from the server without a full page reload.
- **Modern UI/UX**: Built with a "glassmorphism" design, featuring semi-transparent cards, blurred backdrops, and a dark theme.
- **Responsive Design**: The interface is optimized for both desktop and mobile devices.
- **Clear Feedback**: Integrated loading spinners and clear error messages to inform the user of the application's state.

## Tech Stack

- **Framework**: Next.js (React)
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Form Management**: React Hook Form
- **Schema Validation**: Zod
- **Icons**: Lucide React

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18.0 or later recommended)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/secrets-vault-dashboard.git
   cd secrets-vault-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

### Connecting to Your Vault Server

For the application to fetch secrets, you need a running vault server with an endpoint that meets the following criteria:

- **Endpoint**: The server must have an endpoint (e.g., `/secrets`) that returns a JSON object of secrets.
- **Authentication**: The endpoint must be protected by an API key sent in the `x-api-key` header.
- **CORS**: The server must be configured to allow Cross-Origin Resource Sharing (CORS) from `http://localhost:3000` (or your deployment domain).

### How to Use the App

1. **Navigate to the Login Page**: Start the app and go to the home page.
2. **Enter Credentials**:
   - **Server URL**: The full base URL of your secrets vault server (e.g., `https://api.your-vault.com`).
   - **API Key**: The API key required to authenticate with your server.
3. **Connect**: Click the "Connect" button. If authentication is successful, you will be redirected to the dashboard.
4. **View & Refresh**: On the dashboard, you can view the fetched secrets. Click the refresh icon to get the latest data.
5. **Log Out**: Click the "Log Out" button to clear your session credentials and return to the login page.

## Project Structure

The project follows the standard Next.js App Router structure:

```
/
├── app/
│   ├── login/
│   │   └── page.tsx      # Login page component
│   └── dashboard/
│       └── page.tsx      # Dashboard page component
├── components/
│   └── ui/               # Reusable UI components from shadcn/ui
└── public/
    └── ...               # Static assets
```

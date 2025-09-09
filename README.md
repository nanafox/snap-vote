# SnapVote

![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/nanafox/snap-vote?utm_source=oss&utm_medium=github&utm_campaign=nanafox%2Fsnap-vote&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)

SnapVote is a modern, fast, and user-friendly polling application built with Next.js. Create, share, and analyze polls with real-time results and beautiful visualizations.

## Features

- **Instant Poll Creation**: Create polls in seconds with our intuitive interface
- **Multiple Question Types**: Support for single-choice, multiple-choice, text, and rating questions
- **Real-time Results**: Watch votes come in live with beautiful, interactive charts
- **User Authentication**: Secure login and registration using Supabase authentication
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Rich Analytics**: Get detailed insights with comprehensive analytics

## Tech Stack

- **Frontend**: Next.js 15, React 19, TailwindCSS 4
- **Authentication**: Supabase Auth
- **UI Components**: Custom components with Radix UI primitives
- **Forms**: React Hook Form with Zod validation
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun

### Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Building for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

### Starting the Production Server

```bash
npm run start
# or
yarn start
# or
pnpm start
# or
bun start
```

## Project Structure

- `/app`: Next.js app router pages and layouts
- `/components`: Reusable UI components
- `/contexts`: React context providers
- `/hooks`: Custom React hooks
- `/lib`: Utility functions and services
- `/public`: Static assets
- `/types`: TypeScript type definitions

## Features in Detail

### Authentication

The app provides user authentication with login, registration, and profile management through Supabase's authentication services. All sensitive routes are protected and require a valid session.

### Dashboard

Once logged in, users can access their dashboard to:

- View all created polls
- Track real-time poll results and analytics
- Create new polls using a step-by-step form
- Manage existing polls (edit, delete, share)

### Usage Examples

#### Creating a Poll

1. From the dashboard, click "Create Poll".
2. Fill in the poll title, description, and add your questions.
3. Choose the question type (e.g., single-choice, multiple-choice).
4. Save the poll to make it live.

#### Voting on a Poll

1. Access the poll via its unique shareable link.
2. Select your desired option(s).
3. Submit your vote to see the results in real-time.

## Testing

This project uses Jest and React Testing Library for unit and integration testing.

To run the tests, use the following command:

```bash
npm test
```

Test files are located in the `__tests__` directory and mirror the structure of the `app` directory.

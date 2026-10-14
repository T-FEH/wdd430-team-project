# TaskTrack

TaskTrack is a simple task management web application for students who want to keep track of their schoolwork in one place. Users can create an account and manage their tasks by adding, editing, completing, and deleting them. A simple dashboard shows users what tasks they have coming up and which tasks they have completed.

## Team

**Team Leader:** Boluwatife Alewi

This repository is maintained individually by Boluwatife Alewi with instructor approval. It is a fork of the original team repository, [schoolonlyaccount/wdd430-team-project](https://github.com/schoolonlyaccount/wdd430-team-project).

Original team members:

- Michael Kyne
- Armando Fernandez
- Boluwatife Alewi
- Ifeanyi Eme

## Project Links

- **Project board:** https://github.com/users/T-FEH/projects/1
- **Specification:** [spec.md](spec.md)
- **Architecture and data model:** [docs/architecture.md](docs/architecture.md)
- **Design system:** [docs/design-system.md](docs/design-system.md)
- **Copilot instructions:** [.github/copilot-instructions.md](.github/copilot-instructions.md)

## Tech Stack

- Next.js (App Router) with TypeScript in strict mode
- Tailwind CSS
- MongoDB for task data
- Clerk for authentication and profile management
- ESLint and Prettier for code quality

## Getting Started

```bash
git clone https://github.com/T-FEH/wdd430-team-project.git
cd wdd430-team-project
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command                | What it does                             |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start the development server             |
| `npm run build`        | Create a production build                |
| `npm run start`        | Serve the production build               |
| `npm run lint`         | Run ESLint                               |
| `npm run format`       | Format all files with Prettier           |
| `npm run format:check` | Check formatting without writing changes |

## Workflow

All work happens on feature branches and goes through a pull request into `main`. Each pull request references the issue it closes.

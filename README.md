# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/0ec3cd84-f1c3-4cdc-95cb-71552b99f627

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/0ec3cd84-f1c3-4cdc-95cb-71552b99f627) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

### Configure environment variables

1. Copy the example file and create your own local environment configuration:

   ```sh
   cp .env.example .env
   ```

2. Populate `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env` with the values from the Supabase dashboard (Project Settings → API).
3. Never commit `.env` or real credentials to version control—runtime configuration is now fully driven by environment variables and the keys have already been rotated in Supabase.

### Supabase credential rotation procedure

When the anon key needs to be rotated again:

1. In the Supabase dashboard, navigate to **Project Settings → API** and rotate the anon/public key.
2. Update the new values in every environment:
   - Local development: edit the `.env` file.
   - Hosted environments (Lovable, deployment targets, CI/CD): update the platform's environment variable settings.
3. Restart any running dev servers or redeploy environments so that the new variables are picked up.
4. Verify connectivity by running the application and checking that Supabase requests succeed.

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/0ec3cd84-f1c3-4cdc-95cb-71552b99f627) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

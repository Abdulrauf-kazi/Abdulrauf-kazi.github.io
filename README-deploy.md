# GitHub Pages Deployment Guide

Follow these steps to replace your existing GitHub Pages site with this new portfolio.

### ⚠️ IMPORTANT: Repository Name
Before deploying, we need to know your repository name (e.g., `portfolio` or `username.github.io`).
- If your repo is named `username.github.io`, no changes are needed.
- If it's a project site (e.g., `portfolio`), you MUST add `basePath: '/portfolio'` to `next.config.ts`.

---

### Step 1: Push your code to GitHub
If you haven't pushed this code to a GitHub repository yet, run these commands:
1. `git add .`
2. `git commit -m "chore: setup portfolio and deployment"`
3. `git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git` (Skip if already added)
4. `git push -u origin main`

### Step 2: Configure GitHub Actions
1. Go to your repository on GitHub.
2. Click on **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.

### Step 3: Trigger the Build
The deployment workflow I created will automatically run whenever you push to the `main` branch. 
- You can see its progress under the **Actions** tab on GitHub.
- Once it turns green, your new site will be live!

---

### How to "Remove" the Old Site
By following these steps, you are **overwriting** the code in your repository. GitHub Pages will simply serve whatever is in the most recent successful build.
- If the old site was in a different branch (like `gh-pages`), the new "GitHub Actions" source will ignore that old branch and use the new build instead.
- If the old site was in a separate repository, you must either delete that repository or change its GitHub Pages settings to "None."

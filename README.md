This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Not to Forget to create the `.env` file like this

```bash
REACT_APP_NAME=YOUR APP NAME
REACT_APP_GITHUB_API=https://api.github.com
REACT_APP_GITHUB_TOKEN=YOUR_GITHUB_PERSONAL_TOKEN
```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## About the Application

This application is made to search for users and repositories on github. You can search all of user that are registered on github and see all repositories that user have.

There are details part of the application.
- Frameworks Library using NEXT 
- Based language using Typescript
- Using styling based of Material UI, Material UI Icons
- State management with Redux Toolkit
- Help for notification handling by React Toastify
- Consume API github with octokit
- Adding a Form Handler with Formik & Yup

## Deployed on Vercel

This application has Go Live! you can check it now in [https://atask-test-seven.vercel.app/](https://atask-test-seven.vercel.app/)

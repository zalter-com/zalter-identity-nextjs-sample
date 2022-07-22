# Zalter Identity Next.js example

Small example on how to use the Zalter's libraries in order to access Zalter Identity API.

## Prerequisites

Node.js version 15+

## Project setup

1. Clone the repo.

```bash
$ git clone git@github.com:zalter-com/zalter-identity-nextjs-sample.git
```

2. Navigate to the project folder.

```bash
$ cd zalter-identity-nextjs-sample
```

3. Install the dependencies.
   
```bash
$ npm install
```

## Configure your environment

1. Setup your [Zalter project](https://developer.zalter.com/identity/project-setup).
2. Get your Project ID.
3. Get your Service Account credentials.
4. Go to your project settings and configure the Magic Link redirect URL to (http://localhost:3000/sign-in/link/confirm)
5. Create a `.env` file at the root of the project and populate with the following environment variables (using values found above):

```dotenv
NEXT_PUBLIC_ZALTER_PROJECT_ID=your_project_id
ZALTER_CREDENTIALS=your_service_account_credentials
```

## Run the application
- Run `npm run dev` to start the development server

## Need help?

If you get stuck and aren't able to resolve the issue by reading our [Zalter documentation](https://developer.zalter.com), you can reach out to us at [support@zalter.com](mailto:support@zalter.com) and we'll lend a hand.
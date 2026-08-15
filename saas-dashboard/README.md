# Vidaamuyarchi DSA SaaS Dashboard

Next.js + Material UI dashboard with:

- Google login via Firebase Auth
- Per-user progress persisted in Firestore
- Local-first fallback storage for reliability
- Vercel-friendly environment variable setup

## Local development

1. Copy environment values.

```bash
cp .env.example .env.local
```

2. Install and run.

```bash
npm install
npm run dev
```

3. Open `http://localhost:3000`.

## Firebase setup

1. Enable **Authentication > Sign-in method > Google**.
2. Enable **Cloud Firestore** in production mode.
3. Add authorized domains under Auth:
- `localhost`
- your Vercel preview domain (for example `your-project.vercel.app`)
- your custom production domain (for example `vidaamuyarchi.xyz`)

### Firestore data model

User data is isolated by UID:

- `users/{uid}/dashboards/cpp-dsa-master-plan`

Each document stores the full dashboard state payload for that signed-in user.

## Recommended Firestore security rules

```txt
rules_version = '2';
service cloud.firestore {
	match /databases/{database}/documents {
		match /users/{userId}/dashboards/{dashboardId} {
			allow read, write: if request.auth != null && request.auth.uid == userId;
		}
	}
}
```

## Vercel deployment

1. Import this folder as a Vercel project.
2. In Vercel Project Settings, set all `NEXT_PUBLIC_FIREBASE_*` env variables from `.env.example`.
3. Deploy.

After deploy, ensure the deployed domain is listed in Firebase Auth authorized domains.

## Quality checks

```bash
npm run lint
npm run build
```

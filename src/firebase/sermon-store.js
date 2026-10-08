// Loaded only when a sermon list is requested. Auth and Storage SDKs aren't
// needed to read public sermon metadata.
export async function readSermons(scope) {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
  if (!config.apiKey || !config.projectId) return [];
  const [appSdk, store] = await Promise.all([
    import("firebase/app"),
    import("firebase/firestore"),
  ]);
  const app = appSdk.getApps().some((app) => app.name === "[DEFAULT]")
    ? appSdk.getApp()
    : appSdk.initializeApp(config);
  const collection = store.collection(store.getFirestore(app), "sermons");
  const source =
    scope === "latest"
      ? store.query(collection, store.orderBy("date", "desc"), store.limit(4))
      : collection;
  const snapshot = await store.getDocs(source);
  return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
}

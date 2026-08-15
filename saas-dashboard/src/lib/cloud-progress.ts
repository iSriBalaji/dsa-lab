import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import type { DashboardState } from "@/types/dashboard";
import { firestoreDb } from "@/lib/firebase";

const APP_DOC_ID = "cpp-dsa-master-plan";

type CloudProgressDoc = {
  state: DashboardState;
  schemaVersion: number;
  updatedAt: string;
  serverUpdatedAt?: unknown;
};

function userProgressDoc(uid: string) {
  return doc(firestoreDb, "users", uid, "dashboards", APP_DOC_ID);
}

export async function loadUserProgress(uid: string): Promise<DashboardState | null> {
  const snapshot = await getDoc(userProgressDoc(uid));
  if (!snapshot.exists()) return null;

  const data = snapshot.data() as Partial<CloudProgressDoc>;
  if (!data || typeof data !== "object" || !data.state) return null;

  return data.state;
}

export async function saveUserProgress(uid: string, state: DashboardState) {
  await setDoc(
    userProgressDoc(uid),
    {
      state,
      schemaVersion: 1,
      updatedAt: new Date().toISOString(),
      serverUpdatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}

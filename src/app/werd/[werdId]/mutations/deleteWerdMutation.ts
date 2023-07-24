type MutationType = { werdId: string };

export default async function deleteWerdMutation({ werdId }: MutationType) {
  return await fetch(`/api/werd/${werdId}`, { method: "DELETE" });
}

export default async function checkWerdMutation({ id }: { id: string }) {
  return await fetch(`/api/werd/${id}`, { method: "PUT" });
}

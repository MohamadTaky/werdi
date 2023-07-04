import prisma from "@/lib/db";
import { addDays } from "date-fns";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import AddGroupMemberForm from "@/components/forms/AddGroupMemberForm";
import AddGroupWerdForm from "@/components/forms/AddGroupWerdForm";
import GroupWerdItem from "./components/GroupWerdItem";
import { Button } from "@/components/ui/Button";
import { ListBullets, SignOut, TrashSimple } from "@/components/icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Command, CommandEmpty, CommandList, CommandItem, CommandInput } from "@/components/ui/Command";
import { Avatar, AvatarImage } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { getServerSession } from "@/lib/nextAuth";
import DeleteGroupButton from "./components/DeleteGroupButton";
import LeaveGroupButton from "./components/LeaveGroupButton";

export async function generateMetadata({
  params: { groupId },
}: {
  params: { groupId: string };
}): Promise<Metadata> {
  const group = await prisma.group.findUnique({ where: { id: groupId }, select: { name: true } });
  return { title: group?.name };
}

export default async function GroupPage({ params: { groupId } }: { params: { groupId: string } }) {
  const session = await getServerSession();
  const group = await prisma.group.findUnique({
    where: { id: groupId },
    include: {
      members: true,
      admin: true,
      werds: {
        include: {
          completions: { where: { completion: { completedAt: { gte: addDays(new Date(), -1) } } } },
          werd: true,
        },
      },
    },
  });

  if (!group) notFound();
  const { name, werds, members, admin, adminId } = group;
  return (
    <>
      <h2 className="pb-2 text-center text-2xl font-semibold">{name}</h2>
      <div className="flex justify-center gap-2">
        <AddGroupMemberForm />
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="h-12 w-12 rounded-full p-0">
              <ListBullets size="24" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="text-start">
              <DialogTitle>الأعضاء</DialogTitle>
              <DialogDescription>{members.length} عضو</DialogDescription>
            </DialogHeader>
            <Command>
              <CommandInput />
              <CommandList className="min-h-[200px]">
                <CommandEmpty>لم يتم العثور على نتائج</CommandEmpty>
                <CommandItem className="gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={admin.image as string} alt={admin.name as string} />
                  </Avatar>
                  <span>{admin.name}</span>
                  <Badge className="mr-auto">مشرف</Badge>
                </CommandItem>
                {members.map(({ name, image, id }) => (
                  <CommandItem key={id} className="gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={image as string} alt={name as string} />
                    </Avatar>
                    <span>{name}</span>
                  </CommandItem>
                ))}
              </CommandList>
            </Command>
            {session?.user.id === adminId ? (
              <DeleteGroupButton groupId={groupId} variant="destructive" className="justify-start gap-2">
                <TrashSimple size="24" />
                حذف
              </DeleteGroupButton>
            ) : (
              <LeaveGroupButton groupId={groupId} variant="destructive" className="justify-start gap-2">
                <SignOut size="24" />
                مغادرة
              </LeaveGroupButton>
            )}
          </DialogContent>
        </Dialog>
      </div>
      {werds.length > 0 ? (
        <ul className="space-y-3">
          {werds.map((werd) => (
            <GroupWerdItem key={werd.id} adminId={adminId} {...werd} />
          ))}
        </ul>
      ) : (
        <p className="m-auto mt-16 font-semibold">ما من أذكار في هذه المجموعة</p>
      )}
      <AddGroupWerdForm />
    </>
  );
}

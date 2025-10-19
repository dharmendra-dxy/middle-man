import { currentUser } from "@/actions/auth.actions";
import { acceptWorkspaceInvite } from "@/actions/invites.actions";
import { redirect } from "next/navigation";
import React from "react";

const Page = async({params}: {params: Promise<{token:string}>}) => {

  const {token} = await params;

  const user = currentUser();
  if(!user) redirect('/sign-in');

  const invite = await acceptWorkspaceInvite(token);
  if (invite.success) redirect('/');

  return redirect('/sign-in');
};

export default Page;

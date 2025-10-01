"use client";

import React from "react";
import { UserData } from "@/types/user";
import Logo from "./logo";
import SearchBar from "./search-bar";
import UserButton from "../auth/user-button";
import { ToggleTheme } from "./toggle-theme";
import InviteMember from "./invite-member";
import WorkspaceButton from "./workspace-button";

interface HeaderProps {
    user: UserData
}

const Header = ({ user }: HeaderProps) => {
    return (
        <header className="grid grid-cols-5 grid-rows-1 gap-2 overflow-x-auto overflow-hidden p-2 border">
            <div className="col-span-2 flex items-center justify-between space-x-2 hover:cursor-pointer hover:opacity-80 ml-4">
                <Logo />
            </div>

            <div className="col-span-1 flex items-center justify-between space-x-2">
                <div
                    className="border-animation relative p-1 rounded flex-1 self-stretch overflow-hidden items-center justify-center"
                    aria-hidden="true"
                >
                    <SearchBar />
                </div>
                <ToggleTheme />
            </div>

            <div className="col-span-2 flex items-center justify-end space-x-2 hover:cursor-pointer hover:opacity-80">
                <InviteMember/>
                <WorkspaceButton/>
                <UserButton user={user} size="sm" />
            </div>
        </header>
    );
};

export default Header;

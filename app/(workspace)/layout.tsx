import { currentUser } from "@/actions/auth";
import Header from "@/components/layout/header";

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {

    const user = await currentUser();

    return (
        <>
            {/* @ts-ignore */}
            <Header user={user}/>

            <main className="max-h-[calc(100vh-4rem)] h-[calc(100vh-4rem)] flex flex-1 overflow-hidden">
                <div className="flex h-full w-full">
                    <div className="w-12 border-zinc-800 bg-zinc-900 text-white">
                        Tab-Left
                    </div>
                    <div className="flex-1 bg-zinc-900">
                        {children}
                    </div>
                </div>
            </main>

        </>
    )

}
"use client"
import Link from "next/link";
import { useActionState } from "react";
import { login } from "./actions/auth";
import Input from "./_components/input/Input";

export default function Home() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <section className="h-screen flex items-center justify-center">
      <form className="flex flex-col bg-amber-100 gap-4 p-8 rounded-lg items-center" action={action}>
        <div className="flex flex-col w-full">
          <Input type="email" name="email" label="Email"/>
          {
            state?.errors?.email && <p className="text-accent text-xs">{state.errors.email}</p>
          }
        </div>
        <div className="flex flex-col w-full">
          <Input type="password" name="password" label="Password"/>
          {
            state?.errors?.password && (
              <div className="w-full text-accent text-xs">
                <p>Password must:</p>
                <ul className="list-disc">
                  { 
                    state.errors.password.map((error) => <li key={error}>{error}</li>)
                  }
                </ul>
              </div>
            )
          }
        </div>
        <button className="bg-accent px-10 py-2 rounded-2xl text-xl font-extrabold hover:cursor-pointer hover:brightness-95" type="submit" disabled={pending}>Login</button>
        <Link href={"/sign-in"} className="text-accent text-sm font-semibold">Not a user?</Link>
      </form>
    </section>
  );
}

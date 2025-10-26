import React, { Suspense } from "react";
import { LoginForm } from "./components/login-form";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RegisterForm } from "./components/register-form";

const Page = () => {
  return (
    <div className="px-4 pb-12 flex justify-center items-center">
      <div className="max-w-3xl w-full">
        <div className="flex justify-center items-center">
          <Image
            src="/images/logos/colmeiaStoreLogo.png"
            alt="Colmeia"
            width={100}
            height={100}
          />
        </div>

        <Tabs defaultValue="login">
          <TabsList>
            <TabsTrigger value="login">Entrar</TabsTrigger>
            <TabsTrigger value="register">Criar conta</TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="w-full">
            <Suspense>
              <LoginForm />
            </Suspense>
          </TabsContent>
          <TabsContent value="register" className="w-full">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;

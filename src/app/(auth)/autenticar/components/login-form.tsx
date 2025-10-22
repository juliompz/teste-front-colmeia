"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/auth/use-login";

const loginSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
});

const LoginForm = () => {
  const { mutateAsync: login } = useLogin();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    await login({ email: values.email, password: values.password });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="md:min-w-xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Entrar</CardTitle>
            <CardDescription>
              Entre com seu email e senha para acessar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-1">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input {...field} type="senha" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full cursor-pointer" size="lg" type="submit">
              Entrar
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export { LoginForm };

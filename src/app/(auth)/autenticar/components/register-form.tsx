"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { useCreateUser } from "@/hooks/auth/use-create-user";
import { formatCPF } from "@/utils/masks/format-cpf";
import { formatPhone } from "@/utils/masks/format-phone";
// import { useCreateUser } from "@/hooks/auth/user/useCreate/useCreateUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const registerSchema = z
  .object({
    confirmPassword: z
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres"),
    email: z.email("E-mail inválido"),
    name: z.string().min(1, "Nome é obrigatório"),
    password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState<{
    confirmPassword: boolean;
    password: boolean;
  }>({
    confirmPassword: false,
    password: false,
  });

  const { mutateAsync: createUser } = useCreateUser();

  const form = useForm<z.infer<typeof registerSchema>>({
    defaultValues: {
      confirmPassword: "",
      email: "",
      name: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    await createUser({
      name: values.name,
      email: values.email,
      password: values.password,
    });
    form.reset();
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Cadastrar</CardTitle>
          <CardDescription>
            Digite seus dados abaixo para cadastrar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="email@exemplo.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2"></div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <FormItem>
                        <div className="relative">
                          <FormControl>
                            <Input
                              {...field}
                              className="pr-10"
                              placeholder="Senha"
                              type={showPassword.password ? "text" : "password"}
                            />
                          </FormControl>

                          <button
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 cursor-pointer"
                            onClick={() =>
                              setShowPassword((prev) => ({
                                ...prev,
                                password: !prev.password,
                              }))
                            }
                            type="button"
                          >
                            {showPassword.password ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </FormItem>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar Senha</FormLabel>
                    <FormControl>
                      <FormItem>
                        <div className="relative">
                          <FormControl>
                            <Input
                              {...field}
                              className="pr-10"
                              placeholder="Confirma senha"
                              type={
                                showPassword.confirmPassword
                                  ? "text"
                                  : "password"
                              }
                            />
                          </FormControl>

                          <button
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 cursor-pointer"
                            onClick={() =>
                              setShowPassword((prev) => ({
                                ...prev,
                                confirmPassword: !prev.confirmPassword,
                              }))
                            }
                            type="button"
                          >
                            {showPassword.confirmPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </FormItem>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="cursor-pointer w-full"
                onClick={form.handleSubmit(onSubmit)}
                type="button"
              >
                Registrar
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export { RegisterForm };

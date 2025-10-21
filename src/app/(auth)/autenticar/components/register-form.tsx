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
    confirmaSenha: z
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres"),
    cpf: z.string().min(14, "CPF deve ter 11 dígitos"),
    email: z.email("E-mail inválido"),
    nome: z.string().min(1, "Nome é obrigatório"),
    senha: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
    telefone: z.string().min(1, "Telefone é obrigatório"),
    tipo_usuario: z.string().min(1, "Tipo de usuário é obrigatório"),
  })
  .refine((data) => data.senha === data.confirmaSenha, {
    message: "As senhas não coincidem",
    path: ["confirmaSenha"],
  });

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState<{
    confirmPassword: boolean;
    password: boolean;
  }>({
    confirmPassword: false,
    password: false,
  });

  // const { mutateAsync: createUser } = useCreateUser([]);

  const router = useRouter();
  const form = useForm<z.infer<typeof registerSchema>>({
    defaultValues: {
      confirmaSenha: "",
      cpf: "",
      email: "",
      nome: "",
      senha: "",
      telefone: "",
      tipo_usuario: "PROFESSOR",
    },
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    // await createUser(values);
    router.push("/entrar");
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
                name="nome"
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
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) => {
                            field.onChange(formatCPF(e.target.value));
                          }}
                          placeholder="000.000.000-00"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="telefone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) => {
                            field.onChange(formatPhone(e.target.value));
                          }}
                          placeholder="(00) 00000-0000"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="senha"
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
                name="confirmaSenha"
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
              <p className="text-center text-sm text-muted-foreground">
                Já tem uma conta?{" "}
                <Link className="text-primary hover:underline" href="/entrar">
                  Entrar
                </Link>
              </p>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export { RegisterForm };
